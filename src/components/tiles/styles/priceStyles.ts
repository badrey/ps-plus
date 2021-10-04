import {StyleSheet} from "react-native";
import {colorsService} from "../../../services/colors_service";
import {normalizeSize} from "../../../common/utils";
import {borderRadius} from "../../../settings";
import {COLORS} from "../../../common/colors";

export const priceStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    paddingTop: {
        paddingTop: normalizeSize({size: 3}),
    },
    containerText: {
        color: colorsService.secondaryFadedColor,
        fontSize: normalizeSize({size: 11}),
        fontWeight: "700",
    },
    containerTextSize: {
        fontSize: normalizeSize({size: 11}),
    },
    plusPriceText: {
        fontSize: normalizeSize({size: 9}),
        color: colorsService.goldenColor,
        fontWeight: "700",
    },
    plusPriceColor: {
        color: colorsService.goldenColor,
    },
    eaPriceText: {
        fontSize: normalizeSize({size: 9}),
        color: colorsService.redColor,
        fontWeight: "700",
    },
    eaPriceColor: {
        color: colorsService.redColor,
    },
    nowPriceText: {
        fontSize: normalizeSize({size: 9}),
        color: COLORS.PS_NOW_COLOR,
        fontWeight: "700",
    },
    nowPriceColor: {
        color: COLORS.PS_NOW_COLOR,
    },
    otherPriceText: {
        color: colorsService.secondaryFadedColor,
        fontSize: normalizeSize({size: 9}),
        fontWeight: "700",
    },
    nonPlusPriceText: {},
    discountPercentageText: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorsService.secondaryFadedColor,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colorsService.primaryColor,
        paddingHorizontal: normalizeSize({size: 3}),
        borderRadius,
        color: colorsService.backgroundColor,
        fontSize: normalizeSize({size: 9}),
        fontWeight: "700",
        marginRight: normalizeSize({size: 3}),
        overflow: "hidden",
    },
    originalPriceText: {
        textDecorationLine: "line-through",
        fontSize: normalizeSize({size: 9}),
    },
    discountedPriceText: {},
    freePriceText: {},
});
