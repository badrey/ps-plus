import {StyleSheet} from "react-native";
import {normalizeSize} from "../../common/utils";
import {COLORS} from "../../common/colors";
import {
    borderRadius,
    IconSize,
    ScreenPadding,
    TitleThumbnailBottomBorder,
    TitleThumbnailPaddingVertical,
    TitleThumbnailSize,
    TitleTileHeight,
} from "../../settings";
import {colorsService} from "../../services/colors_service";

export const borderWidth = TitleThumbnailBottomBorder;
export const priceStyles = StyleSheet.create({
    containerText: {
        color: colorsService.secondaryFadedColor,
        fontSize: normalizeSize({size: 9}),
    },
    plusPriceText: {
        color: COLORS.PLUS_GOLD2,
        fontWeight: "700",
    },
    eaPriceText: {
        color: COLORS.RED,
        fontWeight: "700",
    },
    nonPlusPriceText: {
        fontWeight: "700",
    },
    discountPercentageText: {
        fontSize: normalizeSize({size: 7}),
        fontWeight: "700",
    },
    originalPriceText: {
        fontWeight: "700",
        textDecorationLine: "line-through",
    },
    discountedPriceText: {
        color: COLORS.BLUE_DISCOUNT,
        fontWeight: "700",
    },
    freePriceText: {
        color: COLORS.GREEN,
        fontWeight: "700",
    },
});

export const heartSize = (IconSize + 3) / 1.7181208053691275;
export const tileStyles = StyleSheet.create({
    absolute: {position: "absolute"},
    container: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: colorsService.backgroundColor,
        width: "100%",
    },
    touchable: {
        paddingVertical: TitleThumbnailPaddingVertical,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    priceInfoTouchable: {
        flex: 1,
        height: TitleTileHeight,
        borderBottomWidth: borderWidth,
        borderColor: colorsService.ternaryColor,
        justifyContent: "center",
        marginLeft: normalizeSize({size: 11}),
        paddingRight: ScreenPadding,
        marginRight: ScreenPadding,
    },
    thumbnail: {
        alignItems: "center",
        borderRadius,
        borderWidth,
        borderColor: colorsService.ternaryColor,
        justifyContent: "center",
        height: TitleThumbnailSize,
        width: TitleThumbnailSize,
    },
    placeholderStyle: {right: 0},
    titleText: {
        color: colorsService.primaryFadedColor,
        textAlign: "left",
        fontWeight: "700",
        fontSize: normalizeSize({size: 9}),
    },
    heart: {
        paddingRight: IconSize + 3 - heartSize,
    },
    heartContainer: {
        paddingLeft: ScreenPadding,
    },
});

export const titlesListStyles = StyleSheet.create({
    fullScreen: {
        height: "100%",
    },
    emptyList: {
        height: "0%",
    },
});
