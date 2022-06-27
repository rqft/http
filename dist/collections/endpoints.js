"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = void 0;
const julian_utils_1 = require("julian-utils");
const constants_1 = require("../constants");
class Endpoints {
    [constants_1.HTTPVerbs.GET] = new julian_utils_1.BaseCollection();
    [constants_1.HTTPVerbs.POST] = new julian_utils_1.BaseCollection();
    [constants_1.HTTPVerbs.PUT] = new julian_utils_1.BaseCollection();
    [constants_1.HTTPVerbs.DELETE] = new julian_utils_1.BaseCollection();
    [constants_1.HTTPVerbs.PATCH] = new julian_utils_1.BaseCollection();
    [constants_1.HTTPVerbs.HEAD] = new julian_utils_1.BaseCollection();
    [constants_1.HTTPVerbs.OPTIONS] = new julian_utils_1.BaseCollection();
    [constants_1.HTTPVerbs.CONNECT] = new julian_utils_1.BaseCollection();
    [constants_1.HTTPVerbs.TRACE] = new julian_utils_1.BaseCollection();
    [constants_1.HTTPVerbs.ALL] = new julian_utils_1.BaseCollection();
    get any() {
        const total = new julian_utils_1.BaseCollection();
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
