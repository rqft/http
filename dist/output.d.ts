/// <reference types="node" />
/// <reference types="node" />
import { ServerResponse } from "http";
import { BaseCollection as Collection } from "julian-utils";
import { ContentTypes, StatusCodes } from "./constants";
import { Headers, HeaderValue } from "./types";
export declare class Output {
    private static;
    data: ServerResponse;
    constructor(data: ServerResponse);
    setStatus(code: StatusCodes): this;
    write(data: any): this;
    i: number;
    send(data: any): this;
    get headers(): Collection<keyof Headers, HeaderValue | undefined>;
    setHeader(key: keyof Headers, value: HeaderValue): this;
    static parse(data?: any): string | Buffer | Uint8Array;
    static identify(data: any): ContentTypes;
}
