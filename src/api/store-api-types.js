/* @flow */
import type {Facet} from "../model/types";

export type FacetedSearchResponse = SearchResponse<FacetedSearchAttributes>;

export type SearchResponse<Attributes> = {
    +data?: ResponseItem<Attributes>,
    +included: $ReadOnlyArray<ResponseItem<TitleInfo>>,
};

export type FacetedSearchAttributes = {
    +facets: $ReadOnlyArray<Facet>,
    +query: string,
    +size: number,
    +start: number,
    +total_results: number,
};

export type ResponseItem<Attributes> = {
    +attributes: Attributes,
    +id: string,
    +relationships: Relationships,
    +type: string,
};

export type Relationships = {
    // it is in GB store and maybe others instead of children
    +"legacy-skus"?: Relationship,
    +children?: Relationship,
    +games?: Relationship,
};

export type Relationship = {
    +data: $ReadOnlyArray<Data>,
};

export type Data = {
    +id: string,
    +type: string,
};

export type LanguageCodesType = {
    codes: $ReadOnlyArray<string>,
    name: string,
};

export type TitleInfo = {
    +"file-size": TitleFileSize,
    +"game-content-type": string,
    +"long-description": string,
    +"media-list": TitleMedia,
    +"primary-classification": string,
    +"provider-name": string,
    +"release-date": string,
    +"secondary-classification": string,
    +"star-rating": TitleRating,
    +"subtitle-language-codes": $ReadOnlyArray<LanguageCodesType>,
    +"tertiary-classification": string,
    +"thumbnail-url-base": string,
    +"total-results": number,
    +"voice-language-codes": $ReadOnlyArray<LanguageCodesType>,
    +genres: $ReadOnlyArray<string>,
    +name: string,
    +platforms: $ReadOnlyArray<string>,
    +skus: $ReadOnlyArray<Sku>,
};

export type LegacyTitleInfo = {
    display_price: string,
    price: number,
    rewards?: $ReadOnlyArray<Reward>,
};

export type Reward = {
    discount: number,
    display_price: string,
    end_date: string,
    id: string,
    isPlus: boolean,
    price: 6800,
    start_date: string,
};

export type TitleFileSize = {
    unit: string,
    value: number,
};

export type TitleRating = {
    score: number,
    total: number,
};

export type TitleMedia = {
    promo?: {
        images?: $ReadOnlyArray<MediaLink>,
    },
    screenshots: $ReadOnlyArray<MediaLink>,
};

export type MediaLink = {
    url: string,
};

export type Sku = {
    +id: string,
    +name: string,
    +prices: {
        +"non-plus-user": SkuPrice,
        +"plus-user": SkuPrice,
    },
};

export type SkuPrice = {
    +"actual-price": Price,
    +"discount-percentage": number,
    +"is-plus": boolean,
    +"strikethrough-price"?: Price,
    +availability: {
        +"end-date"?: string,
        +"start-date"?: string,
    },
};

export type Price = {
    +display: string,
    +value: number,
};
