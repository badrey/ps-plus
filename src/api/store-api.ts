import {logError} from "../common/utils";
import {NotFoundError} from "../common/types/errors";

// @ts-ignore
import storeData from "../localResources/storeData.json";

// @ts-ignore
import regionData from "../localResources/regionData.json";
import {FacetedSearchResponse} from "./store-api-types";

const psStoreBase = "https://store.playstation.com";
const valkyrieApiBase = "https://store.playstation.com/valkyrie-api";

const storeLocale = "en-US";

export function getLocaleData(locale: string, key: string) {
    const localeData = storeData[locale];
    if (localeData) {
        return localeData[key];
    }
    return null;
}

export function getRegionData(locale: string, key: string) {
    const localeData = getLocaleData(locale, key);
    if (!!localeData) {
        return localeData;
    }

    const region = getLocaleData(locale, "region");
    if (region) {
        const data = regionData[region];
        if (data) {
            return data[key];
        }
    }
    return "";
}

export function getLocalisationLocale(locale: string = storeLocale) {
    return locale;
}

export function getValkyrieApiLocale(locale: string = storeLocale) {
    const localisation = getLocalisationLocale(locale);
    if (localisation) {
        return `${localisation.split("-").join("/")}/999`;
    }
    return "";
}

export function getPSPlusContainerId() {
    return getRegionData(storeLocale, "plus-container");
}

export function getValkyrieUri(locale: string = storeLocale) {
    return `${valkyrieApiBase}/${getValkyrieApiLocale(locale)}`;
}

export function getStoreTitleUri(titleId: string) {
    return `${psStoreBase}/${getLocalisationLocale(storeLocale)}/product/${titleId}`;
}

function search<T>(searchUrl: string): Promise<T> {
    return fetch(searchUrl, {
        keepalive: true,
        headers: {
            Connection: "Keep-Alive",
            "Keep-Alive": "timeout=17, max=100",
        },
    }).then(
        (response) => {
            if (response.status < 400) {
                return response.json();
            }
            if (response.status === 404) {
                throw new NotFoundError(searchUrl);
            }
            logError(`${response.url}, ${response.status}, ${response.statusText}`);
            throw new Error(response.toString());
        },
        (error) => {
            logError(error);
            throw error;
        }
    );
}

const EMPTY_CONTAINER_SEARCH_RESPONSE: FacetedSearchResponse = {
    included: [],
};

export function containerSearch(
    containerId: string,
    start: number,
    pageSize: number
): Promise<FacetedSearchResponse> {
    if (!containerId) {
        return Promise.resolve(EMPTY_CONTAINER_SEARCH_RESPONSE);
    }
    const searchUri = encodeURI(
        `${getValkyrieUri(
            storeLocale
        )}/container/${containerId}?size=${pageSize}&bucket=games&start=${start}`
    );

    return search(searchUri);
}
