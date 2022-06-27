// sleep that actually blocks event loop
export function sleep(u: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, u);
  return;
}
