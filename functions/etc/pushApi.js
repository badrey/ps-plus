"use strict";
const {onError} = require("./errorHandling");
const {Expo} = require("expo-server-sdk");
const expo = new Expo();

const ANDROID_CHANNEL = "updates";

function toPushMessage(message, token) {
    console.log("token", token, message);
    const {title, body} = message;
    return message
        ? {
              title: title.value,
              body: body.value,
              to: `ExponentPushToken[${token}]`,
              data: {timestamp: Date.now()},
              sound: "default",
              badge: 1,
              channelId: ANDROID_CHANNEL,
          }
        : null;
}

async function sendPushes(messages) {
    // message format: {token, uid, message}
    const chunks = expo.chunkPushNotifications(messages.map((m) => m.message));
    const tickets = [];
    for (const chunk of chunks) {
        /* eslint-disable no-await-in-loop */
        const ticketsChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketsChunk);
    }
    return tickets;
}

/*
 *  returns Map<ticketId, {token, uid}>
 */
async function mapPushTicketIdToDeviceData(tickets, messages) {
    // message format: {token, uid, message}
    const mapping = new Map();
    tickets.forEach((ticket, index) => {
        const {token, uid} = messages[index];
        const {id, details} = ticket;
        const receiptData = {token, uid};
        if (id) {
            mapping.set(id, receiptData);
        } else if (details && details.error) {
            console.error("Error in ticket", details);
        }
    });

    return mapping;
}

async function pollPushReceipts(ticketIdToDeviceDataMap) {
    try {
        const chunks = expo.chunkPushNotificationReceiptIds([
            ...ticketIdToDeviceDataMap.keys(),
        ]);
        for (const chunk of chunks) {
            /* eslint-disable no-await-in-loop */
            const receiptsObject = await expo.getPushNotificationReceiptsAsync(chunk);
            console.log("receiptsObject", receiptsObject);
            // keys iteration
            for (const receiptId in receiptsObject) {
                const receipt = receiptsObject[receiptId];
                const {status, details} = receipt;
                if (status === "error" && details && details.error) {
                    console.error("Error in receipt", details);
                }
            }
        }
    } catch (e) {
        onError(e);
    }
    return Promise.resolve();
}

module.exports = {
    toPushMessage,
    sendPushes,
    mapPushTicketIdToDeviceData,
    pollPushReceipts,
};
