import { ServerResponse } from "http";
import { BaseCollection as Collection } from "julian-utils";
import { ContentTypes, StatusCodes } from "./constants";
import { Headers, HeaderValue } from "./types";

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

  i = 0;

  public send(data: any) {
    if (!this.headers.get("content-type")) {
      this.setHeader("content-type", this.static.identify(data));
    }
    return this.data.end(this.static.parse(data));
  }

  get headers(): Collection<keyof Headers, HeaderValue | undefined> {
    return new Collection(Object.entries(this.data.getHeaders()) as never);
  }

  public setHeader(key: keyof Headers, value: HeaderValue) {
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

  public static identify(data: any): ContentTypes {
    switch (data.constructor) {
      case String:
        return ContentTypes.TEXT_PLAIN;
      case Buffer:
      case Uint8Array:
        return ContentTypes.APPLICATION_OCTET_STREAM;
      case Date:
        return ContentTypes.TEXT_PLAIN;
      default:
        return ContentTypes.APPLICATION_JSON;
    }
  }
}
