/// <reference types="node" />
export declare class Chunk {
    content: Buffer;
    constructor(content: Buffer | any);
    private decoder;
    private encoder;
    text(): string;
    bytes(): Uint8Array;
    json(): any;
    buffer(): ArrayBuffer;
    [Symbol.iterator](): IterableIterator<number>;
    toString(): string;
}
