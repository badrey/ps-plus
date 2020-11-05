import {StyleSheet} from "react-native";
import {normalizeSize} from "../../common/utils";

export const loadingIndicatorStyles = StyleSheet.create({
    spinner: {
        padding: normalizeSize({size: 7}),
    },
});
