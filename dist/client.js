"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const chunk_1 = require("./chunk");
const endpoints_1 = require("./collections/endpoints");
const constants_1 = require("./constants");
const endpoint_1 = require("./endpoint");
const input_1 = require("./input");
const output_1 = require("./output");
const tools_1 = require("./tools");
const http = __importStar(require("http"));
const https = __importStar(require("https"));
class Client {
    secure = true;
    port;
    host;
    http;
    capture;
    middleware;
    serverClass = this.secure ? https.Server : http.Server;
    endpoints = new endpoints_1.Endpoints();
    constructor(options) {
        this.secure = options?.secure ?? true;
        this.port = options?.port || 3000;
        this.host = options?.host || "localhost";
        this.http =
            options?.server instanceof this.serverClass
                ? options.server
                : new this.serverClass(options?.server || {});
        this.capture = options?.capture;
        this.middleware = options?.middleware || [];
    }
    apply(endpoint) {
        console.log(endpoint);
        this.endpoints[endpoint.method].set(endpoint.path, endpoint);
        console.log(this.endpoints[endpoint.method]);
        return this;
    }
    use(...middleware) {
        this.middleware.push(...middleware);
        return this;
    }
    create(path, handler) {
        const { method, pathname } = endpoint_1.Endpoint.parse(path);
        const endpoint = new endpoint_1.Endpoint(pathname, {
            method,
            handler,
        });
        this.apply(endpoint);
        return this;
    }
    listen(callback) {
        this.http.listen(this.port, this.host, () => {
            if (callback) {
                callback(this);
            }
        });
    }
    close(callback) {
        this.http.close(() => {
            if (callback) {
                callback(this);
            }
        });
    }
    buildMethod(method) {
        return (path, handler) => {
            this.create(`${method} ${path}`, handler);
        };
    }
    all = this.buildMethod(constants_1.HTTPVerbs.ALL);
    connect = this.buildMethod(constants_1.HTTPVerbs.CONNECT);
    delete = this.buildMethod(constants_1.HTTPVerbs.DELETE);
    get = this.buildMethod(constants_1.HTTPVerbs.GET);
    head = this.buildMethod(constants_1.HTTPVerbs.HEAD);
    options = this.buildMethod(constants_1.HTTPVerbs.OPTIONS);
    patch = this.buildMethod(constants_1.HTTPVerbs.PATCH);
    post = this.buildMethod(constants_1.HTTPVerbs.POST);
    put = this.buildMethod(constants_1.HTTPVerbs.PUT);
    trace = this.buildMethod(constants_1.HTTPVerbs.TRACE);
    copy = this.buildMethod(constants_1.HTTPVerbs.COPY);
    link = this.buildMethod(constants_1.HTTPVerbs.LINK);
    unlink = this.buildMethod(constants_1.HTTPVerbs.UNLINK);
    purge = this.buildMethod(constants_1.HTTPVerbs.PURGE);
    lock = this.buildMethod(constants_1.HTTPVerbs.LOCK);
    unlock = this.buildMethod(constants_1.HTTPVerbs.UNLOCK);
    propfind = this.buildMethod(constants_1.HTTPVerbs.PROPFIND);
    view = this.buildMethod(constants_1.HTTPVerbs.VIEW);
    run(listen) {
        this.initialize();
        this.listen(listen);
    }
    initialize() {
        (0, tools_1.sleep)(1);
        if (this.capture) {
            this.create("GET /*", this.capture);
        }
        const endpoints = this.endpoints.any;
        this.http.on("request", (req, res) => {
            let input = new input_1.Input({
                client: this,
                data: req,
            });
            req.on("data", (data) => {
                const chunk = new chunk_1.Chunk(data);
                input.bodyParts.push(chunk);
            });
            req.on("end", () => {
                const output = new output_1.Output(res);
                const path = input.url.pathname;
                if (path) {
                    console.log(path);
                    const endpoint = endpoints.find((endpoint) => endpoint.match(path));
                    if (endpoint) {
                        if (req.method) {
                            if (endpoint.method === constants_1.HTTPVerbs.ALL ||
                                endpoint.method === req.method) {
                                input.endpoint = endpoint;
                                let i = 0;
                                const next = () => {
                                    if (i < this.middleware.length) {
                                        this.middleware[i++](input, output, next, endpoint, this);
                                    }
                                    else {
                                        endpoint.handler(input, output, endpoint, this);
                                    }
                                };
                                next();
                            }
                        }
                    }
                }
            });
        });
    }
}
exports.Client = Client;
