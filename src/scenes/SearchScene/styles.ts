import {StyleSheet} from "react-native";
import {colorsService} from "../../services/colors_service";

export const searchScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorsService.backgroundColor,
        overflow: "hidden",
    },
});
