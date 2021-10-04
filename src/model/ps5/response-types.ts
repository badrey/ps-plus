export type PageInfo = {
    isLast: boolean;
    offset: number;
    size: number;
    totalCount: number;
};

export type Media = {
    role: string;
    type: string;
    url: string;
};

export type SkuPrice = {
    basePrice: string;
    basePriceValue?: number;
    currencyCode?: string;
    discountedPrice: string;
    discountedValue?: number;
    discountText?: string;
    endTime?: string;
    isFree: boolean;
    serviceBranding?: Array<string>;
    storeLocale?: string;
    upsellServiceBranding?: Array<string>;
    upsellText?: string;
};

export type Sku = {
    id: string;
    name: string;
};

export type Price = {
    applicability: string;
    basePrice: string;
    basePriceValue: number;
    campaignId?: string;
    currencyCode: string;
    discountedPrice: string;
    discountedValue: number;
    discountText?: string;
    endTime?: string;
    isExclusive: boolean;
    isFree: boolean;
    isTiedToSubscription: boolean;
    rewardId: string;
    serviceBranding: Array<string>;
    upsellText?: string;
};

export type GameCTA = {
    hasLinkedConsole: boolean;
    price: Price;
    type: string;
};

export type ProductEdition = {
    features: Array<string>;
    name: string;
    ordering: number;
    type: string;
};

export type CategoryProduct = {
    id: string;
    localizedStoreDisplayClassification: string | null;
    media: Array<Media>;
    name: string;
    platforms: Array<string>;
    price: SkuPrice | null;
};

export type PriceWithMediaProduct = {
    concept: {
        id: string;
    };
    edition: ProductEdition;
    id: string;
    media: Array<Media>;
    name: string;
    platforms: Array<string>;
    skus: Array<Sku>;
    topCategory: string;
    webctas: Array<GameCTA>;
};

export type CategoryStrandRetrieveResponse = {
    data: {
        categoryStrandRetrieve: {
            __typename: string;
            id: string;
            pageInfo: PageInfo;
            products: Array<CategoryProduct>;
            reportingName: string;
        };
    } | null;
};
