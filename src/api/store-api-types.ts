import {Facet} from "../model/types";

export type FacetedSearchResponse = SearchResponse<FacetedSearchAttributes>;

export type SearchResponse<Attributes> = {
    readonly data?: ResponseItem<Attributes>;
    readonly included: ReadonlyArray<ResponseItem<TitleInfo>>;
};

export type FacetedSearchAttributes = {
    readonly facets: ReadonlyArray<Facet>;
    readonly query: string;
    readonly size: number;
    readonly start: number;
    readonly total_results: number;
};

export type ResponseItem<Attributes> = {
    readonly attributes: Attributes;
    readonly id: string;
    readonly relationships: Relationships;
    readonly type: string;
};

export type Relationships = {
    // it is in GB store and maybe others instead of children
    readonly "legacy-skus"?: Relationship;
    readonly children?: Relationship;
    readonly games?: Relationship;
};

export type Relationship = {
    readonly data: ReadonlyArray<Data>;
};

export type Data = {
    readonly id: string;
    readonly type: string;
};

export type LanguageCodesType = {
    codes: ReadonlyArray<string>;
    name: string;
};

export type TitleInfo = {
    readonly "file-size": TitleFileSize;
    readonly "game-content-type": string;
    readonly "long-description": string;
    readonly "media-list": TitleMedia;
    readonly "primary-classification": string;
    readonly "provider-name": string;
    readonly "release-date": string;
    readonly "secondary-classification": string;
    readonly "star-rating": TitleRating;
    readonly "subtitle-language-codes": ReadonlyArray<LanguageCodesType>;
    readonly "tertiary-classification": string;
    readonly "thumbnail-url-base": string;
    readonly "top-category"?: string;
    readonly "total-results": number;
    readonly "voice-language-codes": ReadonlyArray<LanguageCodesType>;
    readonly genres: ReadonlyArray<string>;
    readonly name: string;
    readonly platforms: ReadonlyArray<string>;
    readonly skus: ReadonlyArray<Sku>;
};

export type TitleFileSize = {
    unit: string;
    value: number;
};

export type TitleRating = {
    score: number;
    total: number;
};

export type TitleMedia = {
    promo?: {
        images?: ReadonlyArray<MediaLink>;
    };
    screenshots: ReadonlyArray<MediaLink>;
};

export type MediaLink = {
    url: string;
};

export type Sku = {
    readonly id: string;
    readonly name: string;
    readonly prices: {
        readonly "non-plus-user": SkuPrice;
        readonly "plus-user": SkuPrice;
    };
};

export type SkuPrice = {
    readonly "actual-price": Price;
    readonly "discount-percentage": number;
    readonly "is-plus": boolean;
    readonly "strikethrough-price"?: Price;
    readonly availability: {
        readonly "end-date"?: string;
        readonly "start-date"?: string;
    };
};

export type Price = {
    readonly display: string;
    readonly value: number;
};
