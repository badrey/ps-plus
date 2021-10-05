import * as React from "react";
import {AppState, Platform} from "react-native";
import * as Notifications from "expo-notifications";
import {
    extractExpoPushTokenAsync,
    getPermissionsAsync,
    requestPermissionsAsync,
} from "../../services/push-notifications";
import * as AccountService from "./firebaseAccountService";
import {isAndroid} from "../../settings";
import {AndroidImportance, AndroidNotificationVisibility} from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export const ANDROID_CHANNEL = "updates";

if (isAndroid) {
    Notifications.setNotificationChannelAsync(ANDROID_CHANNEL, {
        name: "Updates in sections",
        enableVibrate: true,
        importance: AndroidImportance.MAX,
        lockscreenVisibility: AndroidNotificationVisibility.PUBLIC,
        showBadge: true,
        vibrationPattern: [0, 250, 250, 250],
    });
}

export function useNotificationsEnabled(userId?: string) {
    const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false);
    const [canAskPermissionAgain, setCanAskPermissionAgain] = React.useState(true);
    const [expoToken, setExpoToken] = React.useState<string | null>(null);
    React.useEffect(() => {
        extractExpoPushTokenAsync().then(setExpoToken);
    }, []);
    React.useEffect(() => {
        getPermissionsAsync().then(({granted, canAskAgain}) => {
            setIsNotificationsEnabled(granted);
            setCanAskPermissionAgain(canAskAgain);
        });
    }, []);

    const requestPermission = React.useCallback(() => {
        if (Platform.OS === "ios" && canAskPermissionAgain) {
            requestPermissionsAsync().then((enabled: boolean) => {
                setIsNotificationsEnabled(enabled);
            });
            setCanAskPermissionAgain(false);
            return true;
        }
        return false;
    }, [canAskPermissionAgain]);

    const appStateRef = React.useRef("active");
    React.useEffect(() => {
        const handleAppStateChange = async (nextAppState: string) => {
            if (nextAppState === "active" && appStateRef.current === "background") {
                if (!expoToken) {
                    extractExpoPushTokenAsync().then(setExpoToken); // retrying in case of failing to get it initially
                }
                getPermissionsAsync().then(({granted}) =>
                    setIsNotificationsEnabled(granted)
                );
            }
            appStateRef.current = nextAppState;
        };
        AppState.addEventListener("change", handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", handleAppStateChange);
        };
    }, [expoToken, appStateRef]);

    const unsubscribeFromNotificationsAsync = React.useCallback(() => {
        return AccountService.asyncRemovePushToken({
            userId,
            token: expoToken,
        });
    }, [userId, expoToken]);

    React.useEffect(() => {
        const subscribeToNotificationsAsync = () => {
            AccountService.asyncAddPushToken({
                userId,
                token: expoToken,
            });
        };
        if (isNotificationsEnabled) {
            subscribeToNotificationsAsync();
        } else {
            unsubscribeFromNotificationsAsync();
        }
    }, [isNotificationsEnabled, userId, expoToken, unsubscribeFromNotificationsAsync]);

    return {
        isNotificationsEnabled,
        unsubscribeFromNotificationsAsync,
        requestPermission,
    };
}
