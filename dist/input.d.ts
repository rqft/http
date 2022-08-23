/// <reference types="node" />
import { BaseCollection as Collection } from "@rqft/utils";
import { IncomingMessage } from "http";
import { Chunk } from "./chunk";
import { Client } from "./client";
import { HTTPHeaders, HTTPVerbs } from "./constants";
import { Endpoint } from "./endpoint";
import { CustomHTTPHeaders, HeaderValue, UrlParams } from "./types";
export interface InputOptions<T extends string> {
    data: IncomingMessage;
    endpoint?: Endpoint<T>;
    client: Client;
    body?: Array<Chunk>;
}
export declare class Input<T extends string = string> {
    data: IncomingMessage;
    client: Client;
    endpoint: Endpoint<T>;
    bodyParts: Array<Chunk>;
    constructor(data: InputOptions<T>);
    get body(): string;
    get headers(): Collection<HTTPHeaders | CustomHTTPHeaders | `${HTTPHeaders}`, Exclude<HeaderValue, number> | undefined>;
    get url(): URL;
    get method(): HTTPVerbs;
    get params(): Collection<UrlParams<T>, string>;
    get query(): Collection<string, string>;
}
