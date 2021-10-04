import type {Title} from "../types";
import type {CategoryProduct} from "./response-types";
import {parseMedia} from "./utils";

export function productToTitle({
    product,
    storeLocale,
}: {
    product: CategoryProduct;
    storeLocale: string;
}): Title {
    const {media, thumbnailUrl, preview} = parseMedia(product.media);
    return {
        storeLocale,
        id: product.id,
        name: product.name || "",
        topCategory: "",
        releaseDate: "",
        genres: [],
        thumbnailUrl,
        preview,
        platforms: product.platforms || [],
        skuPrices: !!product.price ? [product.price] : [],
        fileSize: {
            unit: "GB",
            value: 0,
        },
        contentType: product.localizedStoreDisplayClassification || "",
        description: "",
        media,
        providerName: "",
        starRating: {
            score: 0,
            total: 0,
        },
    };
}
