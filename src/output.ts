import { ServerResponse } from "http";
import { BaseCollection as Collection } from "julian-utils";
import { StatusCodes } from "./constants";
import { HeaderValue } from "./types";

export class Output {
  private static: typeof Output = Output;
  public data: ServerResponse;
  constructor(data: ServerResponse) {
    this.data = data;
  }

  public setStatus(code: StatusCodes) {
    this.data.statusCode = code;
    return this;
  }

  public write(data: any) {
    this.data.write(this.static.parse(data));
    return this;
  }

  public send(data: any) {
    return this.data.end(this.static.parse(data));
  }

  get headers(): Collection<string, HeaderValue | undefined> {
    return new Collection(Object.entries(this.data.getHeaders()));
  }

  public setHeader(key: string, value: HeaderValue) {
    this.data.setHeader(key, value);
    return this;
  }

  public static parse(data?: any): string | Buffer | Uint8Array {
    if (data) {
      switch (data.constructor) {
        case String:
        case Buffer:
        case Uint8Array:
          return data;
        case Date:
          return data.toString();
        default:
          return JSON.stringify(data);
      }
    }
    return "";
  }
}
