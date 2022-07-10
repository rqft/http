import { HTTPHeaders, HTTPVerbs } from "./constants";

export type EndpointString<T extends string> = `${HTTPVerbs} ${T}`;
export type HeaderValue = string | number | Array<string>;
export type CustomHTTPHeaders = `x-${string}`;
export type Headers = Record<
  HTTPHeaders | CustomHTTPHeaders | `${HTTPHeaders}`,
  Exclude<HeaderValue, number> | undefined
>;

export type IncomingHeadersEntries = Array<
  [keyof Headers, Headers[keyof Headers]]
>;

type UrlParam<T> = T extends `{${infer P}}` ? P : never;
type Removal<T extends Array<any>, Z> = T extends [infer U, ...infer Us]
  ? [U] extends [Z]
    ? Removal<Us, Z>
    : [U, ...Removal<Us, Z>]
  : [];

type UrlParamsRaw<T extends string> = Removal<
  T extends `/${infer Endpoint}/${infer Rest}`
    ? [UrlParam<Endpoint>, ...UrlParamsRaw<`/${Rest}`>]
    : T extends `/${infer Endpoint}`
    ? [UrlParam<Endpoint>]
    : [],
  never
>;

export type UrlParams<T extends string> = UrlParamsRaw<T>["length"] extends 0
  ? string
  : UrlParamsRaw<T>[number];

type ObjectFromEntries<T> = T extends [infer U, any][]
  ? {
      [K in U extends string ? U : string]: Extract<T[number], [K, any]>[1];
    }
  : { [key in string]: any };

type SearchParamsRaw<T extends string> =
  T extends `?${infer K}=${infer V}&${infer Rest}`
    ? [[K, V], ...SearchParamsRaw<`?${Rest}`>]
    : T extends `?${infer K}=${infer V}`
    ? [[K, V]]
    : [];

export type SearchParams<T extends string> = ObjectFromEntries<
  SearchParamsRaw<T>
>;
