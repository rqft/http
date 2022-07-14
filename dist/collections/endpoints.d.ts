import { BaseCollection as Collection } from "julian-utils";
import { HTTPVerbs } from "../constants";
import { Endpoint } from "../endpoint";
export declare class EndpointCollection<S extends boolean> extends Collection<string, Endpoint<string, S>> {
}
export declare class Endpoints<S extends boolean> {
    [HTTPVerbs.GET]: EndpointCollection<S>;
    [HTTPVerbs.POST]: EndpointCollection<S>;
    [HTTPVerbs.PUT]: EndpointCollection<S>;
    [HTTPVerbs.DELETE]: EndpointCollection<S>;
    [HTTPVerbs.PATCH]: EndpointCollection<S>;
    [HTTPVerbs.HEAD]: EndpointCollection<S>;
    [HTTPVerbs.OPTIONS]: EndpointCollection<S>;
    [HTTPVerbs.CONNECT]: EndpointCollection<S>;
    [HTTPVerbs.TRACE]: EndpointCollection<S>;
    [HTTPVerbs.ALL]: EndpointCollection<S>;
    [HTTPVerbs.COPY]: EndpointCollection<S>;
    [HTTPVerbs.LINK]: EndpointCollection<S>;
    [HTTPVerbs.UNLINK]: EndpointCollection<S>;
    [HTTPVerbs.PURGE]: EndpointCollection<S>;
    [HTTPVerbs.LOCK]: EndpointCollection<S>;
    [HTTPVerbs.UNLOCK]: EndpointCollection<S>;
    [HTTPVerbs.PROPFIND]: EndpointCollection<S>;
    [HTTPVerbs.VIEW]: EndpointCollection<S>;
    get any(): EndpointCollection<S>;
}
