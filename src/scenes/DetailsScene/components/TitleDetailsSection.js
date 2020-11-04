/* @flow */
import * as React from "react";
import {View} from "react-native";
import {sharedStyles} from "./styles";
import {SectionHeader} from "../../../components/SectionHeader/SectionHeader";
import {lDate} from "../../../services/localization-service";
import type {Title} from "../../../model/types";
import {arrayToDisplayString} from "./utils";
import {TitleDetail} from "./TitleDetail";

type TitleDetailsSectionProps = {
    title: Title,
};

class TitleDetailsSection extends React.PureComponent<TitleDetailsSectionProps> {
    renderGenres() {
        const {genres} = this.props.title;
        if (genres && genres.length > 0) {
            return <TitleDetail header="Genre" value={arrayToDisplayString(genres)} />;
        }
        return null;
    }

    renderSize() {
        const {fileSize} = this.props.title;
        const hasSize = !!fileSize?.value;
        return (
            hasSize && (
                <TitleDetail header="Size" value={`${fileSize.value} ${fileSize.unit}`} />
            )
        );
    }

    renderReleaseDate() {
        const {releaseDate} = this.props.title;
        if (!!releaseDate) {
            return <TitleDetail header="Released" value={lDate(releaseDate)} />;
        }
        return null;
    }

    renderPlatforms() {
        const {platforms} = this.props.title;
        if (platforms && platforms.length > 0) {
            return (
                <TitleDetail
                    header="Playable On"
                    value={arrayToDisplayString(platforms)}
                />
            );
        }
        return null;
    }

    render() {
        return (
            <View style={sharedStyles.sectionContainer}>
                <SectionHeader header="Details" />
                {this.renderGenres()}
                {this.renderSize()}
                {this.renderReleaseDate()}
                {this.renderPlatforms()}
            </View>
        );
    }
}

export {TitleDetailsSection};
