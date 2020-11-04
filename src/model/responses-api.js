/* @flow */
import type {MediaData, Title} from "./types";
import type {Data, ResponseItem, TitleInfo} from "../api/store-api-types";
import {extractLegacyPriceInfo, extractPriceInfo} from "./prices-api";
import {OrderedMap} from "immutable";
import {hasNoValue} from "../common/utils/testUtils";
import type {LegacyTitleInfo, SearchResponse, TitleMedia} from "../api";
import {logError} from "../common/utils";

type ResponseItems = $ReadOnlyArray<ResponseItem<TitleInfo>>;
type LegacyItems = $ReadOnlyArray<ResponseItem<LegacyTitleInfo>>;

function extractResponseItems<Attributes>(
    response: SearchResponse<Attributes>
): ResponseItems {
    return getTitleIds(response).map((titleId) =>
        getResponseItem(titleId, response?.included)
    );
}

export function getTitleIds<Attributes>(
    response: SearchResponse<Attributes>
): $ReadOnlyArray<string> {
    const data =
        response?.data?.relationships?.children?.data ??
        response?.data?.relationships?.games?.data ??
        [];
    return data.map((title: Data) => title.id);
}

function extractLegacyItems<Attributes>(
    responseItem: ResponseItem<Attributes>,
    response: SearchResponse<Attributes>
): LegacyItems {
    return getLegacyTitleIds(responseItem).map((itemId) =>
        getResponseItem(itemId, response?.included)
    );
}

export function getLegacyTitleIds<Attributes>(
    responseItem: ResponseItem<Attributes>
): $ReadOnlyArray<string> {
    const legacySkus = responseItem?.relationships?.["legacy-skus"]?.data ?? [];
    return legacySkus.map((item: Data) => item.id);
}

function getResponseItem(
    itemId: string,
    items: $ReadOnlyArray<ResponseItem<TitleInfo>>
): ResponseItem<TitleInfo> {
    if (!items?.length) {
        return null;
    }
    return items.find(
        (responseItem: ResponseItem<TitleInfo>) => responseItem.id === itemId
    );
}

export function toTitles<Attributes>(
    response: SearchResponse<Attributes>
): OrderedMap<string, Title> {
    const responseData = response?.data;
    if (hasNoValue(responseData)) {
        return OrderedMap();
    }

    return new OrderedMap().withMutations((map) => {
        extractResponseItems(response).forEach(
            (responseItem: ResponseItem<TitleInfo>) => {
                const title = toTitleWithPrice(responseItem, response);
                if (title) {
                    map.set(responseItem.id, title);
                }
            }
        );
    });
}

export function extractMedia(media: TitleMedia): MediaData {
    const result = {screenshots: []};
    if (media) {
        const {screenshots, promo: {images} = {}} = media;
        if (screenshots?.length) {
            result.screenshots = screenshots;
        }
        if (images?.length) {
            result.screenshots = images;
        }
    }

    return result;
}

export function toTitle(responseItem?: ?ResponseItem<TitleInfo>): ?Title {
    if (!responseItem) {
        return null;
    }
    try {
        const media = extractMedia(responseItem.attributes?.["media-list"]);
        return {
            id: responseItem.id,
            name: responseItem?.attributes?.name
                ? responseItem.attributes.name.trim()
                : "",
            secondaryClassification:
                responseItem.attributes["secondary-classification"] || "",
            tertiaryClassification:
                responseItem.attributes["tertiary-classification"] || "",
            topCategory: responseItem.attributes["top-category"] || "",
            releaseDate: responseItem.attributes["release-date"] || "",
            genres: responseItem.attributes.genres || [],
            thumbnailUrl: responseItem.attributes["thumbnail-url-base"] || "",
            platforms: responseItem.attributes.platforms || [],
            priceInfo: extractPriceInfo(responseItem),
            fileSize: responseItem.attributes["file-size"] || {
                unit: "GB",
                value: 0,
            },
            contentType: responseItem.attributes["game-content-type"] || "",
            description: responseItem.attributes["long-description"] || "",
            media,
            providerName: responseItem.attributes["provider-name"],
            starRating: responseItem.attributes["star-rating"],
            subtitleLanguageCodes:
                responseItem.attributes["subtitle-language-codes"] || [],
            voiceLanguageCodes: responseItem.attributes["voice-language-codes"] || [],
        };
    } catch (e) {
        logError(`Error parsing response item id: ${responseItem.id}`);
    }
    return null;
}

export function toTitleWithPrice<Attributes>(
    responseItem: ResponseItem<Attributes>,
    response: SearchResponse<Attributes>
) {
    const title = toTitle(responseItem);
    if (title) {
        if (!title.priceInfo) {
            const legacyItems = extractLegacyItems(responseItem, response);
            const [legacyPriceInfo] = legacyItems
                .map((legacyItem) => extractLegacyPriceInfo(legacyItem))
                .filter(Boolean);
            title.priceInfo = legacyPriceInfo;
        }
        return title;
    }
    return null;
}
