import * as React from "react";
import {View, Text} from "react-native";
import {StatusBarStyles as styles} from "./styles";
import {LoadingIndicator} from "../../../components/LoadingIndicator/LoadingIndicator";

type StatusBarProps = {
    dynamic: boolean;
    loading?: boolean;
    status: string;
};

type StatusBarState = {
    dots: string;
};

class StatusBar extends React.PureComponent<StatusBarProps, StatusBarState> {
    constructor(props: StatusBarProps) {
        super(props);
        this.state = {dots: props.dynamic ? "..." : "   "};
    }

    _intervalId: NodeJS.Timeout | null = null;

    componentDidMount() {
        const {dynamic} = this.props;
        if (dynamic) {
            this.setDynamicInterval();
        }
    }

    componentDidUpdate(prevProps: StatusBarProps) {
        const {dynamic} = this.props;
        const {dynamic: prevDynamic} = prevProps;
        const isDynamicOn = !prevDynamic && dynamic;
        const isDynamicOff = prevDynamic && !dynamic;

        if (isDynamicOn) {
            this.setDynamicInterval();
        } else if (isDynamicOff) {
            this.clearDynamicInterval();
        }
    }

    setDynamicInterval() {
        this._intervalId = setInterval(
            () =>
                this.setState((state) => {
                    switch (state.dots) {
                        case "...":
                            return {dots: "   "};
                        case ".. ":
                            return {dots: "..."};
                        case ".  ":
                            return {dots: ".. "};
                        case "   ":
                            return {dots: ".  "};
                        default:
                            return {dots: "   "};
                    }
                }),
            757
        );
    }

    clearDynamicInterval() {
        const {_intervalId} = this;
        if (_intervalId) {
            clearInterval(_intervalId);
        }
    }

    componentWillUnmount() {
        this.clearDynamicInterval();
    }

    render() {
        const {status, loading} = this.props;
        const {dots} = this.state;
        return (
            <View style={styles.container}>
                {loading && <LoadingIndicator />}
                <Text style={styles.statusText}>
                    {status}
                    {dots}
                </Text>
            </View>
        );
    }
}

export {StatusBar};
