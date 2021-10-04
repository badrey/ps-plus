import {Dimensions, InteractionManager, PixelRatio} from "react-native";

const {height} = Dimensions.get("window");
const {width} = Dimensions.get("window");
const ratio = PixelRatio.get();

export const normalizeSize = ({
    deviceHeight = height,
    deviceWidth = width,
    pixelRatio = ratio,
    size,
}: {
    deviceHeight?: number;
    deviceWidth?: number;
    pixelRatio?: number;
    size: number;
}) => {
    if (pixelRatio >= 2 && pixelRatio < 3) {
        // iPhone 5s and older Androids
        if (deviceWidth < 360) {
            return size * 0.95;
        }
        // iPhone 5
        if (deviceHeight < 667) {
            return size;
            // iPhone 6-6s
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.15;
        }
        if (deviceHeight > 735 && deviceHeight < 1024) {
            return size * 1.27;
        }
        // older phablets
        return size * 1.7;
    }
    if (pixelRatio >= 3 && pixelRatio < 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) {
            return size;
        }
        // Catch other weird android width sizings
        if (deviceHeight < 667) {
            return size * 1.15;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.2;
        }
        // catch larger devices
        // ie iPhone 6s plus / 7 plus / mi note 等等
        if (deviceHeight > 735 && deviceHeight < 1024) {
            return size * 1.27;
        }
        return size * 1.7;
    }
    if (pixelRatio >= 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) {
            return size;
            // Catch other smaller android height sizings
        }
        if (deviceHeight < 667) {
            return size * 1.2;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.25;
        }
        if (deviceHeight > 735 && deviceHeight < 1024) {
            return size * 1.27;
        }
        // catch larger phablet devices
        return size * 1.7;
    }
    return size;
};

export function isTablet() {
    return normalizeSize({size: 1}) >= 1.5;
}

export function runAfterInteractionsAsync<T>(
    f: (...args: any) => Promise<T>,
    ...args: any
): Promise<T> {
    return new Promise((resolve, reject) => {
        InteractionManager.runAfterInteractions(() => {
            f(...args)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
}

export function replaceAll(
    str: string,
    searchValue: string | RegExp,
    replaceValue: string
) {
    let prevResult = str;
    let result = str;
    do {
        prevResult = result;
        result = result.replace(searchValue, replaceValue);
    } while (prevResult !== result);

    return result;
}
