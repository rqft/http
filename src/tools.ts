import { Removal } from "./types";

// sleep that actually blocks event loop
export function sleep(u: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, u);
  return;
}

export function clear<T extends Array<any> = [], U = never>(
  arr: T,
  item: U
): Removal<T, U> {
  while (arr.includes(item)) {
    arr.splice(arr.indexOf(item), 1);
  }

  return arr as never;
}
