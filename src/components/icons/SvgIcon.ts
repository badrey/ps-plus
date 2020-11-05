import {ViewStyle} from "react-native";
import {
    LeftArrowIcon,
    RightArrowIcon,
    MoreArrowIcon,
    LessArrowIcon,
    Loader,
} from "./Icons";

export type SvgIconProps = {
    color?: string;
    readonly size: number;
    style?: ViewStyle;
};

export const SvgIcons = {
    rightArrow: RightArrowIcon,
    leftArrow: LeftArrowIcon,
    moreArrow: MoreArrowIcon,
    lessArrow: LessArrowIcon,
    loader: Loader,
};
export type SvgIconNamesType = keyof typeof SvgIcons;
