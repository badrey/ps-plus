import firebase from "firebase";
import {logError} from "../../common/utils";

const database = firebase.database();

function onError(error: any) {
    if (error) {
        logError(`Error during firebase operation: ${error.toString()}`);
    }
}

export async function asyncAddPushToken({
    userId,
    token,
}: {
    token: string | null;
    userId?: string;
}) {
    if (!userId || !token) {
        return Promise.resolve();
    }
    const updates = {
        [`users/${userId}/push/tokens/${token}`]: "en",
    };
    return database.ref().update(updates, onError);
}

export async function asyncRemovePushToken({
    userId,
    token,
}: {
    token: string | null;
    userId?: string;
}) {
    if (!userId || !token) {
        return Promise.resolve();
    }
    const updates = {
        [`users/${userId}/push/tokens/${token}`]: null,
    };
    return database.ref().update(updates, onError);
}
