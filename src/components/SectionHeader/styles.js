/* @flow */
import {normalizeSize} from "../../common/utils";
import {StyleSheet} from "react-native";
import {colorsService} from "../../services/colors_service";

export const subHeaderTextSize = normalizeSize({size: 15});
export const sectionHeaderStyles = StyleSheet.create({
    container: {
        paddingBottom: normalizeSize({size: 7}),
    },
    mainHeaderText: {
        color: colorsService.primaryColor,
        textAlign: "left",
        fontWeight: "bold",
        fontSize: normalizeSize({size: 17}),
    },
    subHeaderText: {
        color: colorsService.primaryColor,
        textAlign: "left",
        fontWeight: "bold",
        fontSize: subHeaderTextSize,
    },
});
