import {MediaData, Title} from "./types";
import {Data, ResponseItem, TitleInfo} from "../api/store-api-types";
import {extractPriceInfo} from "./prices-api";
import {OrderedMap} from "immutable";
import {hasNoValue} from "../common/utils/testUtils";
import {SearchResponse, TitleMedia} from "../api";
import {logError} from "../common/utils";

type ResponseItems = ReadonlyArray<ResponseItem<TitleInfo> | null | undefined>;

function extractResponseItems<Attributes>(
    response: SearchResponse<Attributes>
): ResponseItems {
    return getTitleIds(response)
        .map((titleId: string) => getResponseItem(titleId, response?.included))
        .filter(Boolean);
}

export function getTitleIds<Attributes>(
    response: SearchResponse<Attributes>
): ReadonlyArray<string> {
    const data =
        response?.data?.relationships?.children?.data ??
        response?.data?.relationships?.games?.data ??
        [];
    return data.map((title: Data) => title.id);
}

function getResponseItem<Attributes>(
    itemId: string,
    items: ReadonlyArray<ResponseItem<Attributes>>
): ResponseItem<Attributes> | null | undefined {
    if (!items?.length) {
        return null;
    }
    return items.find(
        (responseItem: ResponseItem<Attributes>) => responseItem.id === itemId
    );
}

export function toTitles<Attributes>(
    response: SearchResponse<Attributes>
): OrderedMap<string, Title> {
    const responseData = response?.data;
    if (hasNoValue(responseData)) {
        return OrderedMap();
    }

    return OrderedMap<string, Title>().withMutations((map) => {
        extractResponseItems(response).forEach(
            (responseItem: ResponseItem<TitleInfo> | null | undefined) => {
                if (responseItem) {
                    const title = toTitle(responseItem);
                    if (title) {
                        map.set(responseItem.id, title);
                    }
                }
            }
        );
    });
}

export function extractMedia(media: TitleMedia): MediaData {
    if (media) {
        const {screenshots, promo: {images} = {}} = media;
        if (screenshots?.length) {
            return {screenshots};
        }
        if (images?.length) {
            return {screenshots: images};
        }
    }

    return {screenshots: []};
}

export function toTitle(
    responseItem?: ResponseItem<TitleInfo> | null | undefined
): Title | null | undefined {
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
