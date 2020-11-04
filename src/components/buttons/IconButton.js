/* @flow */
import * as React from "react";
import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import type {SvgIconNamesType} from "../icons/SvgIcon";
import {SvgIcons} from "../icons/SvgIcon";
import {iconButtonStyles as styles} from "./styles";
import {IconSize} from "../../settings";

type IconButtonProps = {
    +animated?: boolean,
    +buttonStyle?: StyleSheet.Styles,
    +color?: string,
    +name?: SvgIconNamesType,
    +onPress: () => void,
    +size?: number,
    +text?: string,
    +textColor?: string,
    +textStyle?: StyleSheet.Styles,
};

class IconButton extends React.PureComponent<IconButtonProps> {
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
                hitSlope={{
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
                                textColor && {color: textColor},
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

export {IconButton};
