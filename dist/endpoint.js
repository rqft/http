"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
const julian_utils_1 = require("julian-utils");
class Endpoint {
    path;
    method;
    handler;
    constructor(path, options) {
        this.path = path;
        this.method = options.method;
        this.handler = options.handler;
    }
    params(pathname) {
        const output = new julian_utils_1.BaseCollection();
        const source = this.path.split("/");
        const target = pathname.split("/");
        for (let i = 0; i < source.length; i++) {
            const named = source[i].match(/^{(\w+)}$/);
            if (named) {
                output.set(named[1], target[i] || "");
            }
            const existingGlobals = output.filter((_, key) => key.startsWith("*"));
            if (source[i] === "*") {
                output.set("*".repeat(existingGlobals.size), target[i] || "");
            }
        }
        return output;
    }
    match(pathname) {
        const output = this.params(pathname).clone();
        return output.size > 0 || this.path === pathname;
    }
    static parse(path) {
        let [method, pathname] = path.split(" ");
        if (!pathname || !pathname.startsWith("/")) {
            pathname = "/" + (pathname || "");
        }
        return { method, pathname };
    }
}
exports.Endpoint = Endpoint;
