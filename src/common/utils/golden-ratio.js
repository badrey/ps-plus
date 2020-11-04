/* @flow */
import {Dimensions} from "react-native";

const {height, width} = Dimensions.get("window");
export const windowHeight = Math.max(height, width);
export const windowWidth = Math.min(height, width);
