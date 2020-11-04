/* @flow */
export function hasValue(obj: mixed): %checks {
    return obj !== undefined && obj !== null;
}

export function hasNoValue(obj: mixed): %checks {
    return obj === undefined || obj === null;
}

export function isUndefined(obj: mixed): %checks {
    return obj === undefined;
}

export function hasZeroSize(obj: ?{size: number, ...}): boolean {
    return hasValue(obj) && obj.size === 0;
}

export function isEmptyArray<T>(obj: Array<T>): boolean {
    return hasValue(obj) && obj.length === 0;
}

export function isNonEmptyArray<T>(obj: Array<T>): boolean {
    return hasValue(obj) && obj.length > 0;
}

export function isNonEmptyString<T>(obj: ?string): boolean {
    return hasValue(obj) && obj.length > 0;
}

export function isTrue(obj: ?boolean): %checks {
    return obj === true;
}

export function isNotTrue(obj: ?boolean): %checks {
    return obj !== true;
}

export function isFalse(obj: ?boolean): %checks {
    return obj === false;
}

export function isEqual<T>(obj1: ?T, obj2: ?T): %checks {
    return hasValue(obj1) && hasValue(obj2) && obj1 === obj2;
}
