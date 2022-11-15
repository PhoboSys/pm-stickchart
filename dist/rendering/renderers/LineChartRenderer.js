"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineChartRenderer = void 0;
const _rendering_1 = require("../index.js");
class LineChartRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_1.RenderingCompositor([
            new _rendering_1.GridRenderer(renderer),
            new _rendering_1.PriceLineRenderer(renderer),
            new _rendering_1.Pool(renderer),
            new _rendering_1.LatestPriceRenderer(renderer),
            new _rendering_1.CrosshairRenderer(renderer),
            new _rendering_1.Pari(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.LineChartRenderer = LineChartRenderer;
//# sourceMappingURL=LineChartRenderer.js.map