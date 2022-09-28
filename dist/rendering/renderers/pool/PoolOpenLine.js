"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolResolutionLine = void 0;
const config_1 = __importDefault(require("../../../config"));
const __1 = require("../..");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const BasePoolsRenderer_1 = require("./BasePoolsRenderer");
class PoolResolutionLine extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.defaultLineStyle = {
            color: 0xFFFFFF,
            width: 2,
            alpha: 0.9,
        };
        this.upLineStyle = {
            color: config_1.default.style.resolution.upcolor,
            width: 2,
            alpha: 1,
        };
        this.downLineStyle = {
            color: config_1.default.style.resolution.downcolor,
            width: 2,
            alpha: 1,
        };
        this.zeroLineStyle = {
            color: config_1.default.style.resolution.zerocolor,
            width: 2,
            alpha: 1,
        };
    }
    get rendererId() {
        return PoolResolutionLine.POOL_OPEN_PRICE_LINE_ID;
    }
    updatePool(pool, context, container) {
        const resolutionPrice = this.getResolutionPricePoint(pool, context);
        if (resolutionPrice) {
            this.clearOpenLine();
            return this.updateResolutionLine(pool, context, container, resolutionPrice);
        }
        if (pool.openPriceTimestamp && pool.openPriceValue) {
            this.clearResolutionLine();
            return this.updateDefaultLine(pool, context, container);
        }
        return this.clear();
    }
    clearOpenLine() {
        this.clear('openline');
    }
    clearResolutionLine() {
        this.clear('resolutionline');
    }
    updateDefaultLine(pool, context, container) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x, xr] = datamath_1.default.scale([pool.openPriceTimestamp, pool.resolutionDate], timerange, width);
        const [y] = datamath_1.default.scaleReverse([pool.openPriceValue], pricerange, height);
        const [line, linestate] = this.get('openline', () => __1.GraphicUtils.createLine([0, 0], [width, 0], this.defaultLineStyle));
        line.position.set(x, y);
        line.width = xr - x;
        if (linestate.new)
            container.addChild(line);
    }
    updateResolutionLine(pool, context, container, resolutionPrice) {
        const { timerange, pricerange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [x1, x2] = datamath_1.default.scale([pool.openPriceTimestamp, resolutionPrice.timestamp], timerange, width);
        const [y1, y2] = datamath_1.default.scaleReverse([pool.openPriceValue, resolutionPrice.price], pricerange, height);
        const [line, linestate] = this.get('resolutionline', () => new pixi_1.Graphics());
        if (linestate.new)
            container.addChild(line);
        let lineStyle = this.defaultLineStyle;
        if (resolutionPrice.price === pool.openPriceValue)
            lineStyle = this.zeroLineStyle;
        if (resolutionPrice.price > pool.openPriceValue)
            lineStyle = this.upLineStyle;
        if (resolutionPrice.price < pool.openPriceValue)
            lineStyle = this.downLineStyle;
        line
            .clear()
            .lineStyle(lineStyle)
            .moveTo(x1, y1)
            .lineTo(x2, y2);
    }
}
exports.PoolResolutionLine = PoolResolutionLine;
PoolResolutionLine.POOL_OPEN_PRICE_LINE_ID = Symbol('POOL_OPEN_PRICE_LINE_ID');
//# sourceMappingURL=PoolOpenLine.js.map