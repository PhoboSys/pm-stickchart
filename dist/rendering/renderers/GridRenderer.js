"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridRenderer = void 0;
const __1 = require("..");
class GridRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new __1.RenderingCompositor([
            new __1.VerticalGridRenderer(renderer),
            new __1.HorizontalGridRenderer(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.GridRenderer = GridRenderer;
//# sourceMappingURL=GridRenderer.js.map