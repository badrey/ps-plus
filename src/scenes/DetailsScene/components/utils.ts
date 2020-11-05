export function arrayToDisplayString(arr: ReadonlyArray<string>): string {
    return arr.filter((a) => !!a).join(", ");
}
