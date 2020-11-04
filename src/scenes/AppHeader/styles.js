/* @flow */
import {StyleSheet} from "react-native";
import {HeaderHeight, HeaderPadding, HeaderPaddingTop} from "../../settings";
import {colorsService} from "../../services/colors_service";

export const appHeaderStyles = StyleSheet.create({
    flexOne: {
        flex: 1,
        justifyContent: "flex-start",
    },
    container: {
        alignItems: "center",
        backgroundColor: colorsService.backgroundColor,
        flexDirection: "row",
        justifyContent: "space-between",
        height: HeaderHeight,
        padding: HeaderPadding,
        paddingTop: HeaderPaddingTop + HeaderPadding,
        zIndex: 1,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 0,
    },
    rightComponentContainer: {
        justifyContent: "flex-end",
    },
});
