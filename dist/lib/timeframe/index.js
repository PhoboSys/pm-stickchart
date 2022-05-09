"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeframe = exports.nowUnixTS = exports.UNIX_WEEK = exports.UNIX_DAY = exports.UNIX_HOUR = exports.UNIX_MINUTE = exports.INVALID_DATE = exports.MILLISECONDS_IN_DAY = void 0;
const lodash_throttle_1 = __importDefault(require("lodash.throttle"));
const config_1 = __importDefault(require("../../config"));
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
class Timeframe {
    constructor(zoomTarget, onZoom) {
        this.zoomTarget = zoomTarget;
        this.onZoom = onZoom;
        this.since = nowUnixTS() - exports.UNIX_DAY;
        this.zoomevent = (0, lodash_throttle_1.default)((e) => this.zoom(e.zoom), config_1.default.zoom.throttle);
        this.zoomTarget.addEventListener('zoom', this.zoomevent);
    }
    save(timeframe) {
        if (!this.validate(timeframe))
            timeframe = exports.UNIX_DAY;
        this.since = nowUnixTS() - timeframe;
    }
    get() {
        return { since: this.since, until: nowUnixTS() };
    }
    destroy() {
        this.zoomTarget.removeEventListener('zoom', this.zoomevent);
    }
    validate(timeframe) {
        return (timeframe &&
            !this.tooBig(timeframe) &&
            !this.tooSmall(timeframe));
    }
    tooBig(timeframe) {
        return timeframe > exports.UNIX_DAY;
    }
    tooSmall(timeframe) {
        return timeframe < exports.UNIX_MINUTE * 10;
    }
    zoom(zoom) {
        const now = nowUnixTS();
        let timeframe = now - this.since;
        timeframe += Math.round(timeframe * zoom);
        const zoominUp = zoom > 0;
        const zoominDown = zoom < 0;
        const hitLower = this.tooSmall(timeframe) && zoominDown;
        const hitUpper = this.tooBig(timeframe) && zoominUp;
        if (!hitLower && !hitUpper) {
            this.since = now - timeframe;
            this.onZoom();
        }
    }
}
exports.Timeframe = Timeframe;
//# sourceMappingURL=index.js.map