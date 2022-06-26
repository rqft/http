/// <reference types="node" />
/// <reference types="node" />
import { ServerResponse } from "http";
import { BaseCollection as Collection } from "../../Julian/dist/collection";
import { StatusCodes } from "./constants";
import { HeaderValue } from "./types";
export declare class Output {
    private static;
    data: ServerResponse;
    constructor(data: ServerResponse);
    setStatus(code: StatusCodes): this;
    write(data: any): this;
    send(data: any): ServerResponse;
    get headers(): Collection<string, HeaderValue | undefined>;
    setHeader(key: string, value: HeaderValue): this;
    static parse(data?: any): string | Buffer | Uint8Array;
}
