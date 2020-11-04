/* @flow */
import {StyleSheet} from "react-native";
import {normalizeSize} from "../../../common/utils";
import {colorsService} from "../../../services/colors_service";
import {COLORS} from "../../../common/colors";
import {ScreenContentWidth} from "../../../settings";

export const ratio = 0.5625;
export const screenShotPadding = 1.5;
export const screenShotWidth = ScreenContentWidth * 0.937 - screenShotPadding * 2;
export const screenShotHeight = Math.floor(screenShotWidth * ratio);
const sectionContainerPaddingVertical = normalizeSize({size: 11});

export const priceSize = normalizeSize({size: 15});
export const priceStyles = StyleSheet.create({
    containerText: {
        color: colorsService.primaryColor,
        fontSize: priceSize,
    },
    plusPriceText: {
        color: COLORS.PLUS_GOLD2,
        fontWeight: "bold",
    },
    nonPlusPriceText: {
        fontWeight: "bold",
    },
    discountPercentageText: {
        fontSize: normalizeSize({size: 11}),
        fontWeight: "700",
    },
    originalPriceText: {
        color: colorsService.secondaryFadedColor,
        fontWeight: "700",
        textDecorationLine: "line-through",
    },
    discountedPriceText: {
        color: COLORS.BLUE_DISCOUNT,
        fontWeight: "bold",
    },
    freePriceText: {
        color: COLORS.DEMO_GREEN,
        fontWeight: "bold",
    },
});

export const sharedStyles = StyleSheet.create({
    sectionContainer: {
        width: "100%",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: colorsService.ternaryColor,
        paddingVertical: sectionContainerPaddingVertical,
    },
    noPaddingBottom: {
        paddingBottom: 0,
    },
    sectionText: {
        color: colorsService.primaryColor,
        textAlign: "left",
        fontSize: normalizeSize({size: 11}),
        paddingTop: normalizeSize({size: 11}),
    },
    noteText: {
        color: colorsService.secondaryColor,
        textAlign: "left",
        fontSize: normalizeSize({size: 9}),
        paddingTop: normalizeSize({size: 9}),
    },
    discountTextColor: {
        color: COLORS.BLUE_DISCOUNT,
    },
    psPlusTextColor: {
        color: COLORS.PLUS_GOLD2,
    },
});

export const titleMainInfoStyles = StyleSheet.create({
    providerNameText: {
        color: colorsService.secondaryColor,
        textAlign: "left",
        fontSize: normalizeSize({size: 13}),
    },
    platformsText: {
        color: colorsService.primaryColor,
        textAlign: "left",
        fontWeight: "600",
        fontSize: normalizeSize({size: 15}),
        paddingBottom: sectionContainerPaddingVertical,
    },
    releaseDateText: {
        color: colorsService.primaryColor,
        textAlign: "left",
        fontWeight: "600",
        fontSize: normalizeSize({size: 13}),
    },
});

export const titleDetailsSectionStyles = StyleSheet.create({
    valueText: {
        color: colorsService.primaryColor,
        textAlign: "left",
        fontSize: normalizeSize({size: 11}),
        padding: normalizeSize({size: 1.5}),
    },
    headerText: {
        color: colorsService.primaryColor,
        textAlign: "left",
        fontWeight: "bold",
        fontSize: normalizeSize({size: 11}),
    },
});

export const titleDescriptionSectionStyles = StyleSheet.create({
    descriptionText: {
        color: colorsService.primaryColor,
        textAlign: "left",
        fontSize: normalizeSize({size: 11}),
    },
});

export const seeMoreButtonStyles = StyleSheet.create({
    container: {
        paddingTop: normalizeSize({size: 5}),
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: colorsService.primaryColor,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: normalizeSize({size: 11}),
    },
});
