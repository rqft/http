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
    capture: EndpointOptions<string>["handler"];
    middleware: Array<(<T extends string = string>(input: Input<T>, output: Output, next: () => void, endpoint: Endpoint<T>, client: Client) => any)>;
}
export declare class Client {
    port: number;
    host: string;
    http: Server;
    capture?: ClientOptions["capture"];
    middleware: ClientOptions["middleware"];
    endpoints: Endpoints;
    constructor(options?: Partial<ClientOptions>);
    apply<T extends string>(endpoint: Endpoint<T>): this;
    use(...middleware: ClientOptions["middleware"]): this;
    create<T extends string>(path: EndpointString<T>, handler: EndpointOptions<T>["handler"]): this;
    listen(callback?: (self: this) => any): void;
    close(callback?: (self: this) => any): void;
    initialize(): void;
}
