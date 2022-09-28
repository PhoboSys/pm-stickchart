"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolResolutionPriceLine = void 0;
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolResolutionPriceLine extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.lineStyle = {
            color: 0xFFFFFF,
            width: 2,
            alpha: 0.9,
        };
    }
    get rendererId() {
        return PoolResolutionPriceLine.POOL_RESOLUTION_PRICE_LINE_ID;
    }
    updatePool(pool, context, container) {
        var _a;
        const isResolveReady = !pool.resolved && ((_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.poolid]);
        const isResolved = pool.resolved && pool.resolutionPriceTimestamp && pool.resolutionPriceValue;
        if (isResolveReady || isResolved) {
            return this.updateResolveReadyPriceLine(pool, context, container);
        }
        return this.clear();
    }
    updateResolveReadyPriceLine(pool, context, container) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const settlement = context.settlements[pool.poolid];
        const ts = settlement.resolutionPrice.timestamp;
        const price = settlement.resolutionPrice.value;
        const [x, xo] = datamath_1.default.scale([ts, pool.openDate], timerange, width);
        const [y] = datamath_1.default.scaleReverse([price], pricerange, height);
        const [line, linestate] = this.get('line', () => __1.GraphicUtils.createLine([0, 0], [width, 0], this.lineStyle));
        line.position.set(xo, y);
        line.width = x - xo;
        if (linestate.new)
            container.addChild(line);
    }
}
exports.PoolResolutionPriceLine = PoolResolutionPriceLine;
PoolResolutionPriceLine.POOL_RESOLUTION_PRICE_LINE_ID = Symbol('POOL_RESOLUTION_PRICE_LINE_ID');
//# sourceMappingURL=PoolResolutionPriceLine.js.map