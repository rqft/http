import { BaseCollection as Collection } from "julian-utils";
import { HTTPVerbs } from "../constants";
import { Endpoint } from "../endpoint";
export declare class Endpoints {
    [HTTPVerbs.GET]: Collection<string, Endpoint<string>>;
    [HTTPVerbs.POST]: Collection<string, Endpoint<string>>;
    [HTTPVerbs.PUT]: Collection<string, Endpoint<string>>;
    [HTTPVerbs.DELETE]: Collection<string, Endpoint<string>>;
    [HTTPVerbs.PATCH]: Collection<string, Endpoint<string>>;
    [HTTPVerbs.HEAD]: Collection<string, Endpoint<string>>;
    [HTTPVerbs.OPTIONS]: Collection<string, Endpoint<string>>;
    [HTTPVerbs.CONNECT]: Collection<string, Endpoint<string>>;
    [HTTPVerbs.TRACE]: Collection<string, Endpoint<string>>;
    [HTTPVerbs.ALL]: Collection<string, Endpoint<string>>;
    get any(): Collection<string, Endpoint<string>>;
}
