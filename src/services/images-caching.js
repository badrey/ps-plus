/* @flow */
import {ScreenContentWidth, TitleThumbnailScale, TitleThumbnailSize} from "../settings";
import {getReverse16To9Dimensions} from "../common/utils/dynamicDimensions";
import {
    screenShotHeight,
    screenShotWidth,
} from "../scenes/DetailsScene/components/styles";

export const smallThumbnailSize = TitleThumbnailSize;
export const largeThumbnailSize = ScreenContentWidth;

export function getScaledThumbnailUrl(
    url: string,
    size: number = smallThumbnailSize
): string {
    const _size = Math.floor(size * TitleThumbnailScale);
    return `${url}?h=${_size}&w=${_size}`;
}

export function getScaleScreenshotUrl(url: string, isFullscreen: boolean): string {
    let height = screenShotHeight;
    let width = screenShotWidth;
    if (isFullscreen) {
        height = getReverse16To9Dimensions().height;
        width = getReverse16To9Dimensions().width;
    }
    return `${url}?h=${Math.floor(height * TitleThumbnailScale)}&w=${Math.floor(
        width * TitleThumbnailScale
    )}`;
}
