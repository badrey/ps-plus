/* @flow */
import type {LanguageCodesType, MediaLink, TitleFileSize, TitleRating} from "../api";

export type Facet = {
    +name: string,
    +values: $ReadOnlyArray<FacetValue>,
};
export type FacetValue = {
    +count: number,
    +key: string,
    +name: string,
};

export type MediaData = {screenshots: $ReadOnlyArray<MediaLink>};

export type Title = {|
    +contentType: string,
    +description: string,
    +fileSize: TitleFileSize,
    +genres: $ReadOnlyArray<string>,
    +id: string,
    +media: MediaData,
    +name: string,
    +needsDataFetch?: boolean,
    +platforms: $ReadOnlyArray<string>,
    +priceInfo?: ROPriceInfo,
    +providerName: string,
    +releaseDate: string,
    +secondaryClassification: string,
    +skuPrice?: SkuPrice,
    +starRating: TitleRating,
    +subtitleLanguageCodes: $ReadOnlyArray<LanguageCodesType>,
    +tertiaryClassification: string,
    +thumbnailUrl: string,
    +topCategory: string,
    +voiceLanguageCodes: $ReadOnlyArray<LanguageCodesType>,
|};

export type PriceInfo = {
    freePrice?: FreePrice,
    nonPlusPrice: RODisplayPrice,
    plusPrice: RODisplayPrice,
};

export type FreePrice = {
    displayName: string,
    isPlus: boolean,
};

export type DisplayPrice = {
    actualDisplay: string,
    actualValue: number,
    availability: {
        endDate: ?string,
        startDate: ?string,
    },
    discountPercentage: number,
    originalDisplay: string,
    originalValue: number,
};

export type RODisplayPrice = {
    +actualDisplay: string,
    +actualValue: number,
    +availability: {
        +endDate: ?string,
        +startDate: ?string,
    },
    +discountPercentage: number,
    +originalDisplay: string,
    +originalValue: number,
};

export type ROPriceInfo = $ReadOnly<PriceInfo>;

export type OptionsSection = {
    +data: $ReadOnlyArray<Option>,
    +key: string,
    +title: string,
};

export type Option = {
    +count: number,
    +displayName: string,
    +isActive: boolean,
    +key: string,
};
