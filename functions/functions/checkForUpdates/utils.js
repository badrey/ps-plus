"use strict";
const {onError} = require("../../etc/errorHandling");
const admin = require("firebase-admin");

const database = admin.database();

exports.checkForUpdates = async (snapshot, context, checkType, doCheckForUpdates) => {
    const {code: countryCode} = context.params;
    try {
        const updates = await doCheckForUpdates(
            checkType,
            countryCode,
            snapshot.after.val() || Date.now()
        );

        console.log(`${checkType} updates`, countryCode, updates);
        return database.ref().update(updates);
    } catch (e) {
        onError(e);
    }
    return "no updates";
};
