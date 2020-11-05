import * as Font from "expo-font";
import {createIconSetFromIcoMoon} from "@expo/vector-icons";
// @ts-ignore
import icoMoonConfig from "../../../resources/icons/icons/selection.json";
import {createIcoMoonIconComponent} from "./IcoMoonIcon";

const fontName = "Icons";
export const iconsFontLoaderPromise = Font.loadAsync({
    /* eslint-disable-next-line global-require */
    [fontName]: require("../../../resources/icons/icons/fonts/icomoon.ttf"),
}).then(() => {
    return createIconSetFromIcoMoon(icoMoonConfig, fontName, fontName);
});

export const RightArrowIcon = createIcoMoonIconComponent(
    iconsFontLoaderPromise,
    "right_arrow"
);
export const LeftArrowIcon = createIcoMoonIconComponent(
    iconsFontLoaderPromise,
    "left_arrow"
);
export const MoreArrowIcon = createIcoMoonIconComponent(
    iconsFontLoaderPromise,
    "more_arrow"
);
export const LessArrowIcon = createIcoMoonIconComponent(
    iconsFontLoaderPromise,
    "less_arrow"
);
export const Loader = createIcoMoonIconComponent(iconsFontLoaderPromise, "loader");
