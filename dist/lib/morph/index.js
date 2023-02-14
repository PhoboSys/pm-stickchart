"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _MorphController_instances, _MorphController_timeline, _MorphController_perform, _MorphController_add;
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = __importDefault(require("../../config.js"));
const pixi_1 = require("../pixi");
class MorphController {
    // private _lastTarget: PricePoint | null
    constructor(_onUpdate) {
        this._onUpdate = _onUpdate;
        _MorphController_instances.add(this);
        _MorphController_timeline.set(this, pixi_1.gsap.timeline()
        // private _lastTarget: PricePoint | null
        );
    }
    get isActive() {
        return __classPrivateFieldGet(this, _MorphController_timeline, "f").isActive();
    }
    morph(previous, current) {
        if (!previous || !current || !_config_1.default.morph)
            return;
        __classPrivateFieldGet(this, _MorphController_instances, "m", _MorphController_perform).call(this, previous, current);
    }
}
exports.default = MorphController;
_MorphController_timeline = new WeakMap(), _MorphController_instances = new WeakSet(), _MorphController_perform = function _MorphController_perform(previous, current) {
    // 0. Make sure to complite running animation and clear timeline
    if (this.isActive)
        __classPrivateFieldGet(this, _MorphController_timeline, "f").progress(1);
    __classPrivateFieldGet(this, _MorphController_timeline, "f").clear();
    // 1. Find all points that was added from previous to current
    const frontdiff = [];
    const pts = previous.timestamps[previous.timestamps.length - 1];
    let cidx = current.timestamps.length;
    let intersect = false;
    while (!intersect && cidx-- && pts) {
        const cts = current.timestamps[cidx];
        intersect = cts === pts;
        frontdiff.unshift(cidx);
    }
    // 2. If any intersaction found animate all points
    if (intersect) {
        let animations = 0;
        let prevpoint = null;
        for (const idx of frontdiff) {
            const target = {
                timestamp: current.timestamps[idx],
                value: current.prices[idx],
            };
            if (prevpoint) {
                __classPrivateFieldGet(this, _MorphController_instances, "m", _MorphController_add).call(this, prevpoint, target, current, idx);
                animations++;
            }
            prevpoint = target;
        }
        // 3. Do nothing if there is not difference
        if (animations === 0)
            return;
        // 4. Removing points form current chart data
        // in order to add them back animated via timeline
        current.timestamps.splice(-animations);
        current.prices.splice(-animations);
        if (animations > _config_1.default.morph.maxstack) {
            // 5. Clear if we need to go over move than config.morph.maxstack animations
            __classPrivateFieldGet(this, _MorphController_timeline, "f").progress(1);
            __classPrivateFieldGet(this, _MorphController_timeline, "f").clear();
        }
        else {
            // 6. Speedup animation to make all timeline finish in config.morph.duration
            __classPrivateFieldGet(this, _MorphController_timeline, "f").timeScale(animations);
        }
    }
}, _MorphController_add = function _MorphController_add(animated, end, current, idx) {
    __classPrivateFieldGet(this, _MorphController_timeline, "f").to(animated, Object.assign(Object.assign(Object.assign({}, end), _config_1.default.morph), { onUpdate: () => {
            current.timestamps[idx] = animated.timestamp;
            current.prices[idx] = animated.value;
            this._onUpdate();
        }, onComplete: () => {
            // gsap has limited precision
            // in order to render exactly 'end'
            // we have to apply it explicitly
            current.timestamps[idx] = end.timestamp;
            current.prices[idx] = end.value;
            this._onUpdate();
        } }));
};
//# sourceMappingURL=index.js.map