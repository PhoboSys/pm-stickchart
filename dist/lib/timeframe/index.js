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
    constructor(eventTarget, onUpdate) {
        this.eventTarget = eventTarget;
        this.onUpdate = onUpdate;
        this._until = null;
        this._timeframe = exports.MAX_FRAME_DURATION;
        this.shifting = false;
        this.zoomevent = (0, lodash_throttle_1.default)((e) => this.zoom(e.zoom, e.position, e.screen), _config_1.default.zoom.throttle, { trailing: false });
        this.pointerdown = (e) => this.shiftstart();
        this.pointermove = (0, lodash_throttle_1.default)((e) => this.shiftprogress(e.movementX), _config_1.default.zoom.throttle, { trailing: false });
        this.pointerup = (e) => this.shiftend();
        this.eventTarget.addEventListener('zoom', this.zoomevent);
        this.eventTarget.addEventListener('pointerdown', this.pointerdown);
        this.eventTarget.addEventListener('pointermove', this.pointermove);
        this.eventTarget.addEventListener('pointerup', this.pointerup);
    }
    get timeframe() {
        return this._timeframe;
    }
    set timeframe(timeframe) {
        timeframe = timeframe || exports.MAX_FRAME_DURATION;
        timeframe = Math.min(timeframe, exports.MAX_FRAME_DURATION);
        timeframe = Math.max(timeframe, exports.MIN_FRAME_DURATION);
        this._timeframe = timeframe;
    }
    get until() {
        if (this._until)
            return this._until;
        return this.untilmax(this.timeframe);
    }
    set until(until) {
        if (until < this.untilmax(this.timeframe)) {
            this._until = until;
        }
        else {
            // null will always return current untilmax
            this._until = null;
        }
    }
    untilmax(timeframe) {
        return Math.floor(nowUnixTS() + timeframe * 0.382);
    }
    get since() {
        return this.until - this.timeframe;
    }
    shiftstart() {
        if (!this.shifting)
            this.shifting = true;
    }
    shiftprogress(shift) {
        if (this.shifting && shift)
            this.shift(shift);
    }
    shiftend() {
        if (this.shifting)
            this.shifting = false;
    }
    save(timeframe) {
        this.timeframe = timeframe;
    }
    get() {
        console.log('this._until', this._until);
        return { since: this.since, until: this.until };
    }
    destroy() {
        this.eventTarget.removeEventListener('zoom', this.zoomevent);
        this.eventTarget.removeEventListener('pointerdown', this.pointerdown);
        this.eventTarget.removeEventListener('pointermove', this.pointermove);
        this.eventTarget.removeEventListener('pointerup', this.pointerup);
    }
    shift(shift) {
        const timeshift = Math.floor(this.timeframe * shift / 100);
        let until = this.until - timeshift;
        until = Math.min(until, this.untilmax(this.timeframe));
        const since = until - this.timeframe;
        if (until <= this.untilmax(this.timeframe) &&
            since >= nowUnixTS() - exports.MAX_FRAME_DURATION) {
            this.until = until;
            this.onUpdate();
        }
    }
    zoom(zoom, position, screen) {
        const timeframe = Math.round(this.timeframe * (1 + zoom));
        let until = this.until;
        const percent = 1 - position.x / screen.width;
        const diff = this.timeframe - timeframe;
        until = this.until - Math.floor(diff * percent);
        until = Math.min(until, this.untilmax(timeframe));
        let since = until - timeframe;
        if (since < nowUnixTS() - exports.MAX_FRAME_DURATION) {
            until = this.since + timeframe;
            since = until - timeframe;
        }
        if (timeframe < exports.MAX_FRAME_DURATION &&
            timeframe > exports.MIN_FRAME_DURATION &&
            until <= this.untilmax(timeframe) &&
            since >= nowUnixTS() - exports.MAX_FRAME_DURATION) {
            this.timeframe = timeframe;
            this.until = until;
            this.onUpdate();
        }
    }
}
exports.Timeframe = Timeframe;
//# sourceMappingURL=index.js.map