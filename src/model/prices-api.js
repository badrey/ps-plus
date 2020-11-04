/* @flow */
/* eslint-disable no-param-reassign */
import {isEqual} from "../common/utils/testUtils";
import type {
    DisplayPrice,
    FreePrice,
    PriceInfo,
    RawPriceInfo,
    RODisplayPrice,
    ROPriceInfo,
} from "./types";
import type {ResponseItem, SkuPrice, TitleInfo} from "../api/store-api-types";

function normalisePriceInfo(priceInfo: RawPriceInfo): ?ROPriceInfo {
    if (!priceInfo) {
        return null;
    }
    if (!priceInfo.plusPrice) {
        priceInfo.plusPrice = priceInfo.nonPlusPrice;
    } else if (!priceInfo.nonPlusPrice) {
        priceInfo.nonPlusPrice = priceInfo.plusPrice;
    }

    if (priceInfo.freePrice) {
        if (priceInfo.nonPlusPrice) {
            return {
                freePrice: null,
                nonPlusPrice: priceInfo.nonPlusPrice,
                plusPrice: priceInfo.plusPrice ?? priceInfo.nonPlusPrice,
            };
        }
        return {
            freePrice: priceInfo.freePrice,
            nonPlusPrice: priceInfo.nonPlusPrice ?? getDefaultDisplayPrice(),
            plusPrice: priceInfo.plusPrice ?? getDefaultDisplayPrice(),
        };
    }

    if (!priceInfo.nonPlusPrice && !priceInfo.plusPrice) {
        return null;
    }

    return {
        freePrice: priceInfo.freePrice,
        nonPlusPrice: priceInfo.nonPlusPrice ?? getDefaultDisplayPrice(),
        plusPrice: priceInfo.plusPrice ?? getDefaultDisplayPrice(),
    };
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

export function extractPriceInfo(responseItem: ResponseItem<TitleInfo>): ?ROPriceInfo {
    const skus = responseItem?.attributes?.skus;
    if (!skus?.length) {
        return null;
    }
    const priceInfo: RawPriceInfo = {
        freePrice: null,
        plusPrice: null,
        nonPlusPrice: null,
    };
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
