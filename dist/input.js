"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const http_1 = require("http");
const collection_1 = require("../../Julian/dist/collection");
class Input {
    data;
    constructor(data) {
        this.data = data || new http_1.IncomingMessage(null);
    }
    get headers() {
        return new collection_1.Collection(Object.entries(this.data.headers));
    }
    get url() {
        return new URL(this.data.url || "/", `http://${this.headers.get("host")}`);
    }
}
exports.Input = Input;
