/* @flow */
import * as React from "react";
import {Animated} from "react-native";
import {loadingIndicatorStyles as styles} from "./styles";
import {isTablet} from "../../common/utils";
import {colorsService} from "../../services/colors_service";
import {IconSize} from "../../settings";
import {SvgIcons} from "../icons/SvgIcon";
import {useIsMounted} from "../../common/hooks/useIsMounted";

const LoadingIndicatorIcon = SvgIcons.loader;
export const LoadingIndicator = React.memo<{}>(() => {
    const [animatedValue, setAnimatedValue] = React.useState(new Animated.Value(1));
    const [animatedStyle, setAnimatedStyle] = React.useState();
    const {isMountedRef} = useIsMounted();
    React.useEffect(() => {
        setAnimatedStyle({
            transform: [
                {
                    rotate: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["360deg", "0deg"],
                    }),
                },
            ],
        });
        Animated.sequence([
            // Animated.delay(307),
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 757,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (isMountedRef.current) {
                setAnimatedValue(new Animated.Value(1));
            }
        });
    }, [animatedValue, isMountedRef]);
    return (
        <Animated.View style={[styles.spinner, animatedStyle]}>
            <LoadingIndicatorIcon
                color={colorsService.primaryColor}
                size={isTablet() ? IconSize : IconSize * (2 / 3)}
            />
        </Animated.View>
    );
});
