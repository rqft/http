import { BaseCollection as Collection } from "julian-utils";
import { HTTPVerbs } from "../constants";
import { Endpoint } from "../endpoint";
export class EndpointCollection<S extends boolean> extends Collection<
  string,
  Endpoint<string, S>
> {}
export class Endpoints<S extends boolean> {
  [HTTPVerbs.GET] = new EndpointCollection<S>();
  [HTTPVerbs.POST] = new EndpointCollection<S>();
  [HTTPVerbs.PUT] = new EndpointCollection<S>();
  [HTTPVerbs.DELETE] = new EndpointCollection<S>();
  [HTTPVerbs.PATCH] = new EndpointCollection<S>();
  [HTTPVerbs.HEAD] = new EndpointCollection<S>();
  [HTTPVerbs.OPTIONS] = new EndpointCollection<S>();
  [HTTPVerbs.CONNECT] = new EndpointCollection<S>();
  [HTTPVerbs.TRACE] = new EndpointCollection<S>();
  [HTTPVerbs.ALL] = new EndpointCollection<S>();

  [HTTPVerbs.COPY] = new EndpointCollection<S>();
  [HTTPVerbs.LINK] = new EndpointCollection<S>();
  [HTTPVerbs.UNLINK] = new EndpointCollection<S>();
  [HTTPVerbs.PURGE] = new EndpointCollection<S>();
  [HTTPVerbs.LOCK] = new EndpointCollection<S>();
  [HTTPVerbs.UNLOCK] = new EndpointCollection<S>();
  [HTTPVerbs.PROPFIND] = new EndpointCollection<S>();
  [HTTPVerbs.VIEW] = new EndpointCollection<S>();

  public get any() {
    const total = new EndpointCollection<S>();
    for (const verb in this) {
      if (
        this.hasOwnProperty(verb) &&
        Object.values(HTTPVerbs).includes(verb as HTTPVerbs)
      ) {
        const verbCollection = this[verb as HTTPVerbs];
        for (const [key, value] of verbCollection) {
          total.set(key, value);
        }
      }
    }

    return total;
  }
}
