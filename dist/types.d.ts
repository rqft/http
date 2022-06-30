import { HTTPHeaders, HTTPVerbs } from "./constants";
export declare type EndpointString = `${HTTPVerbs} /${string}`;
export declare type HeaderValue = string | number | Array<string>;
export declare type CustomHTTPHeaders = `x-${string}`;
export declare type Headers = Record<HTTPHeaders | CustomHTTPHeaders | `${HTTPHeaders}`, Exclude<HeaderValue, number> | undefined>;
export declare type IncomingHeadersEntries = Array<[
    keyof Headers,
    Headers[keyof Headers]
]>;
export declare type Param<T extends string> = T extends `${HTTPVerbs} /${infer Endpoint}/${infer Rest}` ? [
    ...(Endpoint extends `{${infer param}}` ? [param] : []),
    ...Param<`/${Rest}`>
] : [];
export declare type DictionaryOfParams<T extends string> = {
    [K in T]: string;
};
export declare type C = Param<"GET /{id}/">;
