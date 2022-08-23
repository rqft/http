import { BaseCollection as Collection } from "@rqft/utils";
import { HTTPVerbs } from "../constants";
import { Endpoint } from "../endpoint";
export declare class EndpointCollection extends Collection<string, Endpoint<string>> {
}
export declare class Endpoints {
    [HTTPVerbs.GET]: EndpointCollection;
    [HTTPVerbs.POST]: EndpointCollection;
    [HTTPVerbs.PUT]: EndpointCollection;
    [HTTPVerbs.DELETE]: EndpointCollection;
    [HTTPVerbs.PATCH]: EndpointCollection;
    [HTTPVerbs.HEAD]: EndpointCollection;
    [HTTPVerbs.OPTIONS]: EndpointCollection;
    [HTTPVerbs.CONNECT]: EndpointCollection;
    [HTTPVerbs.TRACE]: EndpointCollection;
    [HTTPVerbs.ALL]: EndpointCollection;
    [HTTPVerbs.COPY]: EndpointCollection;
    [HTTPVerbs.LINK]: EndpointCollection;
    [HTTPVerbs.UNLINK]: EndpointCollection;
    [HTTPVerbs.PURGE]: EndpointCollection;
    [HTTPVerbs.LOCK]: EndpointCollection;
    [HTTPVerbs.UNLOCK]: EndpointCollection;
    [HTTPVerbs.PROPFIND]: EndpointCollection;
    [HTTPVerbs.VIEW]: EndpointCollection;
    get any(): EndpointCollection;
}
