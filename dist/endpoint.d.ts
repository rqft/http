import { BaseCollection as Collection } from "julian-utils";
import { Client } from "./client";
import { HTTPVerbs } from "./constants";
import { Input } from "./input";
import { Output } from "./output";
import { EndpointString, UrlParams } from "./types";
export interface EndpointOptions<T extends string, S extends boolean = true> {
    method: HTTPVerbs;
    handler: (input: Input<T, S>, output: Output, endpoint: Endpoint<T, S>, client: Client<S>) => any;
}
export declare class Endpoint<T extends string = any, S extends boolean = true> {
    path: T;
    method: HTTPVerbs;
    handler: EndpointOptions<T, S>["handler"];
    constructor(path: [UrlParams<T>] extends [never] ? never : T, options: EndpointOptions<T, S>);
    params(pathname: string): Collection<UrlParams<T>[number], string>;
    match(pathname: string): boolean;
    static parse<T extends EndpointString<U>, U extends string>(path: T): {
        method: HTTPVerbs;
        pathname: string;
    };
}
