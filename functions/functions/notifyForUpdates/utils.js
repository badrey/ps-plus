"use strict";
const {
    mapPushTicketIdToDeviceData,
    pollPushReceipts,
    sendPushes,
    toPushMessage,
} = require("../../etc/pushApi");
const {flattenArray} = require("../../etc/shared");
const {MAX_USERS} = require("../constants");
const {listUsers} = require("../utils");
const {onError} = require("../../etc/errorHandling");
const admin = require("firebase-admin");

const database = admin.database();

exports.notifyForUpdates = async (snapshot, context, updateType, getMessages) => {
    if (!snapshot.after.exists()) {
        return null;
    }
    const {countryCode} = context.params;
    const updatePath = `updates/new/${countryCode}/${updateType}`;
    const updates = {};

    // {startAt: ?string, failed: ?boolean, timestamp: boolean}
    const updateData = snapshot.after.val();
    const {startAt, failed} = updateData;
    if (failed) {
        return "waiting for retry";
    }

    let newStartAt = startAt;
    let newStartUpdated = false;
    let totalMessages = 0;
    let totalUsers = 0;
    try {
        do {
            /* eslint-disable no-await-in-loop */
            const usersData = await listUsers(countryCode, MAX_USERS, newStartAt);
            const users = usersData.users;
            // message format: {token, uid, message}
            const messages = await usersToPushMessages(users, getMessages);
            totalUsers += users.length;
            newStartAt = usersData.newStartAt;
            newStartUpdated = true;
            console.log("messages.length", messages.length);
            if (messages.length) {
                totalMessages += messages.length;
                /* eslint-disable no-await-in-loop */
                const tickets = await sendPushes(messages);
                console.log("tickets", tickets);
                // If we fail during receipts polling we just log the error and proceed.
                /* eslint-disable no-await-in-loop */
                await pollPushReceipts(
                    await mapPushTicketIdToDeviceData(tickets, messages)
                );
            }
        } while (newStartAt);
        updates[updatePath] = null;
    } catch (error) {
        onError(error);
        if (!newStartUpdated) {
            updates[`${updatePath}/failed`] = true;
        } else {
            if (newStartAt) {
                updates[`${updatePath}/startAt`] = newStartAt || null;
            } else {
                updates[updatePath] = null;
            }
        }
    }
    console.log("messages length:", totalMessages, countryCode, updateType, totalUsers);

    return database.ref().update(updates).catch(onError);
};

async function usersToPushMessages(users, getMessages) {
    return Promise.all(
        users.map((userData) => userToPushMessages(userData, getMessages))
    ).then(flattenArray);
}

async function userToPushMessages(userData, getMessages) {
    const [uid, {push}] = userData;
    const {tokens: deviceTokens = {}} = push || {};
    // If no devices logged into this account
    if (Object.keys(deviceTokens).length === 0) {
        return [];
    }

    const messages = getMessages().filter((msg) => !!msg);
    if (messages.length === 0) {
        return [];
    }

    return flattenArray(
        Object.keys(deviceTokens).map((token) => {
            return messages.map((msg) => ({
                token,
                uid,
                message: toPushMessage(msg, token),
            }));
        })
    );
}
