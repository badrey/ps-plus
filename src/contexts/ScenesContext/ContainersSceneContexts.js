/* @flow */
import * as React from "react";
import {defaultScenesContext, ScenesContextProvider} from "./ScenesContext";
import {preloadDataAsync} from "./utils";
import {getPSPlusContainerId} from "../../api";
import type {ChildrenType, ScenesContextType} from "./types";

type Props = {
    context: React$Context<ScenesContextType>,
    getContainerId: () => string,
    ...ChildrenType,
};

const SearchContainerSceneContextProvider = React.memo<Props>((props: Props) => {
    const {children, getContainerId, context} = props;
    return (
        <ScenesContextProvider
            children={children}
            getContainerId={getContainerId}
            preloadDataAsync={preloadDataAsync}
            scenesContext={context}
        />
    );
});

export const SearchPSPlusSceneContext: React$Context<ScenesContextType> = React.createContext(
    defaultScenesContext
);

export const SearchPSPlusSceneContextProvider = ({children}: ChildrenType) => {
    return (
        <SearchContainerSceneContextProvider
            context={SearchPSPlusSceneContext}
            getContainerId={getPSPlusContainerId}
        >
            {children}
        </SearchContainerSceneContextProvider>
    );
};
