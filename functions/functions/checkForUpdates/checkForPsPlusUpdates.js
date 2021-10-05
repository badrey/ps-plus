"use strict";
const {checkForTitlesUpdates} = require("./checkForTitlesUpdates");
const {checkForUpdates} = require("./utils");

const checkType = "psplus";

exports.checkForPsPlusUpdates = async (snapshot, context) => {
    return checkForUpdates(snapshot, context, checkType, checkForTitlesUpdates);
};
