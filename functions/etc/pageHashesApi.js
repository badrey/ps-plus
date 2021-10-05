"use strict";
const {getAllPsPlusTitles} = require("./ps5/storeApi");

exports.getNewPsPlus = async function getNewPsPlus(countryCode) {
    return getAllPsPlusTitles(countryCode);
};
