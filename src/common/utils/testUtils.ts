export function hasValue(obj: unknown) {
    return obj !== undefined && obj !== null;
}

export function hasNoValue(obj: unknown) {
    return obj === undefined || obj === null;
}

export function isUndefined(obj: unknown) {
    return obj === undefined;
}

export function hasZeroSize(obj: {size: number} | null | undefined): boolean {
    return obj?.size === 0;
}

export function isEmptyArray<T>(obj: Array<T>): boolean {
    return hasValue(obj) && obj.length === 0;
}

export function isNonEmptyArray<T>(obj: Array<T>): boolean {
    return hasValue(obj) && obj.length > 0;
}

export function isNonEmptyString<T>(obj: string | null | undefined): boolean {
    return !!obj && obj.length > 0;
}

export function isTrue(obj: boolean | null | undefined) {
    return obj === true;
}

export function isNotTrue(obj: boolean | null | undefined) {
    return obj !== true;
}

export function isFalse(obj: boolean | null | undefined) {
    return obj === false;
}

export function isEqual<T>(obj1: T | null | undefined, obj2: T | null | undefined) {
    return hasValue(obj1) && hasValue(obj2) && obj1 === obj2;
}
