import { Collection } from "../../Julian/dist/collection";
import { HTTPVerbs } from "./constants";
import { Input } from "./input";
import { Output } from "./output";
import { EndpointString } from "./types";

export interface EndpointOptions {
  method: HTTPVerbs;
  handler: (input: Input, output: Output) => any;
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

  public match(pathname: string): Collection<string, string> {
    const output = new Collection<string, string>();
    const source = this.path.split("/");
    const target = pathname.split("/");

    if (source.length !== target.length) {
      return new Collection();
    }

    for (let i = 0; i < source.length; i++) {
      if (/\{.*\}/g.test(source[i]!) || source[i] === "*") {
        output.set(source[i]!, target[i]!);
      }
    }
    return output;
  }

  static parse(path: EndpointString) {
    const [method, pathname] = path.split(" ") as [HTTPVerbs, string];
    return { method, pathname };
  }
}
