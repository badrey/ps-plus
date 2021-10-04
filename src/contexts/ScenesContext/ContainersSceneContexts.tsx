import * as React from "react";
import {defaultScenesContext, ScenesContextProvider} from "./ScenesContext";
import {preloadDataAsync} from "./ps5/utils";
import {getPSPlusContainerId} from "../../api";
import {ChildrenType, ScenesContextType} from "./types";
import {AccountInfoContext} from "../Account/AccountContext";

type Props = ChildrenType & {
    context: React.Context<ScenesContextType>;
    getContainerId: () => string;
};

const SearchContainerSceneContextProvider = React.memo<Props>((props: Props) => {
    const {children, getContainerId, context} = props;
    const {storeLocale} = React.useContext(AccountInfoContext);
    return (
        <ScenesContextProvider
            children={children}
            getContainerId={getContainerId}
            preloadDataAsync={preloadDataAsync}
            scenesContext={context}
            storeLocale={storeLocale}
        />
    );
});

export const SearchPSPlusSceneContext: React.Context<ScenesContextType> = React.createContext(
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
