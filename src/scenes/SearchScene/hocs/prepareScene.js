/* @flow */
import * as React from "react";
import type {ScenesContextType} from "../../../contexts/ScenesContext/types";
import type {NavigationProps} from "../../types";
import {useIsFocused} from "@react-navigation/native";

export function prepareScene(
    Scene: React.Element,
    sceneContext?: React$Context<ScenesContextType>
) {
    return React.memo<NavigationProps>((navigationProps: NavigationProps) => {
        const context = React.useContext(sceneContext);
        const isFocused = useIsFocused();

        return <Scene {...navigationProps} context={context} isFocused={isFocused} />;
    });
}
