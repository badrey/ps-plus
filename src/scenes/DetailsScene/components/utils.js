/* @flow */
import * as React from "react";

export function arrayToDisplayString(arr: $ReadOnlyArray<string>): string {
    return arr.filter((a) => !!a).join(", ");
}
