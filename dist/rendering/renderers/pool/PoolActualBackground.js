"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolActualBackground = void 0;
const _config_1 = __importDefault(require("../../../config.js"));
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolActualBackground extends BasePoolsRenderer_1.BasePoolsRenderer {
    get rendererId() {
        return PoolActualBackground.POOL_ACTUAL_BACKGROUND_ID;
    }
    updatePool(pool, context, container) {
        if (!pool.openPriceTimestamp || !pool.openPriceValue || this.isHistoricalPool(pool, context))
            return this.clear();
        this.updateBackground(pool, context, container);
    }
    updateBackground(pool, context, container) {
        const { width, height, } = context.screen;
        const { timerange } = context.plotdata;
        const { openPriceTimestamp, endDate } = pool;
        const [ox, rx] = datamath_1.default.scale([openPriceTimestamp, endDate], timerange, width);
        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ];
        const [background, backgroundState] = this.get('background', () => new pixi_1.Graphics());
        if (backgroundState.new)
            container.addChild(background);
        background
            .clear()
            .beginFill(_config_1.default.style.poolActualRoundColor, 0.1)
            .drawPolygon(shape)
            .closePath()
            .endFill();
    }
}
exports.PoolActualBackground = PoolActualBackground;
PoolActualBackground.POOL_ACTUAL_BACKGROUND_ID = Symbol('POOL_ACTUAL_BACKGROUND_ID');
//# sourceMappingURL=PoolActualBackground.js.map