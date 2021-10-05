"use strict";
const admin = require("firebase-admin");
const checkForUpdatesJobs = require("./functions/checkForUpdates");
const notifyForUpdatesJobs = require("./functions/notifyForUpdates");
admin.initializeApp();

module.exports = Object.assign(checkForUpdatesJobs, notifyForUpdatesJobs);
