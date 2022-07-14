/// <reference types="node" />
import { IncomingMessage } from "http";
import { BaseCollection as Collection } from "julian-utils";
import { Chunk } from "./chunk";
import { Client } from "./client";
import { HTTPHeaders, HTTPVerbs } from "./constants";
import { Endpoint } from "./endpoint";
import { CustomHTTPHeaders, HeaderValue, UrlParams } from "./types";
export interface InputOptions<T extends string, S extends boolean = true> {
    data: IncomingMessage;
    endpoint?: Endpoint<T, S>;
    client: Client<S>;
    body?: Array<Chunk>;
}
export declare class Input<T extends string = string, S extends boolean = true> {
    data: IncomingMessage;
    client: Client<S>;
    endpoint: Endpoint<T, S>;
    bodyParts: Array<Chunk>;
    constructor(data: InputOptions<T, S>);
    get body(): string;
    get headers(): Collection<HTTPHeaders | CustomHTTPHeaders | `${HTTPHeaders}`, Exclude<HeaderValue, number> | undefined>;
    get url(): URL;
    get method(): HTTPVerbs;
    get params(): Collection<UrlParams<T>, string>;
    get query(): Collection<string, string>;
}
