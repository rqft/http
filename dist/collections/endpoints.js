"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = exports.EndpointCollection = void 0;
const utils_1 = require("@rqft/utils");
const constants_1 = require("../constants");
class EndpointCollection extends utils_1.BaseCollection {
}
exports.EndpointCollection = EndpointCollection;
class Endpoints {
    [constants_1.HTTPVerbs.GET] = new EndpointCollection();
    [constants_1.HTTPVerbs.POST] = new EndpointCollection();
    [constants_1.HTTPVerbs.PUT] = new EndpointCollection();
    [constants_1.HTTPVerbs.DELETE] = new EndpointCollection();
    [constants_1.HTTPVerbs.PATCH] = new EndpointCollection();
    [constants_1.HTTPVerbs.HEAD] = new EndpointCollection();
    [constants_1.HTTPVerbs.OPTIONS] = new EndpointCollection();
    [constants_1.HTTPVerbs.CONNECT] = new EndpointCollection();
    [constants_1.HTTPVerbs.TRACE] = new EndpointCollection();
    [constants_1.HTTPVerbs.ALL] = new EndpointCollection();
    [constants_1.HTTPVerbs.COPY] = new EndpointCollection();
    [constants_1.HTTPVerbs.LINK] = new EndpointCollection();
    [constants_1.HTTPVerbs.UNLINK] = new EndpointCollection();
    [constants_1.HTTPVerbs.PURGE] = new EndpointCollection();
    [constants_1.HTTPVerbs.LOCK] = new EndpointCollection();
    [constants_1.HTTPVerbs.UNLOCK] = new EndpointCollection();
    [constants_1.HTTPVerbs.PROPFIND] = new EndpointCollection();
    [constants_1.HTTPVerbs.VIEW] = new EndpointCollection();
    get any() {
        const total = new EndpointCollection();
        for (const verb in this) {
            if (this.hasOwnProperty(verb) &&
                Object.values(constants_1.HTTPVerbs).includes(verb)) {
                const verbCollection = this[verb];
                for (const [key, value] of verbCollection) {
                    total.set(key, value);
                }
            }
        }
        return total;
    }
}
exports.Endpoints = Endpoints;
