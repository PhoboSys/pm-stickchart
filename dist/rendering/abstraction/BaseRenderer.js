"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRenderer = void 0;
const infra_1 = require("../../infra");
const pixi_1 = require("../../lib/pixi");
const utils_1 = require("../../lib/utils");
class BaseRenderer {
    constructor(storage) {
        this.storage = storage;
        this.local = {};
        this.stateprefix = '';
    }
    get animations() { return {}; }
    render(context, done) {
        const container = this.storage.get(this.rendererId);
        const newcontainer = this.update(context, container);
        if (newcontainer !== container) {
            this.storage.set(this.rendererId, newcontainer);
            this.local = {};
        }
        done();
    }
    rebind(...path) {
        this.stateprefix = (path || []).join('>');
    }
    clear(name) {
        var _a;
        if (name === undefined) {
            for (const key in this.local) {
                if (key.indexOf(this.stateprefix) === 0) {
                    this.clear(key.substr(this.stateprefix.length));
                }
            }
        }
        else {
            name = this.stateprefix + name;
            if (name in this.local) {
                infra_1.Logger.info('clear', name);
                const [g, state] = this.local[name];
                g.destroy();
                (_a = state.timeline) === null || _a === void 0 ? void 0 : _a.kill();
                delete this.local[name];
            }
        }
    }
    get(name, create, dependencies = []) {
        const bindname = this.stateprefix + name;
        const stored = this.local[bindname];
        if (stored) {
            const [g, state, deps] = stored;
            if (this.isEqual(deps, dependencies)) {
                state.new = false;
                return [g, state, dependencies];
            }
            else {
                this.clear(name);
            }
        }
        infra_1.Logger.info('get new', bindname);
        this.local[bindname] = [create(), { new: true }, dependencies];
        return this.local[bindname];
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
    animate(name, animation, method = 'to') {
        var _a;
        const config = this.animations[animation];
        if (!config)
            return;
        const bindname = this.stateprefix + name;
        const got = this.local[bindname];
        if (!got)
            return;
        const [target, state] = got;
        if (state.animation !== animation) {
            state.animation = animation;
            if (config.clear)
                (_a = state.timeline) === null || _a === void 0 ? void 0 : _a.clear();
            state.timeline = state.timeline || pixi_1.gsap.timeline();
            if ((0, utils_1.isFunction)(state.timeline[method]))
                state.timeline[method](target, Object.assign({}, config));
            else
                infra_1.Logger.warn('amination method "%s" unknown', method);
        }
    }
}
exports.BaseRenderer = BaseRenderer;
//# sourceMappingURL=BaseRenderer.js.map