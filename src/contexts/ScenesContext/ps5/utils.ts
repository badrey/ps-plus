import * as PS5StoreApi from "../../../api/ps5/store-api";
import {OrderedMap} from "immutable";
import {CONTAINER_MAX_FETCH_SIZE} from "../../../settings";
import type {CategoryStrandRetrieveResponse} from "../../../model/ps5/response-types";
import {categoryStrandResponseToTitles} from "../../../api/ps5/store-api";
import {ScenesContextType, TitleWithFacets} from "../types";
import {Title} from "../../../model/types";
import * as React from "react";
import {ScenesContextProviderProps} from "../ScenesContext";

export async function getTitles({
    storeLocale,
    containerId,
    pageSize,
    start,
}: {
    containerId: string;
    pageSize: number;
    start: number;
    storeLocale: string;
}): Promise<OrderedMap<string, TitleWithFacets>> {
    const response: CategoryStrandRetrieveResponse | null = await PS5StoreApi.categoryStrandSearch(
        {
            storeLocale,
            categoryId: containerId,
            size: pageSize,
            offset: start,
        }
    );
    const titlesMap = await categoryStrandResponseToTitles({response, storeLocale});
    return titlesMap.map((title: Title) => ({
        title,
    }));
}

export async function preloadDataAsync(
    this: React.Component<ScenesContextProviderProps, ScenesContextType>
): Promise<boolean> {
    this.setState({
        titlesWithFacets: OrderedMap(),
    });

    const {storeLocale} = this.props;
    const containerId = await this.props.getContainerId();

    const newTitlesWithFacets = await getTitles({
        storeLocale,
        containerId,
        pageSize: CONTAINER_MAX_FETCH_SIZE,
        start: 0,
    });

    this.setState((state) => ({
        titlesWithFacets: state.titlesWithFacets.merge(newTitlesWithFacets),
    }));
    return true;
}
