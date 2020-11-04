/* @flow */
import type {FacetedSearchResponse} from "../../api";
import * as StoreApi from "../../api/store-api";
import {toTitles} from "../../model/responses-api";
import {OrderedMap} from "immutable";
import {CONTAINER_MAX_FETCH_SIZE} from "../../settings";

export async function getTitles(containerId: string, pageSize: number, start: number) {
    const response: FacetedSearchResponse = await StoreApi.containerSearch(
        containerId,
        start,
        pageSize
    );
    return toTitles(response).map((title) => ({
        title,
    }));
}

export function setNewTitlesWithFacetsPromise(newTitlesWithFacets, that) {
    return new Promise((resolve) => {
        that.setState(
            (state) => ({
                titlesWithFacets: state.titlesWithFacets.merge(newTitlesWithFacets),
            }),
            resolve
        );
    });
}

export async function preloadDataAsync(): Promise<void> {
    await new Promise((resolve) => {
        this.setState(
            {
                titlesWithFacets: OrderedMap(),
            },
            resolve
        );
    });

    const containerId = this.props.getContainerId();
    const newTitlesWithFacets = await getTitles(containerId, CONTAINER_MAX_FETCH_SIZE, 0);

    await setNewTitlesWithFacetsPromise(newTitlesWithFacets, this);
}
