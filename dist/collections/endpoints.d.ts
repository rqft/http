import { Collection } from "../../../Julian/dist/collection";
import { HTTPVerbs } from "../constants";
import { Endpoint } from "../endpoint";
export declare class Endpoints {
    [HTTPVerbs.GET]: Collection<string, Endpoint>;
    [HTTPVerbs.POST]: Collection<string, Endpoint>;
    [HTTPVerbs.PUT]: Collection<string, Endpoint>;
    [HTTPVerbs.DELETE]: Collection<string, Endpoint>;
    [HTTPVerbs.PATCH]: Collection<string, Endpoint>;
    [HTTPVerbs.HEAD]: Collection<string, Endpoint>;
    [HTTPVerbs.OPTIONS]: Collection<string, Endpoint>;
    [HTTPVerbs.CONNECT]: Collection<string, Endpoint>;
    [HTTPVerbs.TRACE]: Collection<string, Endpoint>;
    [HTTPVerbs.ALL]: Collection<string, Endpoint>;
}
