export class Chunk {
  public content: Buffer;
  constructor(content: Buffer | any) {
    // perf improvement
    if (content instanceof Buffer) {
      this.content = content;
    }

    this.content = Buffer.from(content);
  }

  private decoder: TextDecoder = new TextDecoder(undefined, { fatal: false });
  private encoder: TextEncoder = new TextEncoder();

  public text(): string {
    return this.decoder.decode(this.content);
  }

  public bytes(): Uint8Array {
    return this.encoder.encode(this.text());
  }

  public json(): any {
    return JSON.parse(this.text());
  }

  public buffer(): ArrayBuffer {
    return this.content.buffer;
  }

  [Symbol.iterator]() {
    return this.content[Symbol.iterator]();
  }

  public toString(): string {
    return this.text();
  }
}
