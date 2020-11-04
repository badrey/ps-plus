/* @flow */
import {StyleSheet} from "react-native";
import {normalizeSize} from "../../common/utils";
import {colorsService} from "../../services/colors_service";

const fontSize = normalizeSize({size: 21});
export const sceneTitleContainerHeight = fontSize + normalizeSize({size: 5}) * 2;
export const sceneTitleStyles = StyleSheet.create({
    titleText: {
        alignSelf: "center",
        color: colorsService.primaryColor,
        fontSize,
        fontWeight: "bold",
        height: sceneTitleContainerHeight,
        justifyContent: "center",
        textAlign: "left",
        width: "100%",
    },
});
