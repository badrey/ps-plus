/* @flow */
import moment from "moment";

export function lDateTime(date: string) {
    return moment(date).format("LLL");
}

export function lDate(date: string | number) {
    return moment(date).format("LL");
}
