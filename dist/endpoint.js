"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
const collection_1 = require("../../Julian/dist/collection");
class Endpoint {
    path;
    method;
    handler;
    constructor(path, options) {
        this.path = path;
        this.method = options.method;
        this.handler = options.handler;
    }
    match(pathname) {
        const output = new collection_1.Collection();
        const source = this.path.split("/");
        const target = pathname.split("/");
        if (source.length !== target.length) {
            return new collection_1.Collection();
        }
        for (let i = 0; i < source.length; i++) {
            if (/\{.*\}/g.test(source[i]) || source[i] === "*") {
                output.set(source[i], target[i]);
            }
        }
        return output;
    }
    static parse(path) {
        const [method, pathname] = path.split(" ");
        return { method, pathname };
    }
}
exports.Endpoint = Endpoint;
