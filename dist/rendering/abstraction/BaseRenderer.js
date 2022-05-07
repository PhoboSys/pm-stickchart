"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRenderer = void 0;
const infra_1 = require("../../infra");
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
            infra_1.Logger.info('clear', name);
            const [g, state] = this.local[name];
            g.destroy();
            (_a = state.timeline) === null || _a === void 0 ? void 0 : _a.kill();
            delete this.local[name];
        }
    }
    get(name, init) {
        const stored = this.local[name];
        if (stored) {
            const [g, state] = stored;
            state.new = false;
            return [g, state];
        }
        infra_1.Logger.info('get new', name);
        this.local[name] = [init(), { new: true }];
        return this.local[name];
    }
}
exports.BaseRenderer = BaseRenderer;
//# sourceMappingURL=BaseRenderer.js.map