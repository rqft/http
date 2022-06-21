import { IncomingMessage } from "http";
import { Collection } from "../../Julian/dist/collection";
import { HTTPHeaders } from "./constants";
import { CustomHTTPHeaders, HeaderValue } from "./types";

export class Input {
  public data: IncomingMessage;
  constructor(data: IncomingMessage) {
    this.data = data || new IncomingMessage(null as never);
  }

  public get headers(): Collection<
    HTTPHeaders | CustomHTTPHeaders | `${HTTPHeaders}`,
    Exclude<HeaderValue, number> | undefined
  > {
    return new Collection(
      Object.entries(this.data.headers) as Array<[HTTPHeaders, any]>
    );
  }

  public get url(): URL {
    return new URL(this.data.url || "/", `http://${this.headers.get("host")}`);
  }
}
