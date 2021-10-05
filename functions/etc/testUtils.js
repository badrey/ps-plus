"use strict";
function hasValue(obj) {
    return obj !== undefined && obj !== null;
}
exports.hasValue = hasValue;

function hasNoValue(obj) {
    return obj === undefined || obj === null;
}
exports.hasNoValue = hasNoValue;

function isUndefined(obj) {
    return obj === undefined;
}
exports.isUndefined = isUndefined;

function hasZeroSize(obj) {
    return hasValue(obj) && obj.size === 0;
}
exports.hasZeroSize = hasZeroSize;

function hasNonZeroSize(obj) {
    return hasValue(obj) && obj.size > 0;
}
exports.hasNonZeroSize = hasNonZeroSize;

function isEmptyArray(obj) {
    return hasValue(obj) && obj.length === 0;
}
exports.isEmptyArray = isEmptyArray;

function isNonEmptyArray(obj) {
    return hasValue(obj) && obj.length > 0;
}
exports.isNonEmptyArray = isNonEmptyArray;

function isNonEmptyString(obj) {
    return hasValue(obj) && obj.length > 0;
}
exports.isNonEmptyString = isNonEmptyString;

function isEmptyString(obj) {
    return hasValue(obj) && obj.trim().length === 0;
}
exports.isEmptyString = isEmptyString;

function isTrue(obj) {
    return obj === true;
}
exports.isTrue = isTrue;

function isNotTrue(obj) {
    return obj !== true;
}
exports.isNotTrue = isNotTrue;

function isFalse(obj) {
    return obj === false;
}
exports.isFalse = isFalse;

function isEqual(obj1, obj2) {
    return hasValue(obj1) && hasValue(obj2) && obj1 === obj2;
}
exports.isEqual = isEqual;

function isNotEqual(obj1, obj2) {
    return hasValue(obj1) && hasValue(obj2) && obj1 !== obj2;
}
exports.isNotEqual = isNotEqual;
