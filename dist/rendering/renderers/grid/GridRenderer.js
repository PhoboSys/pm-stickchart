"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridRenderer = void 0;
const _rendering_1 = require("../../index.js");
const VerticalGridRenderer_1 = require("./VerticalGridRenderer");
const HorizontalGridRenderer_1 = require("./HorizontalGridRenderer");
class GridRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_1.RenderingCompositor([
            new VerticalGridRenderer_1.VerticalGridRenderer(renderer),
            new HorizontalGridRenderer_1.HorizontalGridRenderer(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.GridRenderer = GridRenderer;
//# sourceMappingURL=GridRenderer.js.map