"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeframe = exports.nowUnixTS = exports.MAX_EXPAND_RATION = exports.MIN_FRAME_DURATION = exports.MAX_FRAME_DURATION = exports.UNIX_WEEK = exports.UNIX_DAY = exports.UNIX_HOUR = exports.UNIX_MINUTE = exports.INVALID_DATE = exports.MILLISECONDS_IN_DAY = void 0;
const lodash_throttle_1 = __importDefault(require("lodash.throttle"));
const _config_1 = __importDefault(require("../../config.js"));
const utils_1 = require("../utils");
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
        this._timerfamePreffered = exports.UNIX_DAY;
        this._since = null;
        this._until = null;
        this.shiftStartingPoint = null;
        this.zoomevent = (0, lodash_throttle_1.default)((e) => this.zoom(e.zoom), _config_1.default.zoom.throttle, { trailing: false });
        this.pointerdown = (e) => this.shiftstart(e.position);
        this.pointermove = (0, lodash_throttle_1.default)((e) => this.shiftprogress(e.position, e), _config_1.default.zoom.throttle, { trailing: false });
        this.pointerup = (e) => this.shiftend(e.position);
        this.eventTarget.addEventListener('zoom', this.zoomevent);
        this.eventTarget.addEventListener('pointerdown', this.pointerdown);
        this.eventTarget.addEventListener('pointermove', this.pointermove);
        this.eventTarget.addEventListener('pointerup', this.pointerup);
    }
    set since(since) {
        let timeframe = this.until - since;
        timeframe = Math.min(timeframe, exports.MAX_FRAME_DURATION);
        timeframe = Math.max(timeframe, exports.MIN_FRAME_DURATION);
        since = this.until - timeframe;
        if (since > this.sincemin()) {
            this._since = since;
        }
        else {
            // null will always return current sincemin
            this._since = null;
        }
    }
    set until(until) {
        let timeframe = until - this.since;
        timeframe = Math.min(timeframe, exports.MAX_FRAME_DURATION);
        timeframe = Math.max(timeframe, exports.MIN_FRAME_DURATION);
        until = this.since + timeframe;
        if (until < this.untilmax()) {
            this._until = until;
        }
        else {
            // null will always return current untilmax
            this._until = null;
        }
    }
    untilmax() {
        const now = nowUnixTS();
        const timeframe = now - this.since;
        return Math.floor(now + timeframe * 0.36);
    }
    sincemin() {
        return nowUnixTS() - exports.UNIX_DAY;
    }
    get since() {
        if (this._since)
            return this._since;
        return this.sincemin();
    }
    get until() {
        if (this._until)
            return this._until;
        return this.untilmax();
    }
    shiftstart(position) {
        if ((0, utils_1.isEmpty)(this.shiftStartingPoint) && !(0, utils_1.isEmpty)(position)) {
            this.shiftStartingPoint = position;
        }
    }
    shiftprogress(position, e) {
        if (!(0, utils_1.isEmpty)(this.shiftStartingPoint) && !(0, utils_1.isEmpty)(position)) {
            this.shift(Math.floor(position.x - this.shiftStartingPoint.x), e);
            this.shiftStartingPoint = position;
        }
    }
    shiftend(position) {
        if (!(0, utils_1.isEmpty)(this.shiftStartingPoint) && !(0, utils_1.isEmpty)(position)) {
            this.shiftStartingPoint = null;
        }
    }
    save(timeframe) {
        this.since = this.until - timeframe;
        this._timerfamePreffered = this.until - this.since;
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
    }
    actualize() {
        // debugger
        // const timeframeNow = this.until - this.since
        // const timeframeMax = this._timerfamePreffered * MAX_EXPAND_RATION
        // if (timeframeNow > timeframeMax) {
        //     this.since = this.until - this._timerfamePreffered
        // }
        return this;
    }
    shift(shift, e) {
        const timeframe = this.since - this.until;
        shift = Math.floor(timeframe * shift / 300);
        const since = this.since + shift;
        const until = this.until + shift;
        if (since >= this.sincemin() &&
            until <= this.untilmax()) {
            this.since = since;
            this.until = until;
            this.onUpdate();
        }
    }
    zoom(zoom) {
        let timeframe = this.until - this.since;
        timeframe = Math.round(timeframe * (1 + zoom));
        const since = this.until - timeframe;
        if (since >= this.sincemin()) {
            this.since = since;
            this._timerfamePreffered = timeframe;
            this.onUpdate();
        }
    }
}
exports.Timeframe = Timeframe;
//# sourceMappingURL=index.js.map