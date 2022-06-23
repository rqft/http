import { HTTPHeaders, HTTPVerbs } from "./constants";

export type EndpointString = `${HTTPVerbs} /${string}`;
export type HeaderValue = string | number | Array<string>;
export type CustomHTTPHeaders = `x-${string}`;
export type IncomingHeaders = Record<
  HTTPHeaders | CustomHTTPHeaders | `${HTTPHeaders}`,
  Exclude<HeaderValue, number> | undefined
>;

export type IncomingHeadersEntries = Array<
  [keyof IncomingHeaders, IncomingHeaders[keyof IncomingHeaders]]
>;
