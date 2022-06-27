import { HTTPHeaders, HTTPVerbs } from "./constants";

export type EndpointString = `${HTTPVerbs} /${string}`;
export type HeaderValue = string | number | Array<string>;
export type CustomHTTPHeaders = `x-${string}`;
export type Headers = Record<
  HTTPHeaders | CustomHTTPHeaders | `${HTTPHeaders}`,
  Exclude<HeaderValue, number> | undefined
>;

export type IncomingHeadersEntries = Array<
  [keyof Headers, Headers[keyof Headers]]
>;
