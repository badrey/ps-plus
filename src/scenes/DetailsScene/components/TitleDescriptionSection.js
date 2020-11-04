/* @flow */
import * as React from "react";
import {Text, View} from "react-native";
import {sharedStyles, titleDescriptionSectionStyles as styles} from "./styles";
import {SectionHeader} from "../../../components/SectionHeader/SectionHeader";
import {SeeMoreButton} from "./SeeMoreButton";
import type {Title} from "../../../model/types";

type TitleDescriptionSectionProps = {
    onLayout: ({nativeEvent: {layout: *}}) => void,
    onSeeMore: () => void,
    title: Title,
};

type TitleDescriptionSectionState = {
    shownMore: boolean,
};

function normaliseDescription(description: string) {
    return description
        .replace(new RegExp("<br>", "g"), "\n")
        .replace(new RegExp("<br/>", "g"), "\n")
        .replace(new RegExp("<br />", "g"), "\n")
        .replace(new RegExp("<[^>]*>", "g"), "");
}

export class TitleDescriptionSection extends React.PureComponent<
    TitleDescriptionSectionProps,
    TitleDescriptionSectionState
> {
    state = {
        shownMore: false,
    };

    onSeeMoreChange = () => {
        this.setState(
            (state) => ({shownMore: !state.shownMore}),
            () => {
                if (this.state.shownMore) {
                    this.props.onSeeMore();
                }
            }
        );
    };

    render() {
        const {description} = this.props.title;
        if (!description) {
            return null;
        }
        const {shownMore} = this.state;
        const numberOfLine = shownMore ? 100 : 3;
        const text = shownMore ? "Show More" : "Show Less";
        return (
            <View
                style={[sharedStyles.sectionContainer, sharedStyles.noPaddingBottom]}
                onLayout={this.props.onLayout}
            >
                <SectionHeader header="Description" />
                <Text
                    ellipsizeMode="tail"
                    numberOfLines={numberOfLine}
                    style={styles.descriptionText}
                >
                    {`${normaliseDescription(description)}`}
                </Text>
                <SeeMoreButton
                    showMore={!shownMore}
                    text={text}
                    onPress={this.onSeeMoreChange}
                />
            </View>
        );
    }
}
