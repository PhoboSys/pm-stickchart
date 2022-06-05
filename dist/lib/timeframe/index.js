"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeframe = exports.nowUnixTS = exports.SHRINK_RATE = exports.MIN_FRAME_DURATION = exports.MAX_FRAME_DURATION = exports.UNIX_WEEK = exports.UNIX_DAY = exports.UNIX_HOUR = exports.UNIX_MINUTE = exports.INVALID_DATE = exports.MILLISECONDS_IN_DAY = void 0;
const lodash_throttle_1 = __importDefault(require("lodash.throttle"));
const config_1 = __importDefault(require("../../config"));
const morph_1 = __importDefault(require("../morph"));
exports.MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
exports.INVALID_DATE = new Date(NaN);
exports.UNIX_MINUTE = 60;
exports.UNIX_HOUR = 60 * exports.UNIX_MINUTE;
exports.UNIX_DAY = 24 * exports.UNIX_HOUR;
exports.UNIX_WEEK = 7 * exports.UNIX_DAY;
exports.MAX_FRAME_DURATION = exports.UNIX_DAY;
exports.MIN_FRAME_DURATION = 5 * exports.UNIX_MINUTE;
exports.SHRINK_RATE = 3;
function nowUnixTS() {
    return Math.floor(Date.now() / 1000);
}
exports.nowUnixTS = nowUnixTS;
class Timeframe {
    constructor(zoomTarget, _update) {
        this.zoomTarget = zoomTarget;
        this._update = _update;
        this.lastDuration = exports.UNIX_DAY;
        this.since = nowUnixTS() - exports.UNIX_DAY;
        this.zoomevent = (0, lodash_throttle_1.default)((e) => this.zoom(e.zoom), config_1.default.zoom.throttle);
        this.zoomTarget.addEventListener('zoom', this.zoomevent);
        this._morphController = new morph_1.default((v1, v2) => v1.value === v2.value, ({ value }) => {
            this.since = value;
            _update();
        }, config_1.default.morph);
    }
    save(timeframe) {
        timeframe = this.getValid(timeframe);
        this.since = nowUnixTS() - timeframe;
        this.lastDuration = timeframe;
        return this;
    }
    get() {
        return { since: this.since, until: nowUnixTS() };
    }
    destroy() {
        this.zoomTarget.removeEventListener('zoom', this.zoomevent);
    }
    actualize() {
        const currentDuration = (nowUnixTS() - this.since);
        const maxDuration = this.getValid(this.lastDuration * exports.SHRINK_RATE);
        if (currentDuration < maxDuration)
            return this;
        const from = { value: this.since };
        const to = { value: nowUnixTS() - this.lastDuration };
        this._morphController.performNew(from, to);
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
        let duration = now - this.since;
        duration += Math.round(duration * zoom);
        const vduration = this.getValid(duration);
        this.since = now - vduration;
        this.lastDuration = vduration;
        if (duration === vduration)
            this._update();
    }
}
exports.Timeframe = Timeframe;
//# sourceMappingURL=index.js.map