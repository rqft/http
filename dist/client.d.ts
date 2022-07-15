/// <reference types="node" />
import { Server } from "http";
import { Endpoints } from "./collections/endpoints";
import { Endpoint, EndpointOptions } from "./endpoint";
import { Input } from "./input";
import { Output } from "./output";
import { Arguments, EndpointString } from "./types";
export interface ClientOptions {
    port: number;
    host: string;
    server: Server;
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
    private buildMethod;
    all: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    connect: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    delete: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    get: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    head: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    options: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    patch: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    post: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    put: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    trace: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    copy: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    link: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    unlink: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    purge: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    lock: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    unlock: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    propfind: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    view: <T extends string>(path: T, handler: (input: Input<T>, output: Output, endpoint: Endpoint<T>, client: Client) => any) => void;
    run(listen?: Arguments<this["listen"]>[0]): void;
    initialize(): void;
}
