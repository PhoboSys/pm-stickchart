"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalGridRenderer = void 0;
const pixi_1 = require("../../../lib/pixi");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const __1 = require("../..");
class HorizontalGridRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.lineStyle = {
            width: 1,
            color: 0x303550,
            alpha: 1,
        };
        this.textStyle = {
            fill: 0xB7BDD7,
            fontWeight: 500,
            fontFamily: 'Gilroy',
            fontSize: 12,
        };
    }
    get rendererId() {
        return HorizontalGridRenderer.HORIZONTAL_GRID_ID;
    }
    update(context, container) {
        const result = new pixi_1.Graphics();
        const { width, height } = context.screen;
        const { pricerange } = context.plotdata;
        const stepsize = datamath_1.default.datastep(pricerange);
        const ysteps = datamath_1.default.steps(pricerange, stepsize, 20);
        const ys = datamath_1.default.scaleReverse(ysteps, pricerange, height);
        for (const idx in ys) {
            const y = ys[idx];
            // Avoid rendering over time axe text
            // 12px size + anchor 1.1
            if (y > (height - 12 + 12 * 1.1))
                continue;
            result.addChild(__1.GraphicUtils.createLine([0, y], [width, y], this.lineStyle), __1.GraphicUtils.createText(datamath_1.default.toFixedScaled(ysteps[idx], stepsize), [width, y], this.textStyle, 1.1));
        }
        return result;
    }
}
exports.HorizontalGridRenderer = HorizontalGridRenderer;
HorizontalGridRenderer.HORIZONTAL_GRID_ID = Symbol('HORIZONTAL_GRID_ID');
//# sourceMappingURL=HorizontalGridRenderer.js.map