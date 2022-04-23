"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
class DateUtils {
    static unixTStoDate(timestamp) {
        return new Date(timestamp * 1000);
    }
    static formatUnixTSToHHmm(timestamp) {
        const date = DateUtils.unixTStoDate(timestamp);
        const hh = date.getHours();
        const mm = date.getMinutes().toString().padStart(2, '0');
        return `${hh}:${mm}`;
    }
}
exports.DateUtils = DateUtils;
//# sourceMappingURL=DateUtils.js.map