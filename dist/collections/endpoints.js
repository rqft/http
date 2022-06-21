"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = void 0;
const collection_1 = require("../../../Julian/dist/collection");
const constants_1 = require("../constants");
class Endpoints {
    [constants_1.HTTPVerbs.GET] = new collection_1.Collection();
    [constants_1.HTTPVerbs.POST] = new collection_1.Collection();
    [constants_1.HTTPVerbs.PUT] = new collection_1.Collection();
    [constants_1.HTTPVerbs.DELETE] = new collection_1.Collection();
    [constants_1.HTTPVerbs.PATCH] = new collection_1.Collection();
    [constants_1.HTTPVerbs.HEAD] = new collection_1.Collection();
    [constants_1.HTTPVerbs.OPTIONS] = new collection_1.Collection();
    [constants_1.HTTPVerbs.CONNECT] = new collection_1.Collection();
    [constants_1.HTTPVerbs.TRACE] = new collection_1.Collection();
    [constants_1.HTTPVerbs.ALL] = new collection_1.Collection();
}
exports.Endpoints = Endpoints;
