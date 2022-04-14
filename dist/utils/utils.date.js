"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unixTimestampToDate = exports.unixTimestampToMilliseconds = void 0;
const unixTimestampToMilliseconds = (timestamp) => {
    return timestamp * 1000;
};
exports.unixTimestampToMilliseconds = unixTimestampToMilliseconds;
const unixTimestampToDate = (timestamp) => {
    return new Date((0, exports.unixTimestampToMilliseconds)(timestamp));
};
exports.unixTimestampToDate = unixTimestampToDate;
//# sourceMappingURL=utils.date.js.map