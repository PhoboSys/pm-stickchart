"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nowUnixTS = exports.UNIX_WEEK = exports.UNIX_DAY = exports.UNIX_HOUR = exports.UNIX_MINUTE = exports.INVALID_DATE = exports.MILLISECONDS_IN_DAY = void 0;
exports.MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
exports.INVALID_DATE = new Date(NaN);
exports.UNIX_MINUTE = 60;
exports.UNIX_HOUR = 60 * exports.UNIX_MINUTE;
exports.UNIX_DAY = 24 * exports.UNIX_HOUR;
exports.UNIX_WEEK = 7 * exports.UNIX_DAY;
function nowUnixTS() {
    return Math.floor(Date.now() / 1000);
}
exports.nowUnixTS = nowUnixTS;
//# sourceMappingURL=index.js.map