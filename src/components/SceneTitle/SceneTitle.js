/* @flow */
import * as React from "react";
import {StyleSheet, Text} from "react-native";
import {sceneTitleStyles as styles} from "./styles";

type SceneTitleProps = {
    style?: StyleSheet.Styles,
    title: string,
};

class SceneTitle extends React.PureComponent<SceneTitleProps> {
    render() {
        const {style, title} = this.props;
        return (
            <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.titleText, style]}
            >
                {title}
            </Text>
        );
    }
}

export {SceneTitle};
