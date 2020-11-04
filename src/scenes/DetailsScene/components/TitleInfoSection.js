/* @flow */
import * as React from "react";
import {Text} from "react-native";
import {titleMainInfoStyles as styles} from "./styles";
import type {Title} from "../../../model/types";

import {lDate} from "../../../services/localization-service";

type TitleMainInfoProps = {
    +title: Title,
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
                    {platforms?.length && ` | ${platforms}`}
                </Text>
            </>
        );
    }
}

export {TitleInfoSection};
