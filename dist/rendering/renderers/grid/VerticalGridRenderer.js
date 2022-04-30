"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticalGridRenderer = void 0;
const pixi_1 = require("../../../lib/pixi");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const __1 = require("../..");
const DateUtils_1 = require("../../utils/DateUtils");
class VerticalGridRenderer extends __1.BaseRenderer {
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
        return VerticalGridRenderer.VERTICAL_GRID_ID;
    }
    update(context, container) {
        const result = new pixi_1.Graphics();
        const { width, height } = context.screen;
        const { xdata, xrange } = context.plotdata;
        const stepsize = context.pool.duration;
        const xsteps = datamath_1.default.steps(xrange, stepsize, 20);
        const xs = datamath_1.default.scale(xsteps, xrange, width);
        for (const idx in xs) {
            const x = xs[idx];
            result.addChild(__1.GraphicUtils.createLine([x, 0], [x, height], this.lineStyle), __1.GraphicUtils.createText(DateUtils_1.DateUtils.formatUnixTSToHHmm(xsteps[idx]), [x, height], this.textStyle, 1.1));
        }
        return result;
    }
}
exports.VerticalGridRenderer = VerticalGridRenderer;
VerticalGridRenderer.VERTICAL_GRID_ID = Symbol('VERTICAL_GRID_ID');
//# sourceMappingURL=VerticalGridRenderer.js.map