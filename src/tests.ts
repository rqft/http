import fetch from "node-fetch";
import { Client } from "./client";
const s = new Client({
  port: 1000,
  capture: () => {},
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
  const x = await fetch("http://localhost:1000/", { method: "GET" });
  const y = await x.text();
  console.log(y, x.headers.get("content-type"));
})();
