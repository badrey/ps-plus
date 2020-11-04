/* @flow */
import * as React from "react";
import {Animated, StyleSheet} from "react-native";
import {tileStyles as styles} from "./styles";
import {getScaledThumbnailUrl} from "../../services/images-caching";

type TitleThumbnailProps = {
    +animatedScaleStyle?: StyleSheet.Styles,
    +placeholderStyle?: StyleSheet.Styles,
    +size?: number,
    +thumbnailUrl: string,
};

type TitleThumbnailState = {
    useScaledUrl: boolean,
};

export class TitleThumbnail extends React.PureComponent<
    TitleThumbnailProps,
    TitleThumbnailState
> {
    state = {
        useScaledUrl: true,
    };

    +_onError = () => {
        if (this.state.useScaledUrl) {
            this.setState({useScaledUrl: false});
        }
    };

    render() {
        const {size, thumbnailUrl} = this.props;
        const {useScaledUrl} = this.state;
        const uri = useScaledUrl
            ? getScaledThumbnailUrl(thumbnailUrl, size)
            : thumbnailUrl;
        return (
            <Animated.Image
                source={{uri: !!uri ? uri : "ne"}}
                style={[
                    styles.thumbnail,
                    size && {height: size, width: size},
                    this.props.animatedScaleStyle,
                ]}
                onError={this._onError}
            />
        );
    }
}
