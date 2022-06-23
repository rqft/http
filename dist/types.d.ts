import { HTTPHeaders, HTTPVerbs } from "./constants";
export declare type EndpointString = `${HTTPVerbs} /${string}`;
export declare type HeaderValue = string | number | Array<string>;
export declare type CustomHTTPHeaders = `x-${string}`;
export declare type IncomingHeaders = Record<HTTPHeaders | CustomHTTPHeaders | `${HTTPHeaders}`, Exclude<HeaderValue, number> | undefined>;
export declare type IncomingHeadersEntries = Array<[
    keyof IncomingHeaders,
    IncomingHeaders[keyof IncomingHeaders]
]>;
