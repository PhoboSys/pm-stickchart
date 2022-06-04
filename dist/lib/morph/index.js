"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_1 = require("../pixi");
class MorphController {
    constructor(_isEqual, _onUpdate, config) {
        this._isEqual = _isEqual;
        this._onUpdate = _onUpdate;
        this.config = config;
    }
    get isActive() {
        return !!this.anim;
    }
    performNew(from, to) {
        if (!this.config)
            return this._clear();
        this
            ._kill()
            ._create({ from, to });
        this._lastTarget = to;
        return this;
    }
    perform(from, to) {
        if (!(from && to && this.config))
            return this._clear();
        if (!this._lastTarget)
            return this.performNew(from, to);
        return this._perform(to);
    }
    _perform(target) {
        const lastTarget = this._lastTarget;
        if (this._isEqual(lastTarget, target))
            return this;
        this
            ._kill()
            ._create({ from: lastTarget, to: target });
        this._lastTarget = target;
        return this;
    }
    _create({ from, to }) {
        this.anim = pixi_1.gsap.to(from, Object.assign(Object.assign(Object.assign({}, to), this.config), { onUpdate: () => {
                if (!this._isEqual(from, to)) {
                    this._onUpdate(from);
                }
            }, onInterrupt: () => {
                if (!this._lastTarget)
                    return;
                // completes last animation on kill
                // to avoid animation glitching
                this._onUpdate(to);
            }, onComplete: () => {
                // gsap has limited precision
                // in order to render exactly 'target'
                // we have to apply it in the end
                this._onUpdate(to);
                // to free memory and to allow StickChart.render
                this._kill();
            } }));
        return this;
    }
    _clear() {
        this._lastTarget = null;
        this._kill();
        return this;
    }
    _kill() {
        var _a;
        (_a = this.anim) === null || _a === void 0 ? void 0 : _a.kill();
        this.anim = null;
        return this;
    }
}
exports.default = MorphController;
//# sourceMappingURL=index.js.map