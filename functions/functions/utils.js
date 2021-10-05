"use strict";
const {onError} = require("../etc/errorHandling");
const admin = require("firebase-admin");
const database = admin.database();

exports.getUserTokens = async function (uid) {
    try {
        const snapshot = await database.ref(`users/${uid}/push/tokens`).once("value");
        return snapshot.val() || {};
    } catch (e) {
        onError(e);
    }
    return {};
};

exports.listUsers = async function (countryCode, limit, startAt) {
    const users = [];
    let newStartAt = null;
    try {
        const usersRef = database.ref("users");

        const snapshot = await usersRef
            .orderByKey()
            .startAt(startAt || " ")
            .limitToFirst(limit)
            .once("value");

        const numChildren = snapshot.numChildren();
        if (numChildren !== 0) {
            let counter = 0;
            snapshot.forEach((child) => {
                const uid = child.key;
                const user = child.val();
                if (counter++ < limit) {
                    users.push([uid, user]);
                }
            });
        }
    } catch (e) {
        onError(e);
    }
    if (users.length === limit) {
        newStartAt = users[users.length - 1][0] + " ";
    }
    return {users, newStartAt};
};
