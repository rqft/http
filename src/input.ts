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
  UrlParams,
} from "./types";

export interface InputOptions<T extends string, S extends boolean = true> {
  data: IncomingMessage;
  endpoint?: Endpoint<T, S>;
  client: Client<S>;
  body?: Array<Chunk>;
}

export class Input<T extends string = string, S extends boolean = true> {
  public data: IncomingMessage;
  public client: Client<S>;
  public endpoint!: Endpoint<T, S>;
  public bodyParts: Array<Chunk> = [];
  constructor(data: InputOptions<T, S>) {
    this.data = data.data;
    this.client = data.client;
    this.endpoint = data.endpoint!;
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

  public get params(): Collection<UrlParams<T>, string> {
    return this.endpoint?.params(this.url.pathname) || new Collection();
  }

  public get query(): Collection<string, string> {
    return new Collection(this.url.searchParams);
  }
}
