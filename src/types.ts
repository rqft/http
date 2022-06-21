import { HTTPVerbs } from "./constants";

export type EndpointString = `${HTTPVerbs} /${string}`;
export type HeaderValue = string | number | Array<string>;
export type CustomHTTPHeaders = `x-${string}`;
