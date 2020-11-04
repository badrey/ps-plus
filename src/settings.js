/* @flow */
import {normalizeSize} from "./common/utils/utils";
import Constants from "expo-constants";
import {Dimensions, NativeModules, Platform, StyleSheet} from "react-native";
import {enableScreens} from "react-native-screens";
import {windowHeight, windowWidth} from "./common/utils/golden-ratio";

export const isAndroid = Platform.OS === "android";

export const CONTAINER_MAX_FETCH_SIZE = 99;
export const borderRadius = 3;

// styling constants
export const IconButtonPadding = normalizeSize({size: 3.5});
export const IconSize = normalizeSize({size: 19});
export const IconButtonSize = IconSize + IconButtonPadding * 2;
export const HeaderPadding = normalizeSize({size: 3.5});
export const ScreenPadding = HeaderPadding + IconButtonPadding;
export const ScreenContentWidth = Math.floor(windowWidth - ScreenPadding * 2);
const headerHeight = IconButtonSize + HeaderPadding * 2;
export const StatusBarHeight = Constants.statusBarHeight;
export const HeaderPaddingTop =
    Dimensions.get("window").height === Dimensions.get("screen").height
        ? StatusBarHeight
        : 0;
export const HeaderHeight = headerHeight + HeaderPaddingTop;
export const SceneHeight =
    windowHeight - HeaderHeight - (isAndroid ? StatusBarHeight : 0);
export const TitleThumbnailBottomBorder = StyleSheet.hairlineWidth;
export const TitleThumbnailPaddingVertical = normalizeSize({size: 2});
export const TitleThumbnailPaddingVerticalWithBorder =
    TitleThumbnailPaddingVertical * 2 + TitleThumbnailBottomBorder;
export const TitlesPerScreen = 7.3;
export const TitleThumbnailSize =
    SceneHeight / TitlesPerScreen - TitleThumbnailPaddingVerticalWithBorder;
export const TitleThumbnailScale = 1.7;
export const TitleTileHeight =
    TitleThumbnailPaddingVerticalWithBorder + TitleThumbnailSize;
// For animations to work on Android according to https://facebook.github.io/react-native/docs/animations.html#layoutanimation-api
const {UIManager} = NativeModules;
if (isAndroid) {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

enableScreens();
