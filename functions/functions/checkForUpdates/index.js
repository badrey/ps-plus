"use strict";
const functions = require("firebase-functions");

/*
 *  checkForPsPlusUpdates
 *  checkForPsPlusUpdates({after: 1598374735050}, {params: {code: 'en-US'}})
 */
let doCheckForPsPlusUpdates;
exports.checkForPsPlusUpdates = functions
    .runWith({
        timeoutSeconds: 60,
        memory: "128MB",
    })
    .database.ref("triggers/updates/psplus/{code}") // context.params.code
    .onUpdate((snapshot, context) => {
        if (!doCheckForPsPlusUpdates) {
            const {checkForPsPlusUpdates} = require("./checkForPsPlusUpdates");
            doCheckForPsPlusUpdates = checkForPsPlusUpdates;
        }
        return doCheckForPsPlusUpdates(snapshot, context);
    });
