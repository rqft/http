"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const collection_1 = require("../../Julian/dist/collection");
class Output {
    static = Output;
    data;
    constructor(data) {
        this.data = data;
    }
    setStatus(code) {
        this.data.statusCode = code;
        return this;
    }
    write(data) {
        this.data.write(this.static.parse(data));
        return this;
    }
    send(data) {
        return this.data.end(this.static.parse(data));
    }
    get headers() {
        return new collection_1.Collection(Object.entries(this.data.getHeaders()));
    }
    setHeader(key, value) {
        this.data.setHeader(key, value);
        return this;
    }
    static parse(data) {
        switch (data.constructor) {
            case Buffer:
            case String:
            case Uint8Array:
                return data;
            case Date:
                return data.toString();
            default:
                return JSON.stringify(data);
        }
    }
}
exports.Output = Output;
