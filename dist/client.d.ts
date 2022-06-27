/// <reference types="node" />
/// <reference types="node" />
import { Server } from "http";
import { ServerOptions } from "https";
import { Endpoints } from "./collections/endpoints";
import { Endpoint, EndpointOptions } from "./endpoint";
import { Input } from "./input";
import { Output } from "./output";
import { EndpointString } from "./types";
export interface ClientOptions {
    port: number;
    host: string;
    server: ServerOptions | Server;
    capture: EndpointOptions["handler"];
    middleware: Array<(input: Input, output: Output, next: this["middleware"][number] | null, endpoint: Endpoint, client: Client) => any>;
}
export declare class Client {
    port: number;
    host: string;
    http: Server;
    capture?: ClientOptions["capture"];
    middleware: ClientOptions["middleware"];
    endpoints: Endpoints;
    constructor(options?: Partial<ClientOptions>);
    apply(endpoint: Endpoint): this;
    use(...middleware: ClientOptions["middleware"]): this;
    create(path: EndpointString, handler: EndpointOptions["handler"]): this;
    listen(callback?: (self: this) => any): void;
    private capturing;
    initialize(): void;
}
