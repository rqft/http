import { Collection } from "../../../Julian/dist/collection";
import { HTTPVerbs } from "../constants";
import { Endpoint } from "../endpoint";

export class Endpoints {
  [HTTPVerbs.GET] = new Collection<string, Endpoint>();
  [HTTPVerbs.POST] = new Collection<string, Endpoint>();
  [HTTPVerbs.PUT] = new Collection<string, Endpoint>();
  [HTTPVerbs.DELETE] = new Collection<string, Endpoint>();
  [HTTPVerbs.PATCH] = new Collection<string, Endpoint>();
  [HTTPVerbs.HEAD] = new Collection<string, Endpoint>();
  [HTTPVerbs.OPTIONS] = new Collection<string, Endpoint>();
  [HTTPVerbs.CONNECT] = new Collection<string, Endpoint>();
  [HTTPVerbs.TRACE] = new Collection<string, Endpoint>();
  [HTTPVerbs.ALL] = new Collection<string, Endpoint>();
}
