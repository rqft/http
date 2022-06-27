import { Server } from "http";
import { ServerOptions } from "https";
import { Chunk } from "./chunk";
import { Endpoints } from "./collections/endpoints";
import { HTTPVerbs } from "./constants";
import { Endpoint, EndpointOptions } from "./endpoint";
import { Input } from "./input";
import { Output } from "./output";
import { sleep } from "./tools";
import { EndpointString } from "./types";

export interface ClientOptions {
  port: number;
  host: string;
  server: ServerOptions | Server;
  capture: EndpointOptions["handler"];
  middleware: Array<
    (
      input: Input,
      output: Output,
      next: this["middleware"][number] | null,
      endpoint: Endpoint,
      client: Client
    ) => any
  >;
}

export class Client {
  public port: number;
  public host: string;
  public http: Server;
  public capture?: ClientOptions["capture"];
  public middleware: ClientOptions["middleware"];

  public endpoints = new Endpoints();
  constructor(options?: Partial<ClientOptions>) {
    this.port = options?.port || 3000;
    this.host = options?.host || "localhost";
    this.http =
      options?.server instanceof Server
        ? options.server
        : new Server(options?.server || {});
    this.capture = options?.capture;
    this.middleware = options?.middleware || [];
  }

  public apply(endpoint: Endpoint) {
    this.endpoints[endpoint.method].set(endpoint.path, endpoint);
    return this;
  }

  public use(...middleware: ClientOptions["middleware"]) {
    this.middleware.push(...middleware);
    return this;
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

  public listen(callback?: (self: this) => any) {
    this.http.listen(this.port, this.host, () => {
      if (callback) {
        callback(this);
      }
    });
  }

  private capturing = false;

  public initialize() {
    sleep(1);
    if (this.capture && !this.capturing) {
      this.create("GET /*", this.capture);
    }
    for (const verb in this.endpoints) {
      const endpoints = this.endpoints[verb as HTTPVerbs];
      this.http.on("request", (req, res) => {
        let input: Input = new Input({ client: this, data: req });

        req.on("data", (data) => {
          const chunk = new Chunk(data);
          input.bodyParts.push(chunk);
        });

        req.on("end", () => {
          const output = new Output(res);

          const path = req.url;

          if (path) {
            const endpoint = endpoints.find((endpoint) => endpoint.match(path));

            if (endpoint) {
              if (req.method) {
                if (
                  endpoint.method === HTTPVerbs.ALL ||
                  endpoint.method === req.method
                ) {
                  input.setEndpoint(endpoint);
                  if (this.middleware.length) {
                    let index = 0;
                    const next = () => {
                      if (index < this.middleware.length) {
                        this.middleware[index]!(
                          input,
                          output,
                          next,
                          endpoint,
                          this
                        );
                        index++;
                      } else {
                        endpoint.handler(input, output, endpoint, this);
                        return;
                      }
                    };
                    next();
                    return;
                  } else {
                    endpoint.handler(input, output, endpoint, this);
                    return;
                  }
                }
              }
            }
          }
        });
      });
    }
  }
}
