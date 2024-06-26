"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prediction = void 0;
const _rendering_1 = require("../../index.js");
const PredictionTile_1 = require("./PredictionTile");
const PredictionLine_1 = require("./PredictionLine");
class Prediction {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_1.RenderingCompositor([
            new PredictionLine_1.PredictionLine(renderer),
            new PredictionTile_1.PredictionTile(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.Prediction = Prediction;
//# sourceMappingURL=Prediction.js.map