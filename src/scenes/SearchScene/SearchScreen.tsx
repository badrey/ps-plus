import * as React from "react";
import {View} from "react-native";
import {TitlesList} from "../../components";
import {searchScreenStyles as styles} from "./styles";
import {SceneTitle} from "../../components/SceneTitle/SceneTitle";
import {Title} from "../../model/types";
import {commonStyles} from "../styles";

type SearchScreenProps = {
    readonly onTitleSelected: (arg0: Title) => void;
    readonly titles: ReadonlyArray<Title>;
};

type SearchScreenState = {};

class SearchScreen extends React.PureComponent<SearchScreenProps, SearchScreenState> {
    static defaultProps = {
        titles: [],
    };

    render() {
        const {titles, onTitleSelected} = this.props;
        return (
            <View style={styles.container}>
                <SceneTitle style={commonStyles.paddingHorizontal} title="PS Plus" />
                <View style={commonStyles.padding} />
                <TitlesList titles={titles} onTitleSelected={onTitleSelected} />
            </View>
        );
    }
}

export {SearchScreen};
