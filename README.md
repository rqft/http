# Kevin
ts server library

heres the example because apparently this world is inhabited by blind idiots
```ts
import { Client } from "kevin-http";

// create the client, wont do anything yet
const app = new Client({
  port: 3000
});

// add middleware
app.use((req, res, next) => {
  // you could set content-type manually, but if you don't then res.send() will identify it for you
  res.setHeader("content-type", "plain/text");
  next();
});

// add some endpoints !
app.create("GET /", (req, res) => {
  res.send("hi");
});

app.create("POST /{id}", (req, res) => {
  const id = req.params.get("id");
  if (!id) {
    res.send("no id !!");
  }
  
  res.send(id);
});

// load them in
app.initialize();

// start the server
app.listen((self) => {
  console.log("ok!");
});
```
