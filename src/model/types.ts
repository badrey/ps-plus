import {LanguageCodesType, MediaLink, TitleFileSize, TitleRating} from "../api";

export type Facet = {
    readonly name: string;
    readonly values: ReadonlyArray<FacetValue>;
};
export type FacetValue = {
    readonly count: number;
    readonly key: string;
    readonly name: string;
};

export type MediaData = {screenshots: ReadonlyArray<MediaLink>};

export type Title = {
    readonly contentType: string;
    readonly description: string;
    readonly fileSize: TitleFileSize;
    readonly genres: ReadonlyArray<string>;
    readonly id: string;
    readonly media: MediaData;
    readonly name: string;
    readonly needsDataFetch?: boolean;
    readonly platforms: ReadonlyArray<string>;
    readonly priceInfo?: ROPriceInfo | null | undefined;
    readonly providerName: string;
    readonly releaseDate: string;
    readonly secondaryClassification: string;
    readonly starRating: TitleRating;
    readonly subtitleLanguageCodes: ReadonlyArray<LanguageCodesType>;
    readonly tertiaryClassification: string;
    readonly thumbnailUrl: string;
    readonly topCategory: string;
    readonly voiceLanguageCodes: ReadonlyArray<LanguageCodesType>;
};

export type RawPriceInfo = {
    freePrice: FreePrice | null | undefined;
    nonPlusPrice: RODisplayPrice | null | undefined;
    plusPrice: RODisplayPrice | null | undefined;
};

export interface PriceInfo {
    freePrice: FreePrice | null | undefined;
    nonPlusPrice: RODisplayPrice;
    plusPrice: RODisplayPrice;
}

export type FreePrice = {
    displayName: string;
    isPlus: boolean;
};

export type DisplayPrice = {
    actualDisplay: string;
    actualValue: number;
    availability: {
        endDate: string | null | undefined;
        startDate: string | null | undefined;
    };
    discountPercentage: number;
    originalDisplay: string;
    originalValue: number;
};

export type RODisplayPrice = {
    readonly actualDisplay: string;
    readonly actualValue: number;
    readonly availability: {
        readonly endDate: string | null | undefined;
        readonly startDate: string | null | undefined;
    };
    readonly discountPercentage: number;
    readonly originalDisplay: string;
    readonly originalValue: number;
};

export type ROPriceInfo = Readonly<PriceInfo>;

export type OptionsSection = {
    readonly data: ReadonlyArray<Option>;
    readonly key: string;
    readonly title: string;
};

export type Option = {
    readonly count: number;
    readonly displayName: string;
    readonly isActive: boolean;
    readonly key: string;
};
