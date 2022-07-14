import { Endpoints } from "./collections/endpoints";
import { Endpoint, EndpointOptions } from "./endpoint";
import { Input } from "./input";
import { Output } from "./output";
import { Arguments, EndpointString } from "./types";
export interface ClientOptions<S extends boolean = true> {
    secure?: S;
    port: number;
    host: string;
    server: S extends true ? import("https").Server | import("https").ServerOptions : import("http").Server | import("http").ServerOptions;
    capture: EndpointOptions<string>["handler"];
    middleware: Array<(<T extends string = string>(input: Input<T, S>, output: Output, next: () => void, endpoint: Endpoint<T, S>, client: Client<S>) => any)>;
}
export declare class Client<S extends boolean = true> {
    secure: S;
    port: number;
    host: string;
    http: S extends true ? import("https").Server : import("http").Server;
    capture?: ClientOptions<S>["capture"];
    middleware: ClientOptions<S>["middleware"];
    private serverClass;
    endpoints: Endpoints<S>;
    constructor(options?: Partial<ClientOptions<S>>);
    apply<T extends string>(endpoint: Endpoint<T>): this;
    use(...middleware: ClientOptions<S>["middleware"]): this;
    create<T extends string>(path: EndpointString<T>, handler: EndpointOptions<T>["handler"]): this;
    listen(callback?: (self: this) => any): void;
    close(callback?: (self: this) => any): void;
    private buildMethod;
    all: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    connect: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    delete: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    get: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    head: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    options: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    patch: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    post: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    put: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    trace: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    copy: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    link: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    unlink: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    purge: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    lock: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    unlock: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    propfind: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    view: <T extends string>(path: T, handler: (input: Input<T, true>, output: Output, endpoint: Endpoint<T, true>, client: Client<true>) => any) => void;
    run(listen?: Arguments<this["listen"]>[0]): void;
    initialize(): void;
}
