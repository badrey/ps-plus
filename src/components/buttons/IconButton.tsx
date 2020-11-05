import * as React from "react";
import {Animated, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {SvgIconNamesType, SvgIcons} from "../icons/SvgIcon";

import {iconButtonStyles as styles} from "./styles";
import {IconSize} from "../../settings";

type IconButtonProps = {
    readonly animated?: boolean;
    readonly buttonStyle?: ViewStyle;
    readonly color?: string;
    readonly name?: SvgIconNamesType;
    readonly onPress: () => void;
    readonly size?: number;
    readonly text?: string;
    readonly textColor?: string;
    readonly textStyle?: ViewStyle;
};

export class IconButton extends React.PureComponent<IconButtonProps> {
    render() {
        const {
            animated,
            buttonStyle,
            color,
            name,
            onPress,
            text,
            textColor,
            textStyle,
        } = this.props;
        const SvgIcon = !!name && SvgIcons[name];
        const Touchable = animated
            ? Animated.createAnimatedComponent(TouchableOpacity)
            : TouchableOpacity;
        const size = this.props.size ?? IconSize;
        return (
            <Touchable
                hitSlop={{
                    top: 7,
                    left: 7,
                    right: 7,
                    bottom: 7,
                }}
                style={[styles.button, buttonStyle]}
                onLongPress={onPress}
                onPress={onPress}
            >
                <>
                    {SvgIcon && (
                        <View
                            style={{
                                width: size + 3,
                                height: size + 3,
                            }}
                        >
                            <SvgIcon color={color} size={size} />
                        </View>
                    )}
                    {!!text && (
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={[
                                styles.text,
                                textStyle,
                                !!textColor && {color: textColor},
                            ]}
                        >
                            {text}
                        </Text>
                    )}
                </>
            </Touchable>
        );
    }
}
