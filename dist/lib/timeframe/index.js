"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeframe = exports.nowUnixTS = exports.MAX_EXPAND_RATION = exports.MIN_FRAME_DURATION = exports.MAX_FRAME_DURATION = exports.UNIX_WEEK = exports.UNIX_DAY = exports.UNIX_HOUR = exports.UNIX_MINUTE = exports.INVALID_DATE = exports.MILLISECONDS_IN_DAY = void 0;
const lodash_throttle_1 = __importDefault(require("lodash.throttle"));
const _config_1 = __importDefault(require("../../config.js"));
exports.MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
exports.INVALID_DATE = new Date(NaN);
exports.UNIX_MINUTE = 60;
exports.UNIX_HOUR = 60 * exports.UNIX_MINUTE;
exports.UNIX_DAY = 24 * exports.UNIX_HOUR;
exports.UNIX_WEEK = 7 * exports.UNIX_DAY;
exports.MAX_FRAME_DURATION = exports.UNIX_DAY;
exports.MIN_FRAME_DURATION = 5 * exports.UNIX_MINUTE;
exports.MAX_EXPAND_RATION = 3;
function nowUnixTS() {
    return Math.floor(Date.now() / 1000);
}
exports.nowUnixTS = nowUnixTS;
class Timeframe {
    constructor(zoomTarget, onZoom) {
        this.zoomTarget = zoomTarget;
        this.onZoom = onZoom;
        this._timerfamePreffered = exports.UNIX_DAY;
        this.since = nowUnixTS() - exports.UNIX_DAY;
        this.zoomevent = (0, lodash_throttle_1.default)((e) => this.zoom(e.zoom), _config_1.default.zoom.throttle, { trailing: false });
        this.zoomTarget.addEventListener('zoom', this.zoomevent);
    }
    save(timeframe) {
        timeframe = this.getValid(timeframe);
        this.since = nowUnixTS() - timeframe;
        this._timerfamePreffered = timeframe;
        return this;
    }
    get() {
        return { since: this.since, until: nowUnixTS() };
    }
    destroy() {
        this.zoomTarget.removeEventListener('zoom', this.zoomevent);
    }
    actualize() {
        const timeframeNow = nowUnixTS() - this.since;
        const timeframeMax = this.getValid(this._timerfamePreffered * exports.MAX_EXPAND_RATION);
        if (timeframeNow > timeframeMax) {
            this.since = nowUnixTS() - this._timerfamePreffered;
        }
        return this;
    }
    getValid(timeframe) {
        if (this.tooBig(timeframe))
            return exports.MAX_FRAME_DURATION;
        if (this.tooSmall(timeframe))
            return exports.MIN_FRAME_DURATION;
        return timeframe;
    }
    tooBig(timeframe) {
        return timeframe > exports.MAX_FRAME_DURATION;
    }
    tooSmall(timeframe) {
        return timeframe < exports.MIN_FRAME_DURATION;
    }
    zoom(zoom) {
        const now = nowUnixTS();
        let timeframe = now - this.since;
        timeframe += Math.round(timeframe * zoom);
        timeframe = this.getValid(timeframe);
        this.since = now - timeframe;
        this._timerfamePreffered = timeframe;
        this.onZoom();
    }
}
exports.Timeframe = Timeframe;
//# sourceMappingURL=index.js.map