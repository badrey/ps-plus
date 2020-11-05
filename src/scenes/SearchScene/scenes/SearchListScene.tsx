import * as React from "react";
import {SearchSceneBase} from "../SearchSceneBase";
import {OrderedMap} from "immutable";
import {Title} from "../../../model/types";
import {LoadingTypes} from "../../../common/types/types";
import {
    TitleWithFacets,
    WithScenesContextType,
} from "../../../contexts/ScenesContext/types";
import {StatusBar} from "./StatusBar";
import {NavigationProps} from "../../types";
import {SearchPSPlusSceneContext} from "../../../contexts/ScenesContext/ContainersSceneContexts";
import {AppHeader} from "../../AppHeader/AppHeader";
import {SearchScreen} from "../SearchScreen";
import {useIsFocused} from "@react-navigation/native";

type Props = NavigationProps & {
    isFocused: boolean;
};

type SearchSceneBaseProps = Props & WithScenesContextType;

type SearchSceneBaseState = {
    titles: Array<Title>;
};

class SearchListScene extends SearchSceneBase<
    SearchSceneBaseProps,
    SearchSceneBaseState
> {
    constructor(props: SearchSceneBaseProps) {
        super(props);
        this.state = {
            titles: [],
        };
    }

    componentDidMount() {
        this.onLoadingSearch();
    }

    componentDidUpdate(prevProps: SearchSceneBaseProps) {
        const {titlesWithFacets} = this.props.context;
        if (prevProps.context.titlesWithFacets !== titlesWithFacets) {
            this.onLoadingSearch();
        }
    }

    _setTitlesFrom = (titlesWithFacets: OrderedMap<string, TitleWithFacets>) => {
        this.setState({
            titles: titlesWithFacets.toArray().map(([key, value]) => value.title),
        });
    };

    onTitleSelected = super.onTitleSelected.bind(this);

    onLoadingSearch() {
        const {titlesWithFacets} = this.props.context;
        this._setTitlesFrom(titlesWithFacets);
    }

    getTitles() {
        return this.state.titles;
    }

    getFoundTitlesStatus() {
        const count = this.getTitles().length;
        return `Titles: ${count}`;
    }

    isToShowStatusBar() {
        const {loadingType} = this.props.context;
        return loadingType === LoadingTypes.PRELOADING;
    }

    renderStatusBar() {
        if (this.isToShowStatusBar()) {
            return (
                <StatusBar loading dynamic={true} status={this.getFoundTitlesStatus()} />
            );
        }
        return null;
    }

    render() {
        return (
            <>
                <AppHeader />
                <SearchScreen
                    titles={this.getTitles()}
                    onTitleSelected={this.onTitleSelected}
                />
                {this.renderStatusBar()}
            </>
        );
    }
}

export const SearchPSPlusScene = React.memo<NavigationProps>(
    (navigationProps: NavigationProps) => {
        const context = React.useContext(SearchPSPlusSceneContext);
        const isFocused = useIsFocused();

        return (
            <SearchListScene
                {...navigationProps}
                context={context}
                isFocused={isFocused}
            />
        );
    }
);
