"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRenderer = void 0;
const infra_1 = require("../../infra");
class BaseRenderer {
    constructor(storage) {
        this.storage = storage;
        this._local = {};
    }
    render(context, done) {
        const container = this.storage.get(this.rendererId);
        const newcontainer = this._update(context, container);
        if (newcontainer !== container) {
            this.storage.set(this.rendererId, newcontainer);
            this._local = {};
        }
        this._renderMode = context.renderMode;
        done();
    }
    _update(context, container) {
        var _a, _b;
        const hasModeChanged = (_a = this._renderMode) === null || _a === void 0 ? void 0 : _a.isEqual(context.renderMode);
        if (hasModeChanged)
            (_b = this.onSetRenderMod) === null || _b === void 0 ? void 0 : _b.call(this, context, container);
        return context.renderMode.when({
            MOBILE: () => {
                var _a, _b, _c;
                if (hasModeChanged) {
                    (_a = this.onSetMobileRenderMod) === null || _a === void 0 ? void 0 : _a.call(this, context, container);
                }
                return (_c = (_b = this.updateMobile) === null || _b === void 0 ? void 0 : _b.call(this, context, container)) !== null && _c !== void 0 ? _c : this.update(context, container);
            },
            NORMAL: () => {
                var _a;
                if (hasModeChanged) {
                    (_a = this.onSetNormalRenderMod) === null || _a === void 0 ? void 0 : _a.call(this, context, container);
                }
                return this.update(context, container);
            },
        });
    }
    clear(name) {
        var _a;
        if (name === undefined) {
            for (const key in this._local)
                this.clear(key);
        }
        else if (name in this._local) {
            infra_1.Logger.info('clear', name);
            const [g, state] = this._local[name];
            g.destroy();
            (_a = state.timeline) === null || _a === void 0 ? void 0 : _a.kill();
            delete this._local[name];
        }
    }
    isEqual(deps1, deps2) {
        if (deps1.length !== deps2.length)
            return false;
        for (const idx in deps1) {
            const dep1 = deps1[idx];
            const dep2 = deps2[idx];
            if (dep1 !== dep2)
                return false;
        }
        return true;
    }
    get(name, create, dependencies = []) {
        const stored = this._local[name];
        if (stored) {
            const [g, state, deps] = stored;
            if (this.isEqual(deps, dependencies)) {
                state.new = false;
                return [g, state];
            }
            else {
                this.clear(name);
            }
        }
        infra_1.Logger.info('get new', name);
        this._local[name] = [create(), { new: true }, dependencies];
        return this._local[name];
    }
}
exports.BaseRenderer = BaseRenderer;
//# sourceMappingURL=BaseRenderer.js.map