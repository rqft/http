import { Removal } from "./types";
export declare function sleep(u: number): void;
export declare function clear<T extends Array<any> = [], U = never>(arr: T, item: U): Removal<T, U>;
