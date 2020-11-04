/* @flow */
import {OrderedMap} from "immutable";
import type {Title} from "../../model/types";
import type {LoadingType} from "../../common/types";

export type ChildrenType = {+children: React$Node};

export type WithScenesContextType = {
    context: $ReadOnly<ScenesContextType>,
};

export type ScenesContextType = {
    loadingType: LoadingType,
    titlesWithFacets: OrderedMap<string, TitleWithFacets>,
};

export type TitleWithFacets = {|
    +title: Title,
|};
