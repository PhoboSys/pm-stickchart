"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const _rendering_1 = require("../../index.js");
const RoundBackground_1 = require("./RoundBackground");
const RoundOpen_1 = require("./RoundOpen");
const RoundResolution_1 = require("./RoundResolution");
const RoundResolutionLine_1 = require("./RoundResolutionLine");
const RoundResolutionChartLine_1 = require("./RoundResolutionChartLine");
const RoundOpenPriceTag_1 = require("./RoundOpenPriceTag");
const RoundResolutionPriceTag_1 = require("./RoundResolutionPriceTag");
const RoundLayerEventProducer_1 = require("./RoundLayerEventProducer");
class Round {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_1.RenderingCompositor([
            new RoundLayerEventProducer_1.RoundLayerEventProducer(renderer),
            new RoundBackground_1.RoundBackground(renderer),
            new RoundOpen_1.RoundOpen(renderer),
            new RoundResolution_1.RoundResolution(renderer),
            new RoundResolutionLine_1.RoundResolutionLine(renderer),
            new RoundResolutionChartLine_1.RoundResolutionChartLine(renderer),
            new RoundResolutionPriceTag_1.RoundResolutionPriceTag(renderer),
            new RoundOpenPriceTag_1.RoundOpenPriceTag(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.Round = Round;
//# sourceMappingURL=Pool.js.map