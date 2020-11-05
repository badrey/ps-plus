import * as React from "react";
import {OrderedMap} from "immutable";
import {Title} from "../../model/types";
import {LoadingType} from "../../common/types";

export type ChildrenType = {readonly children: React.ReactNode};

export type WithScenesContextType = {
    context: Readonly<ScenesContextType>;
};

export type ScenesContextType = {
    loadingType: LoadingType;
    titlesWithFacets: OrderedMap<string, TitleWithFacets>;
};

export type TitleWithFacets = {
    readonly title: Title;
};
