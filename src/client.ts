import { Chunk } from "./chunk";
import { Endpoints } from "./collections/endpoints";
import { HTTPVerbs } from "./constants";
import { Endpoint, EndpointOptions } from "./endpoint";
import { Input } from "./input";
import { Output } from "./output";
import { sleep } from "./tools";
import { Arguments, EndpointString } from "./types";

export interface ClientOptions<S extends boolean = true> {
  secure?: S;
  port: number;
  host: string;
  server: S extends true
    ? import("https").Server | import("https").ServerOptions
    : import("http").Server | import("http").ServerOptions;
  capture: EndpointOptions<string>["handler"];
  middleware: Array<
    <T extends string = string>(
      input: Input<T, S>,
      output: Output,
      next: () => void,
      endpoint: Endpoint<T, S>,
      client: Client<S>
    ) => any
  >;
}

import * as http from "http";
import * as https from "https";

export class Client<S extends boolean = true> {
  public secure: S = true as S;
  public port: number;
  public host: string;
  public http: S extends true ? import("https").Server : import("http").Server;
  public capture?: ClientOptions<S>["capture"];
  public middleware: ClientOptions<S>["middleware"];

  private serverClass = this.secure ? https.Server : http.Server;

  public endpoints = new Endpoints<S>();
  constructor(options?: Partial<ClientOptions<S>>) {
    this.secure = options?.secure ?? (true as any);
    this.port = options?.port || 3000;
    this.host = options?.host || "localhost";
    this.http =
      options?.server instanceof this.serverClass
        ? options.server
        : (new this.serverClass(options?.server || ({} as any)) as any);
    this.capture = options?.capture;
    this.middleware = options?.middleware || [];
  }

  public apply<T extends string>(endpoint: Endpoint<T>) {
    console.log(endpoint);
    this.endpoints[endpoint.method].set(endpoint.path, endpoint as any);
    console.log(this.endpoints[endpoint.method]);
    return this;
  }

  public use(...middleware: ClientOptions<S>["middleware"]) {
    this.middleware.push(...middleware);
    return this;
  }

  public create<T extends string>(
    path: EndpointString<T>,
    handler: EndpointOptions<T>["handler"]
  ) {
    const { method, pathname } = Endpoint.parse(path as any);
    const endpoint = new Endpoint<T>(pathname as any, {
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

  public close(callback?: (self: this) => any) {
    this.http.close(() => {
      if (callback) {
        callback(this);
      }
    });
  }

  private buildMethod(method: HTTPVerbs) {
    return <T extends string>(
      path: T,
      handler: EndpointOptions<T>["handler"]
    ) => {
      this.create(`${method} ${path}`, handler);
    };
  }

  public all = this.buildMethod(HTTPVerbs.ALL);
  public connect = this.buildMethod(HTTPVerbs.CONNECT);
  public delete = this.buildMethod(HTTPVerbs.DELETE);
  public get = this.buildMethod(HTTPVerbs.GET);
  public head = this.buildMethod(HTTPVerbs.HEAD);
  public options = this.buildMethod(HTTPVerbs.OPTIONS);
  public patch = this.buildMethod(HTTPVerbs.PATCH);
  public post = this.buildMethod(HTTPVerbs.POST);
  public put = this.buildMethod(HTTPVerbs.PUT);
  public trace = this.buildMethod(HTTPVerbs.TRACE);
  public copy = this.buildMethod(HTTPVerbs.COPY);
  public link = this.buildMethod(HTTPVerbs.LINK);
  public unlink = this.buildMethod(HTTPVerbs.UNLINK);
  public purge = this.buildMethod(HTTPVerbs.PURGE);
  public lock = this.buildMethod(HTTPVerbs.LOCK);
  public unlock = this.buildMethod(HTTPVerbs.UNLOCK);
  public propfind = this.buildMethod(HTTPVerbs.PROPFIND);
  public view = this.buildMethod(HTTPVerbs.VIEW);

  public run(listen?: Arguments<this["listen"]>[0]) {
    this.initialize();
    this.listen(listen);
  }

  // all the important code is here
  public initialize() {
    sleep(1);
    if (this.capture) {
      this.create("GET /*", this.capture as any);
    }
    const endpoints = this.endpoints.any;

    this.http.on("request", (req, res) => {
      let input: Input<string, S> = new Input<string, S>({
        client: this,
        data: req,
      });

      req.on("data", (data) => {
        const chunk = new Chunk(data);
        input.bodyParts.push(chunk);
      });

      req.on("end", () => {
        const output = new Output(res);

        const path = input.url.pathname;

        if (path) {
          console.log(path);
          const endpoint = endpoints.find((endpoint) => endpoint.match(path));

          if (endpoint) {
            if (req.method) {
              if (
                endpoint.method === HTTPVerbs.ALL ||
                endpoint.method === req.method
              ) {
                input.endpoint = endpoint;
                let i = 0;
                const next = () => {
                  if (i < this.middleware.length) {
                    this.middleware[i++]!(input, output, next, endpoint, this);
                  } else {
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
