import { BaseCollection as Collection } from "julian-utils";
import { Client } from "./client";
import { HTTPVerbs } from "./constants";
import { Input } from "./input";
import { Output } from "./output";
import { EndpointString } from "./types";
export interface EndpointOptions {
    method: HTTPVerbs;
    handler: (input: Input, output: Output, endpoint: Endpoint, client: Client) => any;
    next?: Endpoint;
}
export declare class Endpoint {
    path: string;
    method: HTTPVerbs;
    handler: EndpointOptions["handler"];
    constructor(path: string, options: EndpointOptions);
    params<Params extends string = string>(pathname: string): Collection<Params, string>;
    match(pathname: string): boolean;
    static parse(path: EndpointString): {
        method: HTTPVerbs;
        pathname: string;
    };
}
