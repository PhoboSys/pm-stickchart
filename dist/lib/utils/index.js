"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderBy = exports.toUnixTS = exports.nowUnixTS = exports.unixTStoDate = exports.pick = exports.forEach = exports.mapValues = exports.isFunction = exports.isEmpty = void 0;
function isEmpty(value) {
    return value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0);
}
exports.isEmpty = isEmpty;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function mapValues(collection, visitor) {
    const result = {};
    if (isEmpty(collection))
        return result;
    let idx = 0;
    for (const key in collection) {
        const item = collection[key];
        result[key] = visitor(item, key, idx++);
    }
    return result;
}
exports.mapValues = mapValues;
function forEach(collection, visitor) {
    if (isEmpty(collection))
        return;
    let idx = 0;
    for (const key in collection) {
        const item = collection[key];
        visitor(item, key, idx++);
    }
}
exports.forEach = forEach;
function pick(collection, keys) {
    const result = {};
    if (isEmpty(collection))
        return result;
    for (const idx in keys) {
        const key = keys[idx];
        const item = collection[key];
        if (!isEmpty(item)) {
            result[key] = item;
        }
    }
    return result;
}
exports.pick = pick;
function unixTStoDate(timestamp) {
    return new Date(timestamp * 1000);
}
exports.unixTStoDate = unixTStoDate;
function nowUnixTS() {
    return Math.floor(Date.now() / 1000);
}
exports.nowUnixTS = nowUnixTS;
function toUnixTS(timestamp) {
    return Math.floor(timestamp / 1000);
}
exports.toUnixTS = toUnixTS;
function orderBy(collection, visitor, order = 'asc') {
    if (isEmpty(collection))
        return;
    const ordered = [];
    let idx = 0;
    for (const key in collection) {
        const item = collection[key];
        ordered.push([visitor(item, key, idx++), item]);
    }
    let apriority = 1;
    let bpriority = -1;
    if (order === 'desc') {
        apriority = -1;
        bpriority = 1;
    }
    ordered.sort((a, b) => {
        if (a[0] > b[0])
            return apriority;
        if (a[0] < b[0])
            return bpriority;
        return 0;
    });
    const result = [];
    for (const key in ordered) {
        result.push(ordered[key][1]);
    }
    return result;
}
exports.orderBy = orderBy;
//# sourceMappingURL=index.js.map