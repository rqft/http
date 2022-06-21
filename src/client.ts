import { Server } from "http";
import { ServerOptions } from "https";
import { Endpoints } from "./collections/endpoints";
import { HTTPVerbs } from "./constants";
import { Endpoint, EndpointOptions } from "./endpoint";
import { Input } from "./input";
import { Output } from "./output";
import { EndpointString } from "./types";

export interface ClientOptions {
  port: number;
  host: string;
  server: ServerOptions;
}

export class Client {
  public port: number;
  public host: string;
  public http: Server;

  public endpoints = new Endpoints();
  constructor(options?: Partial<ClientOptions>) {
    this.port = options?.port || 3000;
    this.host = options?.host || "localhost";
    this.http = new Server(options?.server || {});
  }

  public apply(endpoint: Endpoint) {
    this.endpoints[endpoint.method].set(endpoint.path, endpoint);
  }

  public create(path: EndpointString, handler: EndpointOptions["handler"]) {
    const { method, pathname } = Endpoint.parse(path);
    const endpoint = new Endpoint(pathname, {
      method,
      handler,
    });
    this.apply(endpoint);
    return this;
  }

  public listen() {
    this.http.listen(this.port, this.host, () => console.log("ok"));
  }

  public initialize() {
    for (const verb in this.endpoints) {
      const endpoints = this.endpoints[verb as HTTPVerbs];
      this.http.on("request", (req, res) => {
        const path = req.url;
        if (path) {
          const endpoint = endpoints.find(
            (endpoint) => endpoint.match(path).size > 0
          );
          if (endpoint) {
            const input = new Input(req);
            const output = new Output(res);
            return endpoint.handler(input, output);
          }
        }
      });
    }
  }
}
