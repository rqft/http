/// <reference types="node" />
import { IncomingMessage } from "http";
import { Collection } from "../../Julian/dist/collection";
import { HTTPHeaders } from "./constants";
import { CustomHTTPHeaders, HeaderValue } from "./types";
export declare class Input {
    data: IncomingMessage;
    constructor(data: IncomingMessage);
    get headers(): Collection<HTTPHeaders | CustomHTTPHeaders | `${HTTPHeaders}`, Exclude<HeaderValue, number> | undefined>;
    get url(): URL;
}
