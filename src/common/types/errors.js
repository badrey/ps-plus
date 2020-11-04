/* @flow */
export class NotFoundError extends Error {
    static Name = "NotFoundError";

    constructor(id: string) {
        super(`Title not found: ${id}`);
        this._id = id;
        this.name = NotFoundError.Name;
    }

    _id: string;
}

export class NoPriceError extends Error {
    static Name = "NoPriceError";

    constructor(id: string) {
        super(`No Price for title: ${id}`);
        this._id = id;
        this.name = NoPriceError.Name;
    }

    _id: string;
}
