/// <reference types="node" />
import { IncomingMessage } from "http";
import { BaseCollection as Collection } from "julian-utils";
import { Client } from "./client";
import { HTTPHeaders, HTTPVerbs } from "./constants";
import { Endpoint } from "./endpoint";
import { CustomHTTPHeaders, HeaderValue } from "./types";
export interface InputOptions {
    data: IncomingMessage;
    endpoint: Endpoint;
    client: Client;
    body?: Array<string>;
}
export declare class Input {
    data: IncomingMessage;
    client: Client;
    endpoint: Endpoint;
    bodyParts: Array<string>;
    constructor(data: InputOptions);
    get body(): string;
    get headers(): Collection<HTTPHeaders | CustomHTTPHeaders | `${HTTPHeaders}`, Exclude<HeaderValue, number> | undefined>;
    get url(): URL;
    get method(): HTTPVerbs;
    get params(): Collection<string, string>;
    get query(): Collection<string, string>;
}
