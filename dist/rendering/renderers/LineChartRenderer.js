"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineChartRenderer = void 0;
const _rendering_1 = require("../index.js");
const _rendering_2 = require("../index.js");
const _rendering_3 = require("../index.js");
const _rendering_4 = require("../index.js");
const _rendering_5 = require("../index.js");
const RoundActualBackground_1 = require("./round/RoundActualBackground");
const RoundCountdown_1 = require("./round/RoundCountdown");
class LineChartRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_2.RenderingCompositor([
            new RoundActualBackground_1.RoundActualBackground(renderer),
            new RoundCountdown_1.RoundCountdown(renderer),
            new _rendering_3.GridRenderer(renderer),
            new _rendering_5.PricefeedInfoRenderer(renderer),
            new _rendering_2.PriceLineRenderer(renderer),
            new _rendering_1.LatestPriceLineRenderer(renderer),
            new _rendering_4.Round(renderer),
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