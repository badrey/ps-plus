/* @flow */
import * as React from "react";
import {StyleSheet, Text} from "react-native";
import {sectionHeaderStyles as styles} from "./styles";

type SectionHeaderProps = {
    +header: string,
    +main: boolean,
    style?: StyleSheet.Styles,
};

class SectionHeader extends React.PureComponent<SectionHeaderProps> {
    static defaultProps = {
        main: false,
    };

    render() {
        const {header, main, style} = this.props;
        const headerStyle = main ? styles.mainHeaderText : styles.subHeaderText;
        return (
            <Text
                ellipsizeMode="tail"
                numberOfLines={3}
                style={[styles.container, headerStyle, style]}
            >
                {header}
            </Text>
        );
    }
}

export {SectionHeader};
