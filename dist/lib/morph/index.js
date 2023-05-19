"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _MorphController_instances, _MorphController_timeline, _MorphController_active, _MorphController_perform, _MorphController_add;
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = __importDefault(require("../../config.js"));
const pixi_1 = require("../pixi");
class MorphController {
    constructor(_onUpdate) {
        this._onUpdate = _onUpdate;
        _MorphController_instances.add(this);
        _MorphController_timeline.set(this, void 0);
        _MorphController_active.set(this, void 0);
        __classPrivateFieldSet(this, _MorphController_timeline, pixi_1.gsap.timeline(), "f");
        __classPrivateFieldSet(this, _MorphController_active, { timestamps: [], prices: [] }, "f");
    }
    get isActive() {
        return __classPrivateFieldGet(this, _MorphController_timeline, "f").isActive();
    }
    morph(previous, next) {
        if (!previous || !next || !_config_1.default.morph)
            return;
        __classPrivateFieldGet(this, _MorphController_instances, "m", _MorphController_perform).call(this, previous, next);
    }
}
exports.default = MorphController;
_MorphController_timeline = new WeakMap(), _MorphController_active = new WeakMap(), _MorphController_instances = new WeakSet(), _MorphController_perform = function _MorphController_perform(previous, next) {
    // TODO: implement morph of some intermidiate data and not chartdata itself
    // in order to be able to detect and add new animations during active animation
    // for not we going to keep active points in memory to compare with next chartdata
    // 1. Find all points that was added from previous to next
    const frontdiff = [];
    const pts = previous.timestamps[previous.timestamps.length - 1];
    const ats = __classPrivateFieldGet(this, _MorphController_active, "f").timestamps[__classPrivateFieldGet(this, _MorphController_active, "f").timestamps.length - 1];
    let cidx = next.timestamps.length;
    let intersect = false;
    while (!intersect && cidx-- && pts) {
        const nts = next.timestamps[cidx];
        intersect = nts === pts || this.isActive && nts === ats;
        frontdiff.unshift(cidx);
    }
    // 2. If any intersaction found animate all points
    if (intersect) {
        const animations = new Array();
        let prevpoint = null;
        for (const idx of frontdiff) {
            const target = {
                timestamp: next.timestamps[idx],
                value: next.prices[idx],
            };
            if (prevpoint) {
                animations.push(__classPrivateFieldGet(this, _MorphController_instances, "m", _MorphController_add).bind(this, prevpoint, target, next, idx));
            }
            prevpoint = target;
        }
        // 3. Check animations to be in valid range
        if (animations.length <= _config_1.default.morph.maxstack &&
            animations.length > 0) {
            // 4. Make sure to complite running animation and clear timeline
            if (this.isActive)
                __classPrivateFieldGet(this, _MorphController_timeline, "f").progress(1);
            __classPrivateFieldGet(this, _MorphController_timeline, "f").clear();
            // 5. Removing points form next chart data
            // in order to add them back animated via timeline
            const timestamps = next.timestamps.splice(-animations.length);
            const prices = next.prices.splice(-animations.length);
            __classPrivateFieldSet(this, _MorphController_active, { timestamps, prices }, "f");
            // 6. Execute animations
            for (const animation of animations)
                animation();
            // 7. Speedup animation to make all timeline finish in config.morph.duration
            __classPrivateFieldGet(this, _MorphController_timeline, "f").timeScale(animations.length);
        }
        else if (this.isActive) {
            // 8. Have to revert changes in order to make amination finish
            next.timestamps = previous.timestamps;
            next.prices = previous.prices;
        }
    }
    else {
        // 8. Clear and reperform default update/render
        if (this.isActive)
            __classPrivateFieldGet(this, _MorphController_timeline, "f").progress(1);
        __classPrivateFieldGet(this, _MorphController_timeline, "f").clear();
        this._onUpdate();
    }
}, _MorphController_add = function _MorphController_add(animated, end, next, idx) {
    __classPrivateFieldGet(this, _MorphController_timeline, "f").to(animated, Object.assign(Object.assign(Object.assign({}, end), _config_1.default.morph.animation), { onUpdate: () => {
            next.timestamps[idx] = animated.timestamp;
            next.prices[idx] = animated.value;
            this._onUpdate();
        }, onComplete: () => {
            // gsap has limited precision
            // in order to render exactly 'end'
            // we have to apply it explicitly
            next.timestamps[idx] = end.timestamp;
            next.prices[idx] = end.value;
            this._onUpdate();
        } }));
};
//# sourceMappingURL=index.js.map