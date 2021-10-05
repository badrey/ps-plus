"use strict";
const {getGetMessages} = require("./notifyForTitlesUpdates");
const {notifyForUpdates} = require("./utils");

const updateType = "psplus";

exports.notifyForPSPlusUpdates = (snapshot, context) => {
    return notifyForUpdates(snapshot, context, updateType, getGetMessages(updateType));
};
