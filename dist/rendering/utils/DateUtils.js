"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
class DateUtils {
    static unixTStoDate(timestamp) {
        return new Date(timestamp * 1000);
    }
    static unixTSNow() {
        return Date.now() / 1000;
    }
    static formatUnixTSToHHmm(timestamp) {
        const date = DateUtils.unixTStoDate(timestamp);
        const hh = date.getHours();
        const mm = date.getMinutes().toString().padStart(2, '0');
        return `${hh}:${mm}`;
    }
    static formatSecondsToMMSS(seconds) {
        const mm = Math.floor(seconds / 60);
        if (mm === 0)
            return seconds.toFixed(0);
        const ss = (seconds % 60).toFixed(0).padStart(2, '0');
        return `${mm}:${ss}`;
    }
}
exports.DateUtils = DateUtils;
//# sourceMappingURL=DateUtils.js.map