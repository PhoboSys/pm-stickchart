"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineChartRenderer = void 0;
const _rendering_1 = require("../index.js");
const _rendering_2 = require("../index.js");
const _rendering_3 = require("../index.js");
const _rendering_4 = require("../index.js");
const _rendering_5 = require("../index.js");
const PoolActualBackground_1 = require("./pool/PoolActualBackground");
const PoolCountdown_1 = require("./pool/PoolCountdown");
class LineChartRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_2.RenderingCompositor([
            new PoolActualBackground_1.PoolActualBackground(renderer),
            new PoolCountdown_1.PoolCountdown(renderer),
            new _rendering_3.GridRenderer(renderer),
            new _rendering_5.PricefeedInfoRenderer(renderer),
            new _rendering_2.PriceLineRenderer(renderer),
            new _rendering_1.LatestPriceLineRenderer(renderer),
            new _rendering_4.Pool(renderer),
            new _rendering_3.LatestPriceRenderer(renderer),
            new _rendering_4.CrosshairRenderer(renderer),
            new _rendering_4.Pari(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.LineChartRenderer = LineChartRenderer;
//# sourceMappingURL=LineChartRenderer.js.map