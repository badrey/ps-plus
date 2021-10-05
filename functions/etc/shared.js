"use strict";
function flattenArray(array) {
    return array.reduce((acc, value) => {
        acc.push(...value);
        return acc;
    }, []);
}

function chainPromises(promisesArray, promise) {
    return promisesArray.reduce(
        (acc, cur) => acc.then(() => cur),
        promise || Promise.resolve()
    );
}

module.exports = {
    chainPromises,
    flattenArray,
};
