"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceLineRenderer = void 0;
const config_1 = __importDefault(require("../../config"));
const pixi_1 = require("../../lib/pixi");
const datamath_1 = __importDefault(require("../../lib/datamath"));
const __1 = require("..");
const __2 = require("..");
class PriceLineRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.lineStyle = {
            width: config_1.default.style.linesize,
            color: config_1.default.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
        };
        this.textStyle = {
            fill: 0xB7BDD7,
            fontWeight: 500,
            fontFamily: 'Gilroy',
            fontSize: 12,
        };
    }
    get rendererId() {
        return PriceLineRenderer.PRICE_LINE_ID;
    }
    create(context) {
        const { width, height } = context.screen;
        const { xdata, xrange, ydata, yrange } = context.plotdata;
        const xs = datamath_1.default.scale(xdata, xrange, width);
        const ys = datamath_1.default.scale(ydata, yrange, height);
        let result = new pixi_1.Graphics();
        let shape = [];
        let prevY = null;
        let prevX = null;
        for (const idx in xs) {
            const x = xs[idx];
            const y = height - ys[idx];
            if (+idx === 0) {
                result = __1.GraphicUtils.startLine([x, y], this.lineStyle);
                prevY = y;
                shape.push(x, height);
                shape.push(x, y);
            }
            else {
                if (config_1.default.style.rectunged) {
                    result = __1.GraphicUtils.lineTo(result, [x, prevY], this.lineStyle);
                    shape.push(x, prevY);
                }
                result = __1.GraphicUtils.lineTo(result, [x, y], this.lineStyle);
                shape.push(x, y);
                prevY = y;
            }
            if (config_1.default.debuglatest && +idx + 1 === xs.length) {
                result.addChild(__1.GraphicUtils.createText(xdata[idx], [x, y], this.textStyle, 1), __1.GraphicUtils.createText(ydata[idx], [x, y], this.textStyle, 0));
            }
            if (config_1.default.debugtime) {
                result.addChild(__1.GraphicUtils.createText(xdata[idx], [x, y], this.textStyle, 1));
            }
            if (config_1.default.debugprice) {
                result.addChild(__1.GraphicUtils.createText(ydata[idx], [x, y], this.textStyle, 0));
            }
            prevY = y;
            prevX = x;
        }
        shape.push(prevX, height);
        const gradient = new pixi_1.Graphics();
        gradient.beginTextureFill({
            texture: context.textures.get(__2.PRICE_LINE_TEXTURE),
            alpha: 0.5
        });
        gradient.drawPolygon(shape);
        gradient.closePath();
        gradient.endFill();
        result.addChild(gradient);
        return result;
    }
}
exports.PriceLineRenderer = PriceLineRenderer;
PriceLineRenderer.PRICE_LINE_ID = Symbol('PRICE_LINE_ID');
//# sourceMappingURL=PriceLineRenderer.js.map