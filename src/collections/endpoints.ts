import { BaseCollection as Collection } from "julian-utils";
import { HTTPVerbs } from "../constants";
import { Endpoint } from "../endpoint";
export class EndpointCollection extends Collection<string, Endpoint<string>> {}
export class Endpoints {
  [HTTPVerbs.GET] = new EndpointCollection();
  [HTTPVerbs.POST] = new EndpointCollection();
  [HTTPVerbs.PUT] = new EndpointCollection();
  [HTTPVerbs.DELETE] = new EndpointCollection();
  [HTTPVerbs.PATCH] = new EndpointCollection();
  [HTTPVerbs.HEAD] = new EndpointCollection();
  [HTTPVerbs.OPTIONS] = new EndpointCollection();
  [HTTPVerbs.CONNECT] = new EndpointCollection();
  [HTTPVerbs.TRACE] = new EndpointCollection();
  [HTTPVerbs.ALL] = new EndpointCollection();

  [HTTPVerbs.COPY] = new EndpointCollection();
  [HTTPVerbs.LINK] = new EndpointCollection();
  [HTTPVerbs.UNLINK] = new EndpointCollection();
  [HTTPVerbs.PURGE] = new EndpointCollection();
  [HTTPVerbs.LOCK] = new EndpointCollection();
  [HTTPVerbs.UNLOCK] = new EndpointCollection();
  [HTTPVerbs.PROPFIND] = new EndpointCollection();
  [HTTPVerbs.VIEW] = new EndpointCollection();

  public get any() {
    const total = new EndpointCollection();
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
