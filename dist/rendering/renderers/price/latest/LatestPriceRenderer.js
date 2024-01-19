"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPriceRenderer = void 0;
const _rendering_1 = require("../../../index.js");
const LatestPricePointRenderer_1 = require("./LatestPricePointRenderer");
const LatestPriceTagRenderer_1 = require("./LatestPriceTagRenderer");
class LatestPriceRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_1.RenderingCompositor([
            new LatestPricePointRenderer_1.LatestPricePointRenderer(renderer),
            new LatestPriceTagRenderer_1.LatestPriceTagRenderer(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.LatestPriceRenderer = LatestPriceRenderer;
//# sourceMappingURL=LatestPriceRenderer.js.map