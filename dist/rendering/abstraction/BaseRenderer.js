"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRenderer = void 0;
const _infra_1 = require("../../infra/index.js");
class BaseRenderer {
    constructor(storage) {
        this.storage = storage;
        this.local = {};
    }
    render(context, done) {
        const container = this.storage.get(this.rendererId);
        const newcontainer = this.update(context, container);
        if (newcontainer !== container) {
            this.storage.set(this.rendererId, newcontainer);
            this.local = {};
        }
        done();
    }
    clear(name) {
        var _a;
        if (name === undefined) {
            for (const key in this.local)
                this.clear(key);
        }
        else if (name in this.local) {
            _infra_1.Logger.info('clear', name);
            const [g, state] = this.local[name];
            g.destroy();
            (_a = state.timeline) === null || _a === void 0 ? void 0 : _a.kill();
            delete this.local[name];
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
        const stored = this.local[name];
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
        _infra_1.Logger.info('get new', name);
        this.local[name] = [create(), { new: true }, dependencies];
        return this.local[name];
    }
}
exports.BaseRenderer = BaseRenderer;
//# sourceMappingURL=BaseRenderer.js.map