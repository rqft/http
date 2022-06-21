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
}
export declare class Client {
    port: number;
    host: string;
    http: Server;
    endpoints: Endpoints;
    constructor(options?: Partial<ClientOptions>);
    apply(endpoint: Endpoint): void;
    create(path: EndpointString, handler: EndpointOptions["handler"]): this;
    listen(): void;
    initialize(): void;
}
