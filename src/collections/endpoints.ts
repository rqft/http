import { BaseCollection as Collection } from "julian-utils";
import { HTTPVerbs } from "../constants";
import { Endpoint } from "../endpoint";

export class Endpoints {
  [HTTPVerbs.GET] = new Collection<string, Endpoint<string>>();
  [HTTPVerbs.POST] = new Collection<string, Endpoint<string>>();
  [HTTPVerbs.PUT] = new Collection<string, Endpoint<string>>();
  [HTTPVerbs.DELETE] = new Collection<string, Endpoint<string>>();
  [HTTPVerbs.PATCH] = new Collection<string, Endpoint<string>>();
  [HTTPVerbs.HEAD] = new Collection<string, Endpoint<string>>();
  [HTTPVerbs.OPTIONS] = new Collection<string, Endpoint<string>>();
  [HTTPVerbs.CONNECT] = new Collection<string, Endpoint<string>>();
  [HTTPVerbs.TRACE] = new Collection<string, Endpoint<string>>();
  [HTTPVerbs.ALL] = new Collection<string, Endpoint<string>>();
  public get any() {
    const total = new Collection<string, Endpoint<string>>();
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
