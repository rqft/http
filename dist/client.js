"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const http_1 = require("http");
const endpoints_1 = require("./collections/endpoints");
const endpoint_1 = require("./endpoint");
const input_1 = require("./input");
const output_1 = require("./output");
class Client {
    port;
    host;
    http;
    endpoints = new endpoints_1.Endpoints();
    constructor(options) {
        this.port = options?.port || 3000;
        this.host = options?.host || "localhost";
        this.http = new http_1.Server(options?.server || {});
    }
    apply(endpoint) {
        this.endpoints[endpoint.method].set(endpoint.path, endpoint);
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
    listen() {
        this.http.listen(this.port, this.host, () => console.log("ok"));
    }
    initialize() {
        for (const verb in this.endpoints) {
            const endpoints = this.endpoints[verb];
            this.http.on("request", (req, res) => {
                const path = req.url;
                if (path) {
                    const endpoint = endpoints.find((endpoint) => endpoint.match(path).size > 0);
                    if (endpoint) {
                        const input = new input_1.Input(req);
                        const output = new output_1.Output(res);
                        return endpoint.handler(input, output);
                    }
                }
            });
        }
    }
}
exports.Client = Client;
