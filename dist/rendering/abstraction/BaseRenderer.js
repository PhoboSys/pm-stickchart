"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRenderer = void 0;
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
        if (name === undefined) {
            for (const key in this.local)
                this.clear(key);
        }
        else if (name in this.local) {
            const [g, state] = this.local[name];
            g.destroy();
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
        this.local[name] = [init(), { new: true }];
        return this.local[name];
    }
}
exports.BaseRenderer = BaseRenderer;
//# sourceMappingURL=BaseRenderer.js.map