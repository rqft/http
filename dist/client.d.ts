/// <reference types="node" />
/// <reference types="node" />
import { Server } from "http";
import { ServerOptions } from "https";
import { Endpoints } from "./collections/endpoints";
import { Endpoint, EndpointOptions } from "./endpoint";
import { EndpointString } from "./types";
export interface ClientOptions {
    port: number;
    host: string;
    server: ServerOptions;
    capture: EndpointOptions["handler"];
    middleware: Array<(...args: [
        ...Parameters<EndpointOptions["handler"]>,
        this["middleware"][number]
    ]) => any>;
}
export declare class Client {
    port: number;
    host: string;
    http: Server;
    capture?: EndpointOptions["handler"];
    middleware: ClientOptions["middleware"];
    endpoints: Endpoints;
    constructor(options?: Partial<ClientOptions>);
    apply(endpoint: Endpoint): this;
    use(...middleware: ClientOptions["middleware"]): this;
    create(path: EndpointString, handler: EndpointOptions["handler"]): this;
    listen(callback?: (self: this) => any): void;
    initialize(): void;
}
