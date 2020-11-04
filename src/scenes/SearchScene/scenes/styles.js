/* @flow */
import {StyleSheet} from "react-native";
import {normalizeSize} from "../../../common/utils";
import {colorsService} from "../../../services/colors_service";

export const StatusBarStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorsService.ternaryColor,
        flexDirection: "row",
    },
    statusText: {
        color: colorsService.primaryColor,
        fontSize: normalizeSize({size: 11}),
    },
});
