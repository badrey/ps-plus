"use strict";
const functions = require("firebase-functions");

/*
 *  notifyForPSPlusUpdates
 *  notifyForPSPlusUpdates({after: {timestamp: 1}}, {params: {countryCode: 'en-US'}})
 */
let doNotifyForPSPlusUpdates;
exports.notifyForPSPlusUpdates = functions
    .runWith({
        timeoutSeconds: 540,
        memory: "256MB",
    })
    .database.ref("updates/new/{countryCode}/psplus") // context.params.countryCode
    .onWrite((snapshot, context) => {
        if (!doNotifyForPSPlusUpdates) {
            doNotifyForPSPlusUpdates = require("./notifyForPSPlusUpdates")
                .notifyForPSPlusUpdates;
        }
        return doNotifyForPSPlusUpdates(snapshot, context);
    });
