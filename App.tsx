import * as React from "react";
import {StatusBar} from "react-native";
import AppLoading from "expo-app-loading";
import {ScenesRouter} from "./src/scenes/ScenesRouter/ScenesRouter";
import {iconsFontLoaderPromise} from "./src/components/icons/Icons";
import {colorsService} from "./src/services/colors_service";
import {SearchPSPlusSceneContextProvider} from "./src/contexts/ScenesContext/ContainersSceneContexts";
import {AccountInfoContextProvider} from "./src/contexts/Account/AccountContext";

const loadAssetsAsync = async () => {
    await Promise.all([iconsFontLoaderPromise]);
};

function DynamicAppContent() {
    const [isReady, setIsReady] = React.useState(false);

    const onFinish = React.useCallback(() => setIsReady(true), []);
    if (!isReady) {
        return (
            // @ts-ignore
            <AppLoading
                startAsync={loadAssetsAsync}
                /* eslint-disable-next-line no-console */
                onError={console.warn}
                onFinish={onFinish}
            />
        );
    }

    return (
        <AccountInfoContextProvider>
            <SearchPSPlusSceneContextProvider>
                <ScenesRouter />
            </SearchPSPlusSceneContextProvider>
        </AccountInfoContextProvider>
    );
}

export default function App() {
    return (
        <>
            <StatusBar
                backgroundColor={colorsService.backgroundColor}
                barStyle="dark-content"
            />
            <DynamicAppContent />
        </>
    );
}
