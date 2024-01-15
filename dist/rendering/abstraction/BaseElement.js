"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseElement = void 0;
const _infra_1 = require("../../infra/index.js");
const pixi_1 = require("../../lib/pixi");
const utils_1 = require("../../lib/utils");
class BaseElement {
    constructor() {
        this.local = {};
        this.stateprefix = '';
    }
    get animations() { return {}; }
    rebind(...path) {
        this.stateprefix = !(0, utils_1.isEmpty)(path) ? path.join('>') + '>' : '';
    }
    clear(name) {
        var _a, _b, _c;
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
                _infra_1.Logger.info('clear', name);
                const [item, state] = this.local[name];
                (_a = item === null || item === void 0 ? void 0 : item.destroy) === null || _a === void 0 ? void 0 : _a.call(item);
                (_c = (_b = state === null || state === void 0 ? void 0 : state.timeline) === null || _b === void 0 ? void 0 : _b.kill) === null || _c === void 0 ? void 0 : _c.call(_b);
                delete this.local[name];
            }
        }
    }
    read(name) {
        const bindname = this.stateprefix + name;
        const got = this.local[bindname];
        return got || [];
    }
    get(name, create, dependencies = []) {
        const bindname = this.stateprefix + name;
        const stored = this.local[bindname];
        if (stored) {
            const [g, state, deps] = stored;
            if (this.isEqual(deps, dependencies)) {
                state.new = false;
                return [g, state, deps];
            }
            else {
                this.clear(name);
            }
        }
        _infra_1.Logger.info('get new', bindname);
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
    animate(name, animation, vars = {}) {
        var _a;
        const config = this.animations[animation];
        if (!config)
            return;
        const got = this.read(name);
        if ((0, utils_1.isEmpty)(got))
            return;
        const [target, state] = got;
        if (state.animation !== animation) {
            state.animation = animation;
            if (config.clear)
                (_a = state.timeline) === null || _a === void 0 ? void 0 : _a.clear();
            state.timeline = state.timeline || pixi_1.gsap.timeline();
            let method = 'to';
            if (state.new && config.new)
                method = config.new;
            if ((0, utils_1.isFunction)(state.timeline[method]))
                state.timeline[method](target, Object.assign(Object.assign({}, config), vars));
            else
                _infra_1.Logger.warn('amination method "%s" unknown', method);
        }
    }
}
exports.BaseElement = BaseElement;
//# sourceMappingURL=BaseElement.js.map