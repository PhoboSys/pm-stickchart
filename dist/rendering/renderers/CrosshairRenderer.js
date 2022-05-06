"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrosshairRenderer = void 0;
const __1 = require("..");
const datamath_1 = __importDefault(require("../../lib/datamath"));
const pixi_1 = require("../../lib/pixi");
class CrosshairRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.lineStyle = {
            width: 2,
            color: 0x009797,
            alpha: 1,
            join: 'round',
            cap: 'round',
        };
        this.priceCoverStyle = {
            color: 0x009797,
            paddingright: 5,
            paddingx: 5,
            paddingy: 2.5,
            anchorx: 1,
            anchory: 0.5,
            radius: 30,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
        };
    }
    get rendererId() {
        return CrosshairRenderer.CROSSHAIR_ID;
    }
    update(context, container) {
        if (!context.mousepos)
            return new pixi_1.Graphics();
        const { height, width, } = context.screen;
        const { timerange, pricerange, } = context.plotdata;
        const { x, y } = context.mousepos;
        const verticalLine = __1.GraphicUtils.createLine([x, 0], [x, height], this.lineStyle);
        const pricedif = pricerange[1] - pricerange[0];
        const price = pricerange[1] - datamath_1.default.scale([y], [0, height], pricedif)[0];
        const { paddingright } = this.priceCoverStyle;
        const priceText = __1.GraphicUtils.createCoveredText(price.toFixed(3), [width - paddingright, y], this.priceCoverStyle);
        const horizontalLine = __1.GraphicUtils.createLine([0, y], [priceText.x, y], this.lineStyle);
        const result = new pixi_1.Graphics();
        result.addChild(verticalLine, horizontalLine, priceText);
        return result;
    }
}
exports.CrosshairRenderer = CrosshairRenderer;
CrosshairRenderer.CROSSHAIR_ID = Symbol('CROSSHAIR_ID');
//# sourceMappingURL=CrosshairRenderer.js.map