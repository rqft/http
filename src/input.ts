import { IncomingMessage } from "http";
import { BaseCollection as Collection } from "julian-utils";
import { Chunk } from "./chunk";
import { Client } from "./client";
import { HTTPHeaders, HTTPVerbs } from "./constants";
import { Endpoint } from "./endpoint";
import {
  CustomHTTPHeaders,
  HeaderValue,
  IncomingHeadersEntries,
} from "./types";

export interface InputOptions {
  data: IncomingMessage;
  endpoint?: Endpoint;
  client: Client;
  body?: Array<Chunk>;
}

export class Input {
  public data: IncomingMessage;
  public client: Client;
  public endpoint?: Endpoint;
  public bodyParts: Array<Chunk> = [];
  constructor(data: InputOptions) {
    this.data = data.data;
    this.client = data.client;
    this.endpoint = data.endpoint;
    if (data.body) {
      this.bodyParts = data.body;
    }
  }

  get body(): string {
    return this.bodyParts.join("");
  }

  public get headers(): Collection<
    HTTPHeaders | CustomHTTPHeaders | `${HTTPHeaders}`,
    Exclude<HeaderValue, number> | undefined
  > {
    return new Collection(
      Object.entries(this.data.headers) as IncomingHeadersEntries
    );
  }

  public get url(): URL {
    return new URL(this.data.url || "/", `http://${this.headers.get("host")}`);
  }

  public get method(): HTTPVerbs {
    return this.data.method as HTTPVerbs;
  }

  public setEndpoint(endpoint: Endpoint): this {
    this.endpoint = endpoint;
    return this;
  }

  public get params(): Collection<string, string> {
    return this.endpoint?.params(this.url.pathname) || new Collection();
  }

  public get query(): Collection<string, string> {
    return new Collection(this.url.searchParams);
  }
}
