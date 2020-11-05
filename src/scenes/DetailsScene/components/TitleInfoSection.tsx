import * as React from "react";
import {Text} from "react-native";
import {titleMainInfoStyles as styles} from "./styles";
import {Title} from "../../../model/types";

import {lDate} from "../../../services/localization-service";

type TitleMainInfoProps = {
    readonly title: Title;
};

class TitleInfoSection extends React.PureComponent<TitleMainInfoProps> {
    render() {
        const {title} = this.props;
        const {providerName, platforms, contentType, releaseDate} = title;
        return (
            <>
                {!!providerName && (
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={2}
                        style={styles.providerNameText}
                    >
                        {providerName}
                    </Text>
                )}
                <Text ellipsizeMode="tail" numberOfLines={2} style={styles.platformsText}>
                    {!!contentType && contentType}
                    {!!releaseDate && ` | ${lDate(releaseDate)}`}
                    {platforms?.length && ` | ${platforms.toString()}`}
                </Text>
            </>
        );
    }
}

export {TitleInfoSection};
