import { Client } from "./client";

const client = new Client();

client.create("GET /a/{id}", (input, output) => {
  output.send(input.url.toString());
});

client.initialize();

client.listen();
