"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const http_1 = require("http");
const chunk_1 = require("./chunk");
const endpoints_1 = require("./collections/endpoints");
const constants_1 = require("./constants");
const endpoint_1 = require("./endpoint");
const input_1 = require("./input");
const output_1 = require("./output");
const tools_1 = require("./tools");
class Client {
    port;
    host;
    http;
    capture;
    middleware;
    endpoints = new endpoints_1.Endpoints();
    constructor(options) {
        this.port = options?.port || 3000;
        this.host = options?.host || "localhost";
        this.http =
            options?.server instanceof http_1.Server
                ? options.server
                : new http_1.Server(options?.server || {});
        this.capture = options?.capture;
        this.middleware = options?.middleware || [];
    }
    apply(endpoint) {
        this.endpoints[endpoint.method].set(endpoint.path, endpoint);
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
    initialize() {
        (0, tools_1.sleep)(1);
        if (this.capture) {
            this.create("GET /*", this.capture);
        }
        const endpoints = this.endpoints.any;
        this.http.on("request", (req, res) => {
            let input = new input_1.Input({ client: this, data: req });
            req.on("data", (data) => {
                const chunk = new chunk_1.Chunk(data);
                input.bodyParts.push(chunk);
            });
            req.on("end", () => {
                const output = new output_1.Output(res);
                const path = req.url;
                if (path) {
                    const endpoint = endpoints.find((endpoint) => endpoint.match(path));
                    if (endpoint) {
                        if (req.method) {
                            if (endpoint.method === constants_1.HTTPVerbs.ALL ||
                                endpoint.method === req.method) {
                                input.setEndpoint(endpoint);
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
