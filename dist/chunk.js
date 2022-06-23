"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = void 0;
class Chunk {
    content;
    constructor(content) {
        if (content instanceof Buffer) {
            this.content = content;
        }
        this.content = Buffer.from(content);
    }
    decoder = new TextDecoder(undefined, { fatal: false });
    encoder = new TextEncoder();
    text() {
        return this.decoder.decode(this.content);
    }
    bytes() {
        return this.encoder.encode(this.text());
    }
    json() {
        return JSON.parse(this.text());
    }
    buffer() {
        return this.content.buffer;
    }
    [Symbol.iterator]() {
        return this.content[Symbol.iterator]();
    }
    toString() {
        return this.text();
    }
}
exports.Chunk = Chunk;
