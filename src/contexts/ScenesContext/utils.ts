import {FacetedSearchResponse} from "../../api";
import * as React from "react";
import * as StoreApi from "../../api/store-api";
import {toTitles} from "../../model/responses-api";
import {OrderedMap} from "immutable";
import {CONTAINER_MAX_FETCH_SIZE} from "../../settings";
import {Title} from "../../model/types";
import {ScenesContextType, TitleWithFacets} from "./types";
import {ScenesContextProviderProps} from "./ScenesContext";

export async function getTitles(
    containerId: string,
    pageSize: number,
    start: number
): Promise<OrderedMap<string, TitleWithFacets>> {
    const response: FacetedSearchResponse = await StoreApi.containerSearch(
        containerId,
        start,
        pageSize
    );
    return toTitles(response).map((title: Title) => ({
        title,
    }));
}

export async function preloadDataAsync(
    this: React.Component<ScenesContextProviderProps, ScenesContextType>
): Promise<void> {
    this.setState({
        titlesWithFacets: OrderedMap<string, TitleWithFacets>(),
    });

    const {getContainerId} = this.props;
    if (!getContainerId) {
        return;
    }

    const containerId = getContainerId();
    const newTitlesWithFacets = await getTitles(containerId, CONTAINER_MAX_FETCH_SIZE, 0);

    this.setState((state) => ({
        titlesWithFacets: state.titlesWithFacets.merge(newTitlesWithFacets),
    }));
}
