"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const client = new client_1.Client();
client.create("GET /a/{id}", (input, output) => {
    output.send(input.url.toString());
});
client.initialize();
client.listen();
