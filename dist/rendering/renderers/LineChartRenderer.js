"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineChartRenderer = void 0;
const __1 = require("..");
const __2 = require("..");
const CrosshairRenderer_1 = require("./CrosshairRenderer");
class LineChartRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new __1.RenderingCompositor([
            new __1.GridRenderer(renderer),
            new __1.PriceLineRenderer(renderer),
            new __2.PariResolutionRenderer(renderer),
            new __2.PoolRenderer(renderer),
            new __2.LatestPriceRenderer(renderer),
            new CrosshairRenderer_1.CrosshairRenderer(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.LineChartRenderer = LineChartRenderer;
//# sourceMappingURL=LineChartRenderer.js.map