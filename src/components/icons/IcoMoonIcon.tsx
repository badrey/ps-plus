import * as React from "react";
import {FontAwesome} from "@expo/vector-icons";
import {colorsService} from "../../services/colors_service";
import {SvgIconProps} from "./SvgIcon";

type IcoMoonIconState = {
    iconSet?: typeof FontAwesome;
};
type IcoMoonIconProps = SvgIconProps;

export const createIcoMoonIconComponent = (fontLoaderPromise: any, iconName: string) => {
    return class extends React.PureComponent<IcoMoonIconProps, IcoMoonIconState> {
        state: IcoMoonIconState = {};

        componentDidMount() {
            this._isMounted = true;
            fontLoaderPromise.then((iconSet: any) => {
                if (this._isMounted) {
                    this.setState({iconSet});
                }
            });
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        _isMounted: boolean = false;

        render() {
            const IconSet = this.state.iconSet;
            if (!IconSet) {
                return null;
            }

            const {color, size, style} = this.props;
            return (
                <IconSet
                    allowFontScaling
                    color={color ?? colorsService.primaryColor}
                    name={iconName}
                    size={size}
                    style={style}
                />
            );
        }
    };
};
