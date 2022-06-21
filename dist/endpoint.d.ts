import { Collection } from "../../Julian/dist/collection";
import { HTTPVerbs } from "./constants";
import { Input } from "./input";
import { Output } from "./output";
import { EndpointString } from "./types";
export interface EndpointOptions {
    method: HTTPVerbs;
    handler: (input: Input, output: Output) => any;
}
export declare class Endpoint {
    path: string;
    method: HTTPVerbs;
    handler: EndpointOptions["handler"];
    constructor(path: string, options: EndpointOptions);
    match(pathname: string): Collection<string, string>;
    static parse(path: EndpointString): {
        method: HTTPVerbs;
        pathname: string;
    };
}
