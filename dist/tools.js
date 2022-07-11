"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = exports.sleep = void 0;
function sleep(u) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, u);
    return;
}
exports.sleep = sleep;
function clear(arr, item) {
    while (arr.includes(item)) {
        arr.splice(arr.indexOf(item), 1);
    }
    return arr;
}
exports.clear = clear;
