import * as React from "react";
import {Text, TextStyle} from "react-native";
import {sectionHeaderStyles as styles} from "./styles";

type SectionHeaderProps = {
    readonly header: string;
    readonly main: boolean;
    style?: TextStyle;
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
