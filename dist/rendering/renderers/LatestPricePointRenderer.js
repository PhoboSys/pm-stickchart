"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPricePointRenderer = void 0;
const pixi_1 = require("../../lib/pixi");
const datamath_1 = __importDefault(require("../../lib/datamath"));
const __1 = require("..");
class LatestPricePointRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.innerPointStyle = {
            color: 0xFFFFFF,
            radius: 4
        };
        this.outerPointStyle = {
            color: 0x00A573,
            radius: 10
        };
    }
    get rendererId() {
        return LatestPricePointRenderer.LATEST_PRICE_POINT_ID;
    }
    create(context) {
        const { xdata, ydata, xrange, yrange, } = context.plotdata;
        const { width, height, } = context.screen;
        const lastXData = Number(xdata.at(-1));
        const lastYData = Number(ydata.at(-1));
        const [x] = datamath_1.default.scale([lastXData], xrange, width);
        const [yr] = datamath_1.default.scale([lastYData], yrange, height);
        const y = height - yr;
        const outerpoint = __1.GraphicUtils.createCircle([x, y], this.outerPointStyle.radius, this.outerPointStyle);
        const innerpoint = __1.GraphicUtils.createCircle([x, y], this.innerPointStyle.radius, this.innerPointStyle);
        const result = new pixi_1.Graphics();
        result.addChild(outerpoint, innerpoint);
        return result;
    }
}
exports.LatestPricePointRenderer = LatestPricePointRenderer;
LatestPricePointRenderer.LATEST_PRICE_POINT_ID = Symbol('LATEST_PRICE_POINT_ID');
//# sourceMappingURL=LatestPricePointRenderer.js.map