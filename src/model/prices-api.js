/* @flow */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import {isEqual} from "../common/utils/testUtils";
import type {DisplayPrice, PriceInfo, RODisplayPrice, ROPriceInfo} from "./types";
import type {
    LegacyTitleInfo,
    ResponseItem,
    Reward,
    SkuPrice,
    TitleInfo,
} from "../api/store-api-types";

function normalisePriceInfo(priceInfo: PriceInfo) {
    if (!priceInfo.plusPrice) {
        priceInfo.plusPrice = priceInfo?.nonPlusPrice;
    } else if (!priceInfo?.nonPlusPrice) {
        priceInfo.nonPlusPrice = priceInfo?.plusPrice;
    }

    if (priceInfo?.freePrice) {
        if (priceInfo?.nonPlusPrice) {
            priceInfo.freePrice = null;
        } else {
            priceInfo.nonPlusPrice = getDefaultDisplayPrice();
            priceInfo.plusPrice = getDefaultDisplayPrice();
        }
    }

    if (!priceInfo?.nonPlusPrice) {
        return null;
    }

    return priceInfo;
}

function skuPriceToFreePrice(skuPrice: SkuPrice) {
    const isForFree = isEqual(skuPrice["actual-price"].value, 0);
    if (isForFree) {
        return {
            displayName: skuPrice["actual-price"].display,
            isPlus: !!skuPrice["is-plus"],
        };
    }
    return null;
}

function skuPriceToDisplayPrice(skuPrice: SkuPrice): RODisplayPrice {
    const displayPrice: DisplayPrice = getDefaultDisplayPrice();
    displayPrice.discountPercentage = skuPrice["discount-percentage"];
    displayPrice.actualValue = skuPrice["actual-price"].value;
    displayPrice.actualDisplay = skuPrice["actual-price"].display;
    displayPrice.availability.startDate = skuPrice.availability["start-date"];
    displayPrice.availability.endDate = skuPrice.availability["end-date"];
    if (!!skuPrice["strikethrough-price"]) {
        displayPrice.originalDisplay = skuPrice["strikethrough-price"].display;
        displayPrice.originalValue = skuPrice["strikethrough-price"].value;
    }

    return displayPrice;
}

export function extractPriceInfo(responseItem: ResponseItem<TitleInfo>): ROPriceInfo {
    const skus = responseItem?.attributes?.skus;
    if (!skus?.length) {
        return null;
    }
    const priceInfo = {};
    skus.forEach((sku) => {
        priceInfo.freePrice = skuPriceToFreePrice(sku.prices["non-plus-user"]);
        if (!priceInfo.freePrice) {
            const nonPlusPrice = skuPriceToDisplayPrice(sku.prices["non-plus-user"]);
            if (
                !priceInfo.nonPlusPrice ||
                (nonPlusPrice.discountPercentage >
                    priceInfo.nonPlusPrice.discountPercentage ??
                    0)
            ) {
                priceInfo.nonPlusPrice = nonPlusPrice;
            }
            const plusPrice = skuPriceToDisplayPrice(sku.prices["plus-user"]);
            if (
                !priceInfo.plusPrice ||
                (plusPrice.discountPercentage > priceInfo.plusPrice.discountPercentage ??
                    0)
            ) {
                priceInfo.plusPrice = plusPrice;
            }
        }
    });

    return normalisePriceInfo(priceInfo);
}

function rewardToFreePrice({
    reward,
    originalPrice,
}: {
    originalPrice?: number,
    reward?: Reward,
}) {
    if (reward) {
        if (reward.price === 0) {
            return {
                displayName: reward.display_price,
                isPlus: reward.isPlus,
            };
        }
    } else if (originalPrice === 0) {
        return {
            displayName: "",
            isPlus: false,
        };
    }
    return null;
}

function rewardToDisplayPrice({
    reward,
    originalDisplay,
    originalPrice,
}: {
    originalDisplay: string,
    originalPrice: number,
    reward?: Reward,
}): RODisplayPrice {
    const displayPrice: DisplayPrice = getDefaultDisplayPrice();
    if (reward) {
        displayPrice.discountPercentage = reward.discount;
        displayPrice.actualValue = reward.price;
        displayPrice.actualDisplay = reward.display_price;
        displayPrice.availability.startDate = reward.start_date;
        displayPrice.availability.endDate = reward.end_date;
        displayPrice.originalDisplay = originalDisplay;
        displayPrice.originalValue = originalPrice;
    } else {
        displayPrice.actualValue = originalPrice;
        displayPrice.actualDisplay = originalDisplay;
    }

    return displayPrice;
}

export function extractLegacyPriceInfo(
    responseItem: ResponseItem<LegacyTitleInfo>
): ROPriceInfo {
    const {display_price, price, rewards = []} = responseItem?.attributes ?? {};
    if (!display_price) {
        return null;
    }
    const priceInfo = {};
    rewards.forEach((reward) => {
        const isPlus = !!reward?.isPlus;
        priceInfo.freePrice = rewardToFreePrice({reward, originalPrice: price});
        if (!priceInfo.freePrice) {
            const displayPrice = rewardToDisplayPrice({
                reward,
                originalDisplay: display_price,
                originalPrice: price,
            });
            if (isPlus) {
                priceInfo.plusPrice = displayPrice;
            } else {
                priceInfo.nonPlusPrice = displayPrice;
            }
        }
    });

    return normalisePriceInfo(priceInfo);
}

export function extractPriceDates(
    priceInfo?: ROPriceInfo
): ?{end: string, isPlus: boolean, start: string} {
    if (!priceInfo) {
        return null;
    }
    const {nonPlusPrice, plusPrice} = priceInfo;
    if (nonPlusPrice.availability.startDate && nonPlusPrice.availability.endDate) {
        return {
            start: nonPlusPrice.availability.startDate,
            end: nonPlusPrice.availability.endDate,
            isPlus: false,
        };
    }
    if (plusPrice.availability.startDate && plusPrice.availability.endDate) {
        return {
            start: plusPrice.availability.startDate,
            end: plusPrice.availability.endDate,
            isPlus: true,
        };
    }
    return null;
}

function getDefaultDisplayPrice(): DisplayPrice {
    return {
        actualDisplay: "",
        actualValue: 0,
        originalDisplay: "",
        originalValue: 0,
        discountPercentage: 0,
        availability: {
            startDate: null,
            endDate: null,
        },
    };
}
