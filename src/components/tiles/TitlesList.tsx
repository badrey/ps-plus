import * as React from "react";
import {FlatList} from "react-native";
import {TitleTile} from "./TitleTile";
import {titlesListStyles as styles} from "./styles";
import {Title} from "../../model/types";

type TitlesListProps = {
    onTitleSelected: (arg0: Title) => void;
    titles: ReadonlyArray<Title>;
};

type Props = TitlesListProps;

export class TitlesList extends React.PureComponent<Props> {
    _renderTile = ({item: title}: {item: Title}) => {
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
