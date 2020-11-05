import * as React from "react";
import {Text} from "react-native";
import {titleDetailsSectionStyles as styles} from "./styles";

type TitleDetailProps = {
    header: string;
    value: string;
};

class TitleDetail extends React.PureComponent<TitleDetailProps> {
    render() {
        const {header, value} = this.props;
        return (
            <Text style={styles.valueText}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.headerText}>
                    {header}:{" "}
                </Text>
                {value}
            </Text>
        );
    }
}

export {TitleDetail};
