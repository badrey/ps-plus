"use strict";
const {getSectionGeneralMessage} = require("../../etc/updatesApi");

function getGetMessages() {
    return function getMessages() {
        const messages = [];
        messages.push(getSectionGeneralMessage());
        return messages;
    };
}

module.exports = {
    getGetMessages,
};
