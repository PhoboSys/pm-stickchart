"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolRenderer = void 0;
const __1 = require("../..");
const PoolOpenRenderer_1 = require("./PoolOpenRenderer");
const PoolResolutionRenderer_1 = require("./PoolResolutionRenderer");
const PoolLockRenderer_1 = require("./PoolLockRenderer");
const PoolBackgroundRenderer_1 = require("./PoolBackgroundRenderer");
const PoolOpenPriceLineRenderer_1 = require("./PoolOpenPriceLineRenderer");
const PoolLeftOpenTimeRenderer_1 = require("./PoolLeftOpenTimeRenderer");
class PoolRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new __1.RenderingCompositor([
            new PoolBackgroundRenderer_1.PoolBackgroundRenderer(renderer),
            new PoolLockRenderer_1.PoolLockRenderer(renderer),
            new PoolOpenRenderer_1.PoolOpenRenderer(renderer),
            new PoolResolutionRenderer_1.PoolResolutionRenderer(renderer),
            new PoolOpenPriceLineRenderer_1.PoolOpenPriceLineRenderer(renderer),
            new PoolLeftOpenTimeRenderer_1.PoolLeftOpenTimeRenderer(renderer)
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.PoolRenderer = PoolRenderer;
//# sourceMappingURL=PoolRenderer.js.map