"use strict";

exports.onError = function onError(error) {
    if (error instanceof Error) {
        console.error(error);
    } else {
        console.error(new Error(error));
    }
};
