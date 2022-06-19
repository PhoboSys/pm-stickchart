"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolRenderer = void 0;
const _rendering_1 = require("../../index.js");
const PoolOpenRenderer_1 = require("./PoolOpenRenderer");
const PoolResolutionRenderer_1 = require("./PoolResolutionRenderer");
const PoolLockRenderer_1 = require("./PoolLockRenderer");
const PoolBackgroundRenderer_1 = require("./PoolBackgroundRenderer");
const PoolOpenPriceLineRenderer_1 = require("./PoolOpenPriceLineRenderer");
const PoolLockCountdownRenderer_1 = require("./PoolLockCountdownRenderer");
class PoolRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new _rendering_1.RenderingCompositor([
            new PoolBackgroundRenderer_1.PoolBackgroundRenderer(renderer),
            new PoolLockRenderer_1.PoolLockRenderer(renderer),
            new PoolOpenRenderer_1.PoolOpenRenderer(renderer),
            new PoolLockCountdownRenderer_1.PoolLockCountdownRenderer(renderer),
            new PoolResolutionRenderer_1.PoolResolutionRenderer(renderer),
            new PoolOpenPriceLineRenderer_1.PoolOpenPriceLineRenderer(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.PoolRenderer = PoolRenderer;
//# sourceMappingURL=PoolRenderer.js.map