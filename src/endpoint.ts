import { BaseCollection as Collection } from "julian-utils";
import { Client } from "./client";
import { HTTPVerbs } from "./constants";
import { Input } from "./input";
import { Output } from "./output";
import { clear } from "./tools";
import { EndpointString, UrlParams } from "./types";

export interface EndpointOptions<T extends string, S extends boolean = true> {
  method: HTTPVerbs;
  handler: (
    input: Input<T, S>,
    output: Output,
    endpoint: Endpoint<T, S>,
    client: Client<S>
  ) => any;
}

export class Endpoint<T extends string = any, S extends boolean = true> {
  public path: T;
  public method: HTTPVerbs;
  public handler: EndpointOptions<T, S>["handler"];
  constructor(
    path: [UrlParams<T>] extends [never] ? never : T,
    options: EndpointOptions<T, S>
  ) {
    this.path = path;
    this.method = options.method;
    this.handler = options.handler;
  }

  public params(pathname: string): Collection<UrlParams<T>[number], string> {
    const output = new Collection<UrlParams<T>[number], string>();
    const source: Array<string> = clear(this.path.split("/"), "");
    const target: Array<string> = clear(pathname.split("/"), "");

    if (source.length < target.length) {
      return output;
    }

    for (let i = 0; i < source.length; i++) {
      const named = source[i]!.match(/^{(\w+)}$/);
      if (source[i]?.toLowerCase() === target[i]?.toLowerCase()) {
        // output should only have variable params
        continue;
      }

      if (named) {
        output.set(named[1]! as UrlParams<T>[number], target[i] || "");
        continue;
      }

      let times = 0;
      if (source[i] === "*") {
        times++;
        output.set(times + "*", target[i] || "");
        continue;
      }

      break;
    }

    return output;
  }

  public match(pathname: string): boolean {
    const output = this.params(pathname).clone();
    return output.size > 0 || this.path === pathname;
  }

  static parse<T extends EndpointString<U>, U extends string>(
    path: T
  ): { method: HTTPVerbs; pathname: string } {
    let [method, pathname] = path.split(" ") as [HTTPVerbs, string];
    if (!pathname || !pathname.startsWith("/")) {
      pathname = "/" + (pathname || "");
    }
    return { method, pathname };
  }
}
