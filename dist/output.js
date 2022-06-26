"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const julian_utils_1 = require("julian-utils");
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
}
exports.Output = Output;
