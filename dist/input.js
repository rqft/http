"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const julian_utils_1 = require("julian-utils");
class Input {
    data;
    client;
    endpoint;
    bodyParts = [];
    constructor(data) {
        this.data = data.data;
        this.client = data.client;
        this.endpoint = data.endpoint;
        if (data.body) {
            this.bodyParts = data.body;
        }
    }
    get body() {
        return this.bodyParts.join("");
    }
    get headers() {
        return new julian_utils_1.BaseCollection(Object.entries(this.data.headers));
    }
    get url() {
        return new URL(this.data.url || "/", `http://${this.headers.get("host")}`);
    }
    get method() {
        return this.data.method;
    }
    setEndpoint(endpoint) {
        this.endpoint = endpoint;
        return this;
    }
    get params() {
        return this.endpoint?.params(this.url.pathname) || new julian_utils_1.BaseCollection();
    }
    get query() {
        return new julian_utils_1.BaseCollection(this.url.searchParams);
    }
}
exports.Input = Input;
