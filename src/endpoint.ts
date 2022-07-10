import { BaseCollection as Collection } from "julian-utils";
import { Client } from "./client";
import { HTTPVerbs } from "./constants";
import { Input } from "./input";
import { Output } from "./output";
import { EndpointString, UrlParams } from "./types";

export interface EndpointOptions<T extends string> {
  method: HTTPVerbs;
  handler: (
    input: Input<T>,
    output: Output,
    endpoint: Endpoint<T>,
    client: Client
  ) => any;
}

export class Endpoint<T extends string = any> {
  public path: T;
  public method: HTTPVerbs;
  public handler: EndpointOptions<T>["handler"];
  constructor(
    path: [UrlParams<T>] extends [never] ? never : T,
    options: EndpointOptions<T>
  ) {
    this.path = path;
    this.method = options.method;
    this.handler = options.handler;
  }

  public params(pathname: string): Collection<UrlParams<T>[number], string> {
    const output = new Collection<UrlParams<T>[number], string>();
    const source = this.path.split("/");
    const target = pathname.split("/");

    for (let i = 0; i < source.length; i++) {
      const named = source[i]!.match(/^{(\w+)}$/);
      if (named) {
        output.set(named[1]! as UrlParams<T>[number], target[i] || "");
      }

      const existingGlobals = output.filter((_, key) =>
        (key as string).startsWith("*")
      );
      if (source[i] === "*") {
        output.set("*".repeat(existingGlobals.size) as any, target[i] || "");
      }
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
