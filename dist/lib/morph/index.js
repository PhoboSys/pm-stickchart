"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = __importDefault(require("../../config.js"));
const pixi_1 = require("../pixi");
const _chartdata_1 = require("../../chartdata/index.js");
class MorphController {
    constructor(_onUpdate) {
        this._onUpdate = _onUpdate;
    }
    get isActive() {
        return !!this.anim;
    }
    perform(lastplot, currentplot) {
        if (!(lastplot && currentplot && _config_1.default.morph))
            return this._clear();
        if (!this._lastTarget)
            return this._performNew(lastplot, currentplot);
        return this._perform(currentplot);
    }
    _performNew(lastplot, currentplot) {
        const target = _chartdata_1.DataBuilder.getLatest(currentplot);
        const animated = _chartdata_1.DataBuilder.getLatest(lastplot);
        this
            ._kill()
            ._create({ animated, target }, _config_1.default.morph);
        this._lastTarget = target;
        return this;
    }
    _perform(currentplot) {
        const target = _chartdata_1.DataBuilder.getLatest(currentplot);
        const lastTarget = this._lastTarget;
        if (_chartdata_1.DataBuilder.isEqual(lastTarget, target))
            return this;
        this
            ._kill()
            ._create({ animated: Object.assign({}, lastTarget), target }, _config_1.default.morph);
        this._lastTarget = target;
        return this;
    }
    _create({ animated, target }, animConfig) {
        this.anim = pixi_1.gsap.to(animated, Object.assign(Object.assign(Object.assign({}, target), animConfig), { onUpdate: () => {
                if (!_chartdata_1.DataBuilder.isEqual(animated, target)) {
                    this._onUpdate(animated);
                }
            }, onInterrupt: () => {
                if (!this._lastTarget)
                    return;
                // completes last animation on kill
                // to avoid animation glitching
                this._onUpdate(target);
            }, onComplete: () => {
                // gsap has limited precision
                // in order to render exactly 'target'
                // we have to apply it in the end
                this._onUpdate(target);
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