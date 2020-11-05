import {StyleSheet} from "react-native";
import {IconButtonPadding} from "../../settings";
import {normalizeSize} from "../../common/utils";
import {colorsService} from "../../services/colors_service";

export const iconButtonStyles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        padding: IconButtonPadding,
        flexDirection: "row",
    },
    text: {
        color: colorsService.primaryColor,
        fontSize: normalizeSize({size: 13}),
        fontWeight: "700",
    },
});
