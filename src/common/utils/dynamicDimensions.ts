import {Dimensions} from "react-native";

export function getWindowWidth() {
    const {height, width} = Dimensions.get("window");
    return Math.floor(Math.min(height, width));
}

export function getWindowHeight() {
    const {height, width} = Dimensions.get("window");
    return Math.floor(Math.max(height, width));
}

export function get16To9Dimensions() {
    const width = getWindowWidth();
    const height = getWindowHeight();
    const ratio = width / height;
    if (ratio < 9 / 16) {
        return {width, height: Math.floor((width * 16) / 9)};
    }
    if (ratio > 9 / 16) {
        return {height, width: Math.floor((height / 16) * 9)};
    }
    return {width, height};
}

export function getReverse16To9Dimensions() {
    const data = get16To9Dimensions();
    return {
        width: data.height,
        height: data.width,
    };
}
