"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeframe = exports.nowUnixTS = exports.FRAME_LOW_LIMIT = exports.FRAME_HIGH_LIMIT = exports.UNIX_WEEK = exports.UNIX_DAY = exports.UNIX_HOUR = exports.UNIX_MINUTE = exports.INVALID_DATE = exports.MILLISECONDS_IN_DAY = void 0;
const lodash_throttle_1 = __importDefault(require("lodash.throttle"));
const config_1 = __importDefault(require("../../config"));
exports.MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
exports.INVALID_DATE = new Date(NaN);
exports.UNIX_MINUTE = 60;
exports.UNIX_HOUR = 60 * exports.UNIX_MINUTE;
exports.UNIX_DAY = 24 * exports.UNIX_HOUR;
exports.UNIX_WEEK = 7 * exports.UNIX_DAY;
exports.FRAME_HIGH_LIMIT = exports.UNIX_DAY;
exports.FRAME_LOW_LIMIT = exports.UNIX_MINUTE * 5;
function nowUnixTS() {
    return Math.floor(Date.now() / 1000);
}
exports.nowUnixTS = nowUnixTS;
class Timeframe {
    constructor(zoomTarget, onZoom) {
        this.zoomTarget = zoomTarget;
        this.onZoom = onZoom;
        this.zoomevent = (0, lodash_throttle_1.default)((e) => this.zoom(e.zoom), config_1.default.zoom.throttle);
        this.zoomTarget.addEventListener('zoom', this.zoomevent);
    }
    save(timeframe) {
        this.timeframe = this.getValid(timeframe);
    }
    get() {
        const until = nowUnixTS();
        const since = until - this.timeframe;
        return { since, until };
    }
    destroy() {
        this.zoomTarget.removeEventListener('zoom', this.zoomevent);
    }
    getValid(timeframe) {
        if (!timeframe || this.tooBig(timeframe))
            return exports.FRAME_HIGH_LIMIT;
        if (this.tooSmall(timeframe))
            return exports.FRAME_LOW_LIMIT;
        return timeframe;
    }
    tooBig(timeframe) {
        return timeframe > exports.FRAME_HIGH_LIMIT;
    }
    tooSmall(timeframe) {
        return timeframe < exports.FRAME_LOW_LIMIT;
    }
    zoom(zoom) {
        const zommedFrame = Math.round(this.timeframe * (1 + zoom));
        this.save(zommedFrame);
        this.onZoom();
    }
}
exports.Timeframe = Timeframe;
//# sourceMappingURL=index.js.map