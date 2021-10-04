import firebase from "firebase";

export const auth = firebase.auth();
auth.useDeviceLanguage();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export async function signInAnonymously({
    onError,
    retryNumber = 0,
}: {
    onError?: (error: firebase.auth.Error) => void;
    retryNumber?: number;
}) {
    try {
        await auth.signInAnonymously();
    } catch (e) {
        if (retryNumber < 3) {
            await signInAnonymously({onError, retryNumber: retryNumber + 1});
        }
        if (onError) {
            onError(e.message);
        }
    }
}
