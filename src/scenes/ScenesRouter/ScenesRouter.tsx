import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {SearchPSPlusSceneNavStack} from "./SearchSceneNavStacks/SearchSceneNavStacks";

export const ScenesRouter = () => {
    return (
        <NavigationContainer>
            <SearchPSPlusSceneNavStack />
        </NavigationContainer>
    );
};
