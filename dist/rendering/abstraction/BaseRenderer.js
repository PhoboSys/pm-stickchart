"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRenderer = void 0;
class BaseRenderer {
    constructor(renderer) {
        this.renderer = renderer;
    }
    render(context, done) {
        this.renderer.render(this.create(context), this.rendererId);
        done();
    }
}
exports.BaseRenderer = BaseRenderer;
//# sourceMappingURL=BaseRenderer.js.map