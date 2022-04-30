"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariResolutionRenderer = void 0;
const __1 = require("../../..");
const PariResolutionBackground_1 = require("./PariResolutionBackground");
const PariResolutionPrize_1 = require("./PariResolutionPrize");
class PariResolutionRenderer {
    constructor(renderer) {
        this.renderer = renderer;
        this.compositor = new __1.RenderingCompositor([
            new PariResolutionBackground_1.PariResolutionBackground(renderer),
            new PariResolutionPrize_1.PariResolutionPrize(renderer),
        ]);
    }
    render(context, done) {
        const render = this.compositor.compose(context, done);
        render();
    }
}
exports.PariResolutionRenderer = PariResolutionRenderer;
//# sourceMappingURL=PariResolutionRenderer.js.map