"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
const utils_1 = require("@rqft/utils");
const tools_1 = require("./tools");
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
        const output = new utils_1.BaseCollection();
        const source = (0, tools_1.clear)(this.path.split("/"), "");
        const target = (0, tools_1.clear)(pathname.split("/"), "");
        if (source.length < target.length) {
            return output;
        }
        for (let i = 0; i < source.length; i++) {
            const named = source[i].match(/^{(\w+)}$/);
            if (source[i]?.toLowerCase() === target[i]?.toLowerCase()) {
                continue;
            }
            if (named) {
                output.set(named[1], target[i] || "");
                continue;
            }
            let times = 0;
            if (source[i] === "*") {
                times++;
                output.set(times + "*", target[i] || "");
                continue;
            }
            break;
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
