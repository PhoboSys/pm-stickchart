"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineChartRenderer = void 0;
const __1 = require("..");
const __2 = require("..");
const __3 = require("..");
const __4 = require("..");
class LineChartRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new __1.RenderingCompositor([
            new __2.GridRenderer(renderer),
            new __2.PriceLineRenderer(renderer),
            new __3.Pool(renderer),
            new __3.LatestPriceRenderer(renderer),
            new __4.CrosshairRenderer(renderer),
            new __3.Pari(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.LineChartRenderer = LineChartRenderer;
//# sourceMappingURL=LineChartRenderer.js.map