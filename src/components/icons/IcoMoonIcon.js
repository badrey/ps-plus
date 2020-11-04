/* @flow */
import * as React from "react";
import {colorsService} from "../../services/colors_service";
import type {SvgIconProps} from "./SvgIcon";

type IcoMoonIconState = {
    iconSet?: *,
};
type IcoMoonIconProps = SvgIconProps;

export const createIcoMoonIconComponent = (fontLoaderPromise: *, iconName: string) => {
    return class extends React.PureComponent<IcoMoonIconProps, IcoMoonIconState> {
        state = {iconSet: null};

        componentDidMount() {
            this._isMounted = true;
            fontLoaderPromise.then((iconSet: *) => {
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
