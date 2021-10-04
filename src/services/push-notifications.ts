import * as Notifications from "expo-notifications";
import {logError} from "../common/utils";

type TokenData = {data: string; type: string};

const IosAuthorizationStatus = {
    NOT_DETERMINED: 0,
    DENIED: 1,
    AUTHORIZED: 2,
    PROVISIONAL: 3,
};

function doExtractExpoPushToken({data: token}: TokenData) {
    if (!token) {
        return null;
    }

    // Token format supposed to be "ExponentPushToken[JKj1W5PqrArJGAr1dX9-TC]".
    // So, extracting a part from square brackets.
    return token.slice(18, -1);
}

export async function extractExpoPushTokenAsync() {
    // Get the token that uniquely identifies this device
    try {
        const tokenData = await Notifications.getExpoPushTokenAsync();
        return doExtractExpoPushToken(tokenData);
    } catch (e) {
        logError(e);
    }
    return null;
}

export async function getPermissionsAsync() {
    try {
        const settings = await Notifications.getPermissionsAsync();
        const granted =
            settings.granted ||
            settings.ios?.status === IosAuthorizationStatus.PROVISIONAL ||
            settings.ios?.status === IosAuthorizationStatus.AUTHORIZED;
        return {
            granted,
            canAskAgain: settings.canAskAgain,
        };
    } catch (e) {
        logError(`Error during getPermissionsAsync: ${e.toString()}`);
        return {
            granted: false,
            canAskAgain: true,
        };
    }
}

export async function requestPermissionsAsync() {
    try {
        const settings = await Notifications.requestPermissionsAsync();
        return (
            settings.ios?.status === 1 ||
            settings.ios?.status === IosAuthorizationStatus.PROVISIONAL ||
            settings.ios?.status === IosAuthorizationStatus.AUTHORIZED
        );
    } catch (e) {
        logError(`Error during requestPermissionsAsync: ${e.toString()}`);
        return false;
    }
}
