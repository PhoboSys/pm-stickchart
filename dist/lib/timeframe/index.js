"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeframe = exports.MIN_FRAME_DURATION = exports.MAX_FRAME_DURATION = exports.UNIX_DAY = exports.UNIX_HOUR = exports.UNIX_MINUTE = void 0;
const lodash_throttle_1 = __importDefault(require("lodash.throttle"));
const _events_1 = require("../../events/index.js");
const _config_1 = __importDefault(require("../../config.js"));
exports.UNIX_MINUTE = 60;
exports.UNIX_HOUR = 60 * exports.UNIX_MINUTE;
exports.UNIX_DAY = 24 * exports.UNIX_HOUR;
exports.MAX_FRAME_DURATION = exports.UNIX_DAY;
exports.MIN_FRAME_DURATION = 5 * exports.UNIX_MINUTE;
class Timeframe {
    constructor(eventTarget, onUpdate) {
        this.eventTarget = eventTarget;
        this.onUpdate = onUpdate;
        this._until = null;
        this._now = null;
        this._timeframe = exports.MAX_FRAME_DURATION;
        this.shifting = false;
        this.zoomevent = (0, lodash_throttle_1.default)((e) => this.zoom(e.zoom, e.shift, e.position, e.screen), _config_1.default.zoom.throttle, { trailing: false });
        this.pointerdown = (e) => this.shiftstart();
        this.pointermove = (0, lodash_throttle_1.default)((e) => this.shiftprogress(e.movementX, e.screen), _config_1.default.zoom.throttle, { trailing: false });
        this.pointerup = (e) => this.shiftend();
        this.eventTarget.addEventListener('zoom', this.zoomevent);
        this.eventTarget.addEventListener('pointerdown', this.pointerdown);
        this.eventTarget.addEventListener('pointermove', this.pointermove);
        this.eventTarget.addEventListener('pointerup', this.pointerup);
        this.eventTarget.addEventListener('timeframechanged', this.onUpdate);
        this.eventTarget.addEventListener('timeframeTonow', () => console.log('timeframeTonow'));
        this.eventTarget.addEventListener('timeframeUnnow', () => console.log('timeframeUnnow'));
    }
    get nowTS() {
        return this._now || Math.floor(Date.now() / 1000);
    }
    set nowTS(now) {
        this._now = now || null;
    }
    get timeframe() {
        return this._timeframe;
    }
    set timeframe(timeframe) {
        timeframe = timeframe || exports.MAX_FRAME_DURATION;
        timeframe = Math.min(timeframe, exports.MAX_FRAME_DURATION);
        timeframe = Math.max(timeframe, exports.MIN_FRAME_DURATION);
        const since = this.until - timeframe;
        if (since >= this.nowTS - exports.MAX_FRAME_DURATION) {
            this._timeframe = timeframe;
        }
    }
    get until() {
        if (this._until)
            return this._until;
        return this.untilmax(this.timeframe);
    }
    set until(until) {
        if (until < this.untilmax(this.timeframe)) {
            const since = until - this.timeframe;
            if (since >= this.nowTS - exports.MAX_FRAME_DURATION) {
                if (this._until === null)
                    this.eventTarget.dispatchEvent(new _events_1.TimeframeUnstickToNowEvent(this.get()));
                this._until = until;
            }
        }
        else {
            // null will always return current untilmax
            if (this._until !== null)
                this.eventTarget.dispatchEvent(new _events_1.TimeframeStickToNowEvent(this.get()));
            this._until = null;
        }
    }
    untilmax(timeframe) {
        return this.nowTS + timeframe * 0.382;
    }
    get since() {
        return this.until - this.timeframe;
    }
    save(timeframe) {
        this.timeframe = timeframe;
        return this;
    }
    now(now) {
        this.nowTS = now;
        return this;
    }
    get() {
        return { since: this.since, until: this.until };
    }
    destroy() {
        this.eventTarget.removeEventListener('zoom', this.zoomevent);
        this.eventTarget.removeEventListener('pointerdown', this.pointerdown);
        this.eventTarget.removeEventListener('pointermove', this.pointermove);
        this.eventTarget.removeEventListener('pointerup', this.pointerup);
        this.eventTarget.removeEventListener('timeframechanged', this.onUpdate);
        return this;
    }
    shiftend() {
        if (this.shifting)
            this.shifting = false;
    }
    shiftstart() {
        if (!this.shifting)
            this.shifting = true;
    }
    shiftprogress(shift, screen) {
        if (this.shifting && shift)
            this.shift(shift, screen);
    }
    shift(shift, screen) {
        const speed = 8;
        shift = shift / screen.width;
        const timeshift = Math.floor(this.timeframe * shift * speed);
        const until = this.until - timeshift;
        const since = until - this.timeframe;
        if (since >= this.nowTS - exports.MAX_FRAME_DURATION) {
            const prevuntil = this.until;
            this.until = until;
            if (this.until !== prevuntil) {
                this.eventTarget.dispatchEvent(new _events_1.TimeframeChangedEvent(this.get()));
            }
        }
    }
    zoom(zoom, shift, position, screen) {
        const timeframe = Math.round(this.timeframe * (1 + zoom));
        let until = this.until;
        const percent = 1 - position.x / screen.width;
        const diff = this.timeframe - timeframe;
        until = this.until - Math.ceil(diff * percent);
        until = Math.min(until, this.untilmax(timeframe));
        let since = until - timeframe;
        if (since < this.nowTS - exports.MAX_FRAME_DURATION) {
            until = this.since + timeframe;
            since = until - timeframe;
        }
        const speed = 8;
        shift = shift / screen.width;
        const timeshift = Math.floor(timeframe * shift * speed);
        until = until - timeshift;
        since = until - timeframe;
        if (timeframe < exports.MAX_FRAME_DURATION &&
            timeframe > exports.MIN_FRAME_DURATION &&
            until <= this.untilmax(timeframe) &&
            since >= this.nowTS - exports.MAX_FRAME_DURATION) {
            const prevuntil = this.until;
            const prevtimeframe = this.timeframe;
            this.timeframe = timeframe;
            this.until = until;
            if (this.timeframe !== prevuntil ||
                this.until !== prevuntil) {
                this.eventTarget.dispatchEvent(new _events_1.TimeframeChangedEvent(this.get()));
            }
        }
    }
}
exports.Timeframe = Timeframe;
//# sourceMappingURL=index.js.map