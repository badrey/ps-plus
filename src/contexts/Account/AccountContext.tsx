import * as React from "react";
import {auth, signInAnonymously} from "../../services/auth-service";
import {logError} from "../../common/utils";
import type {AccountContext} from "./types";
import firebase from "firebase";
import type {Context} from "react";
import {useNotificationsEnabled} from "./useNotificationsEnabled";

const defaultAccountState: AccountContext = {
    user: null,
    isAnonymous: false,
    storeLocale: "en-US",
};

export const AccountInfoContext: Context<AccountContext> = React.createContext(
    defaultAccountState
);

type Props = {
    children: any;
};

export const AccountInfoContextProviderBase = ({children}: Props) => {
    const [storeLocale, setStoreLocale] = React.useState("en-US");
    const [user, setUser] = React.useState<firebase.User | null>(null);
    const [isAnonymous, setIsAnonymous] = React.useState(false);
    React.useEffect(
        () =>
            auth.onIdTokenChanged(async (authUser: firebase.User | null) => {
                if (authUser) {
                    setUser(authUser);
                    setIsAnonymous(authUser?.isAnonymous);
                } else {
                    setIsAnonymous(true);
                    signInAnonymously({
                        onError: (e: firebase.auth.Error) => {
                            logError(`Error in signInAnonymously: ${e.toString()}`);
                        },
                    });
                }
            }),
        [user]
    );
    useNotificationsEnabled(user?.uid);

    const state = {
        user,
        isAnonymous,
        storeLocale,
    };

    return (
        <AccountInfoContext.Provider value={state}>
            {children}
        </AccountInfoContext.Provider>
    );
};

export const AccountInfoContextProvider = React.memo<Props>(({children}: Props) => {
    return <AccountInfoContextProviderBase children={children} />;
});
