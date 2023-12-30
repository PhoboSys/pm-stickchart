"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineChartRenderer = void 0;
const _rendering_1 = require("../index.js");
const _rendering_2 = require("../index.js");
const _rendering_3 = require("../index.js");
const _rendering_4 = require("../index.js");
const PoolBackground_1 = require("./pool/PoolBackground");
const PoolCountdown_1 = require("./pool/PoolCountdown");
class LineChartRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_1.RenderingCompositor([
            new PoolBackground_1.PoolBackground(renderer),
            new PoolCountdown_1.PoolCountdown(renderer),
            new _rendering_2.GridRenderer(renderer),
            new _rendering_4.PricefeedInfoRenderer(renderer),
            new _rendering_1.PriceLineRenderer(renderer),
            new _rendering_3.Pool(renderer),
            new _rendering_2.LatestPriceRenderer(renderer),
            new _rendering_3.CrosshairRenderer(renderer),
            new _rendering_3.Pari(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.LineChartRenderer = LineChartRenderer;
//# sourceMappingURL=LineChartRenderer.js.map