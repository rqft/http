import { BaseCollection as Collection } from "julian-utils";
import { Client } from "./client";
import { HTTPVerbs } from "./constants";
import { Input } from "./input";
import { Output } from "./output";
import { EndpointString } from "./types";

export interface EndpointOptions {
  method: HTTPVerbs;
  handler: (
    input: Input,
    output: Output,
    endpoint: Endpoint,
    client: Client
  ) => any;
}

export class Endpoint {
  public path: string;
  public method: HTTPVerbs;
  public handler: EndpointOptions["handler"];
  constructor(path: string, options: EndpointOptions) {
    this.path = path;
    this.method = options.method;
    this.handler = options.handler;
  }

  public params<Params extends string = string>(
    pathname: string
  ): Collection<Params, string> {
    const output = new Collection<Params, string>();
    const source = this.path.split("/");
    const target = pathname.split("/");

    for (let i = 0; i < source.length; i++) {
      const named = source[i]!.match(/^{(\w+)}$/);
      if (named) {
        output.set(named[1]! as Params, target[i] || "");
      }

      const existingGlobals = output.filter((_, key) => key.startsWith("*"));
      if (source[i] === "*") {
        output.set("*".repeat(existingGlobals.size) as Params, target[i] || "");
      }
    }

    return output;
  }

  public match(pathname: string): boolean {
    const output = this.params(pathname).clone();
    return output.size > 0 || this.path === pathname;
  }

  static parse<T extends EndpointString>(path: T) {
    let [method, pathname] = path.split(" ") as [HTTPVerbs, string];
    if (!pathname || !pathname.startsWith("/")) {
      pathname = "/" + (pathname || "");
    }
    return { method, pathname };
  }
}
