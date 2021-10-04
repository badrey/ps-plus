import {logError} from "../../common/utils";
import type {CategoryStrandRetrieveResponse} from "../../model/ps5/response-types";
import {productToTitle} from "../../model/ps5/response-api";
import type {CategoryApiRequestParams, CategorySearchParams} from "./types";
import type {Title} from "../../model/types";
import {OrderedMap} from "immutable";

const apiBase = "https://web.np.playstation.com/api/graphql/v1/op";

export type ExtensionsType = {
    persistedQuery: {
        sha256Hash: string;
        version: number;
    };
};

export type PS5ApiParams = {
    extensions: ExtensionsType;
    operationName: string;
    variables: any;
};

export function getApiRequest({operationName, variables, extensions}: PS5ApiParams) {
    return `${apiBase}?operationName=${operationName}&variables=${JSON.stringify(
        variables
    )}&extensions=${JSON.stringify(extensions)}`;
}

export function getCategoryStrandApiRequest({
    categoryId,
    size,
    offset,
}: CategoryApiRequestParams) {
    return getApiRequest({
        operationName: "categoryStrandRetrieve",
        variables: {
            id: categoryId,
            pageArgs: {size, offset},
            maxResults: null,
        },
        extensions: {
            persistedQuery: {
                version: 1,
                sha256Hash:
                    "3d034d23d4f6f6fc5c93c796ab96f8e98c48d164ee65365e6d0ef6dea06e6401",
            },
        },
    });
}

export function search<T>({
    searchUrl,
    locale,
    toLogError = true,
    retryCount = 0,
}: {
    locale: string;
    retryCount?: number;
    searchUrl: string;
    toLogError?: boolean;
}): Promise<T> {
    return fetch(searchUrl, {
        keepalive: true,
        headers: {
            Connection: "Keep-Alive",
            "Keep-Alive": "timeout=17, max=100",
            "x-psn-store-locale-override": locale,
        },
    }).then(
        (response) => {
            if (response.ok) {
                return response.json();
            }
            const errorMessage = `${response.url}, ${response.status}, ${response.statusText}`;
            logError(errorMessage);
            throw new Error(errorMessage);
        },
        (error) => {
            if (retryCount < 3) {
                return search({
                    searchUrl,
                    locale,
                    toLogError,
                    retryCount: retryCount + 1,
                });
            }
            const errorMessage = `Error during search. searchUrl: ${searchUrl}, locale: ${locale}, error: ${error}`;
            logError(errorMessage);
            throw error;
        }
    );
}

export async function categoryStrandSearch({
    storeLocale,
    categoryId,
    size,
    offset,
}: CategorySearchParams): Promise<CategoryStrandRetrieveResponse | null> {
    if (!storeLocale || !categoryId) {
        return null;
    }
    const apiRequest = getCategoryStrandApiRequest({categoryId, size, offset});
    return search<CategoryStrandRetrieveResponse>({
        searchUrl: apiRequest,
        locale: storeLocale,
    });
}

export async function categoryStrandResponseToTitles({
    response,
    storeLocale,
}: {
    response: CategoryStrandRetrieveResponse | null;
    storeLocale: string;
}): Promise<OrderedMap<string, Title>> {
    const titlesMap = OrderedMap<string, Title>().asMutable();

    const products = response?.data?.categoryStrandRetrieve?.products;
    if (products?.length) {
        products
            .map((product) => productToTitle({product, storeLocale}))
            .forEach((title: Title) => {
                if (title) {
                    titlesMap.set(title.id, title);
                }
            });
    }

    return titlesMap.asImmutable();
}
