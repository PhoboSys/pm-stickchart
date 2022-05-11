"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolBackgroundRenderer = void 0;
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const symbols_1 = require("../../textures/symbols");
class PoolBackgroundRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
    }
    get rendererId() {
        return PoolBackgroundRenderer.POOL_BACKGROUND_ID;
    }
    update(context, container) {
        if (!context.pool) {
            container.alpha = 0;
            return container;
        }
        container.alpha = 1;
        this.updateBackground(context, container);
        return container;
    }
    updateBackground(context, container) {
        const { width, height, } = context.screen;
        const { timerange } = context.plotdata;
        const { openDate, resolutionDate, } = context.pool;
        const [ox, rx] = datamath_1.default.scale([openDate, resolutionDate], timerange, width);
        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ];
        const [gradient, gradientState] = this.get('gradient', () => new pixi_1.Graphics());
        gradient
            .clear()
            .beginTextureFill({
            texture: context.textures.get(symbols_1.POOL_ROUND_TEXTURE),
            alpha: 0.07,
        })
            .drawPolygon(shape)
            .closePath()
            .endFill();
        if (gradientState.new)
            container.addChild(gradient);
        return container;
    }
}
exports.PoolBackgroundRenderer = PoolBackgroundRenderer;
PoolBackgroundRenderer.POOL_BACKGROUND_ID = Symbol('POOL_BACKGROUND_ID');
//# sourceMappingURL=PoolBackgroundRenderer.js.map