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

export type Param<T extends string> =
  T extends `${HTTPVerbs} /${infer Endpoint}/${infer Rest}`
    ? [
        ...(Endpoint extends `{${infer param}}` ? [param] : []),
        ...Param<`/${Rest}`>
      ]
    : [];

export type DictionaryOfParams<T extends string> = {
  [K in T]: string;
};

export type C = Param<"GET /{id}/">;
