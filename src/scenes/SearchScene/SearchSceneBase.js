/* @flow */
import * as React from "react";
import type {WithScenesContextType} from "../../contexts/ScenesContext/types";
import type {Title} from "../../model/types";
import type {NavigationProps} from "../types";

export class SearchSceneBase<
    Props: {
        ...NavigationProps,
        ...WithScenesContextType,
        ...
    },
    State: {...}
> extends React.PureComponent<Props, State> {
    onTitleSelected(title: Title) {
        const {navigation} = this.props;
        navigation.navigate("TitleDetailsScene", {
            prevSceneDisplayName: "PS Plus",
            title,
        });
    }
}
