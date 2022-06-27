"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const julian_utils_1 = require("julian-utils");
const constants_1 = require("./constants");
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
    i = 0;
    send(data) {
        if (!this.headers.get("content-type")) {
            this.setHeader("content-type", this.static.identify(data));
        }
        console.log("writing", ++this.i);
        return this.data.end(this.static.parse(data));
    }
    get headers() {
        return new julian_utils_1.BaseCollection(Object.entries(this.data.getHeaders()));
    }
    setHeader(key, value) {
        this.data.setHeader(key, value);
        return this;
    }
    static parse(data) {
        if (data) {
            switch (data.constructor) {
                case String:
                case Buffer:
                case Uint8Array:
                    return data;
                case Date:
                    return data.toString();
                default:
                    return JSON.stringify(data);
            }
        }
        return "";
    }
    static identify(data) {
        switch (data.constructor) {
            case String:
                return constants_1.ContentTypes.TEXT_PLAIN;
            case Buffer:
            case Uint8Array:
                return constants_1.ContentTypes.APPLICATION_OCTET_STREAM;
            case Date:
                return constants_1.ContentTypes.TEXT_PLAIN;
            default:
                return constants_1.ContentTypes.APPLICATION_JSON;
        }
    }
}
exports.Output = Output;
