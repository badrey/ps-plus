import * as React from "react";
import {WithScenesContextType} from "../../contexts/ScenesContext/types";
import {Title} from "../../model/types";
import {NavigationProps} from "../types";

export class SearchSceneBase<
    Props extends NavigationProps & WithScenesContextType,
    State extends {}
> extends React.PureComponent<Props, State> {
    onTitleSelected(title: Title) {
        const {navigation} = this.props;
        navigation.navigate("TitleDetailsScene", {
            prevSceneDisplayName: "PS Plus",
            title,
        });
    }
}
