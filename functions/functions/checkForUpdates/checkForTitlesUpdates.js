"use strict";
const {getNewPsPlus} = require("../../etc/pageHashesApi");
const admin = require("firebase-admin");

const database = admin.database();

const checkTypeToGetNewTitlesMethod = {
    psplus: getNewPsPlus,
};

async function checkForTitlesUpdates(checkType, countryCode) {
    /*
        newTitles: {+[id]: name}
     */
    const [newTitleIds, lastTitleIdsSnap] = await Promise.all([
        checkTypeToGetNewTitlesMethod[checkType](countryCode),
        database.ref(`updates/last/${countryCode}/${checkType}`).once("value"),
    ]);
    const lastTitleIds = lastTitleIdsSnap.val() || []; // should be an array
    const lastTitleIdsSet = new Set(lastTitleIds);

    // store only title ids here
    const updates = {[`updates/last/${countryCode}/${checkType}`]: newTitleIds};
    const addedTitleIds = newTitleIds.filter(
        (newTitleId) => !lastTitleIdsSet.has(newTitleId)
    );

    if (addedTitleIds.length) {
        updates[`updates/new/${countryCode}/${checkType}`] = {
            timestamp: Date.now(),
        };
    }

    return updates;
}

exports.checkForTitlesUpdates = checkForTitlesUpdates;
