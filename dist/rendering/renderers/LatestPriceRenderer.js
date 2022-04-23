"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPriceRenderer = void 0;
const __1 = require("..");
const LatestPriceLineRenderer_1 = require("./LatestPriceLineRenderer");
const LatestPricePointRenderer_1 = require("./LatestPricePointRenderer");
class LatestPriceRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new __1.RenderingCompositor([
            new LatestPriceLineRenderer_1.LatestPriceLineRenderer(renderer),
            new LatestPricePointRenderer_1.LatestPricePointRenderer(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.LatestPriceRenderer = LatestPriceRenderer;
//# sourceMappingURL=LatestPriceRenderer.js.map