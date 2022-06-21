import { HTTPVerbs } from "./constants";
export declare type EndpointString = `${HTTPVerbs} /${string}`;
export declare type HeaderValue = string | number | Array<string>;
export declare type CustomHTTPHeaders = `x-${string}`;
