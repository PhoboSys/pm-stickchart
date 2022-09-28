"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolOpenPriceLine = void 0;
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolOpenPriceLine extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.lineStyle = {
            color: 0xFFFFFF,
            width: 2,
            alpha: 0.6,
        };
    }
    get rendererId() {
        return PoolOpenPriceLine.POOL_OPEN_PRICE_LINE_ID;
    }
    updatePool(pool, context, container) {
        if (!pool.openPriceValue)
            return this.clear();
        if (!this.isActualPool(pool))
            return this.clear();
        this.updateOpenLine(pool, context, container);
    }
    updateOpenLine(pool, context, container) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x, xr] = datamath_1.default.scale([pool.openDate, pool.resolutionDate], timerange, width);
        const [y] = datamath_1.default.scaleReverse([pool.openPriceValue], pricerange, height);
        const [line, linestate] = this.get('line', () => this.createOpenPoolLine(context));
        if (linestate.new)
            container.addChild(line);
        line.position.set(x, y);
        line.width = xr - x;
    }
    createOpenPoolLine(context) {
        const { width } = context.screen;
        const line = __1.GraphicUtils.createLine([0, 0], [width, 0], this.lineStyle);
        return line;
    }
}
exports.PoolOpenPriceLine = PoolOpenPriceLine;
PoolOpenPriceLine.POOL_OPEN_PRICE_LINE_ID = Symbol('POOL_OPEN_PRICE_LINE_ID');
//# sourceMappingURL=PoolOpenPriceLine.js.map