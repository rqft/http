"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const client_1 = require("./client");
const s = new client_1.Client({
    port: 1000,
    capture: () => { },
});
s.use((_, __, next) => {
    console.log(1);
    next();
});
s.use((_, __, next) => {
    console.log(2);
    next();
});
s.create("GET /", (_, res) => {
    res.send({ a: "what up" });
});
s.initialize();
s.listen();
(async () => {
    const x = await (0, node_fetch_1.default)("http://localhost:1000/", { method: "GET" });
    const y = await x.text();
    console.log(y, x.headers.get("content-type"));
})();
