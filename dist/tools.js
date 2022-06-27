"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
function sleep(u) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, u);
    return;
}
exports.sleep = sleep;
