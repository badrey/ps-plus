/* @flow */
import * as React from "react";
import {FlatList} from "react-native";
import {TitleTile} from "./TitleTile";
import {titlesListStyles as styles} from "./styles";
import type {Title} from "../../model/types";

type TitlesListProps = {
    +onTitleSelected: (Title) => void,
    +titles: $ReadOnlyArray<Title>,
};

type Props = {
    ...TitlesListProps,
};

export class TitlesList extends React.PureComponent<Props> {
    +_renderTile = ({item: title}) => {
        const {onTitleSelected} = this.props;
        return (
            <TitleTile key={title.id} title={title} onTitleSelected={onTitleSelected} />
        );
    };

    render() {
        const {_renderTile} = this;
        return (
            <FlatList
                alwaysBounceVertical
                data={this.props.titles}
                renderItem={_renderTile}
                showsVerticalScrollIndicator={false}
                style={styles.fullScreen}
            />
        );
    }
}
