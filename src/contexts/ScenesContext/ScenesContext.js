/* @flow */
/* eslint-disable react/no-unused-state */
import {OrderedMap, OrderedSet} from "immutable";
import * as React from "react";
import type {ScenesContextType} from "./types";
import {LoadingTypes} from "../../common/types/types";
import {logError} from "../../common/utils";

type Props = {
    +children: React$Node,
    +getContainerId?: (string) => string,
    +preloadDataAsync?: () => Promise<void>,
    +scenesContext: React$Context<ScenesContextType>,
};
type ScenesContextProviderProps = {
    ...Props,
};

export const defaultScenesContext: ScenesContextType = {
    titlesWithFacets: OrderedMap(),
    loadingType: LoadingTypes.NONE,
};

class ScenesContextProviderBase extends React.PureComponent<
    ScenesContextProviderProps,
    ScenesContextType
> {
    constructor(props: ScenesContextProviderProps) {
        super(props);

        this.state = {
            ...defaultScenesContext,
            titlesWithFacets: OrderedMap(),
        };

        this.addOnLoadingStarted(() => {
            this.setState({
                loadingType: LoadingTypes.PRELOADING,
            });
        });
        this.addOnLoadingCompleted(() => {
            this.setState({loadingType: LoadingTypes.NONE});
        });
    }

    _dataLoadingPromise = Promise.resolve();

    componentDidMount() {
        this._refreshData();
    }

    +_refreshData = () => {
        return this._preloadData();
    };

    +_preloadData = async () => {
        const {preloadDataAsync} = this.props;
        await this._doLoadData(preloadDataAsync);
    };

    _doLoadData = (loadData) => {
        if (loadData) {
            this._dataLoadingPromise = this._dataLoadingPromise.then(() => {
                this.callOnLoadingStartedListeners();
                return loadData
                    .call(this)
                    .catch((error) => {
                        logError(error);
                    })
                    .finally(() => {
                        this.callOnLoadingCompletedListeners();
                    });
            });
            return this._dataLoadingPromise;
        }
        return Promise.resolve();
    };

    _onLoadingStartedListeners: OrderedSet<() => void> = OrderedSet();

    +addOnLoadingStarted = (listener: () => void) => {
        this._onLoadingStartedListeners = this._onLoadingStartedListeners.add(listener);
    };

    +removeOnLoadingStarted = (listener: () => void) => {
        this._onLoadingStartedListeners = this._onLoadingStartedListeners.remove(
            listener
        );
    };

    +callOnLoadingStartedListeners = () => {
        this._onLoadingStartedListeners.forEach((listener) => listener());
    };

    _onLoadingCompletedListeners: OrderedSet<() => void> = OrderedSet();

    +addOnLoadingCompleted = (listener: () => void) => {
        this._onLoadingCompletedListeners = this._onLoadingCompletedListeners.add(
            listener
        );
    };

    +removeOnLoadingCompleted = (listener: () => void) => {
        this._onLoadingCompletedListeners = this._onLoadingCompletedListeners.remove(
            listener
        );
    };

    +callOnLoadingCompletedListeners = () => {
        this._onLoadingCompletedListeners.forEach((listener) => listener());
    };

    render() {
        const {Provider} = this.props.scenesContext;
        return <Provider value={this.state}>{this.props.children}</Provider>;
    }
}

export const ScenesContextProvider = React.forwardRef<
    ScenesContextProviderProps,
    ?React.ElementRef<typeof ScenesContextProviderBase>
>((props: Props, ref: *) => {
    return <ScenesContextProviderBase ref={ref} {...props} />;
});
