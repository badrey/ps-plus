import * as React from "react";
import {Text, TouchableOpacity} from "react-native";
import {seeMoreButtonStyles as styles} from "./styles";
import {SvgIcons} from "../../../components/icons/SvgIcon";
import {IconSize} from "../../../settings";

type SeeMoreButtonProps = {
    onPress: () => void;
    showMore: boolean;
    text: string;
};

export class SeeMoreButton extends React.PureComponent<SeeMoreButtonProps> {
    render() {
        const {text, showMore, onPress} = this.props;
        const Icon = showMore ? SvgIcons.moreArrow : SvgIcons.lessArrow;
        return (
            <TouchableOpacity
                style={styles.container}
                onLongPress={onPress}
                onPress={onPress}
            >
                <Text style={styles.text}>{text}</Text>
                <Icon size={IconSize} />
            </TouchableOpacity>
        );
    }
}
