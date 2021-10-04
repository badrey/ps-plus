import firebase from "firebase";

export type AccountContext = {
    isAnonymous: boolean;
    storeLocale: string;
    user: firebase.User | null;
};
