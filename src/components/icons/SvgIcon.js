/* @flow */
/* eslint-disable no-param-reassign */
import * as React from "react";
import {StyleSheet} from "react-native";
import {
    LeftArrowIcon,
    RightArrowIcon,
    MoreArrowIcon,
    LessArrowIcon,
    Loader,
} from "./Icons";

export type SvgIconProps = {
    color?: string,
    +size: number,
    style?: StyleSheet.Styles,
};

export const SvgIcons = {
    rightArrow: RightArrowIcon,
    leftArrow: LeftArrowIcon,
    moreArrow: MoreArrowIcon,
    lessArrow: LessArrowIcon,
    loader: Loader,
};
export type SvgIconNamesType = $Keys<typeof SvgIcons>;
export const SvgIconNames: {
    +[imageName: string]: SvgIconNamesType,
    ...
} = Object.keys(SvgIcons).reduce((curObject: Object, curValue: string) => {
    curObject[curValue] = curValue;
    return curObject;
}, {});
