"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceLineRenderer = void 0;
const __1 = require("../../..");
const __2 = require("../../..");
const config_1 = __importDefault(require("../../../../config"));
const pixi_1 = require("../../../../lib/pixi");
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
    }
    get rendererId() {
        return PriceLineRenderer.PRICE_LINE_ID;
    }
    update(context, container) {
        const { width, height } = context.screen;
        const { xs, ys, yrange, xrange } = context.plotdata;
        const shape = [];
        let prevY = null;
        let prevX = null;
        const [line, lineState] = this.get('line', () => new pixi_1.Graphics());
        if (lineState.new)
            container.addChild(line);
        for (const idx in xs) {
            const x = xs[idx];
            const y = ys[idx];
            if (+idx === 0) {
                line
                    .clear()
                    .lineStyle(this.lineStyle)
                    .moveTo(x, y);
                prevY = y;
                shape.push(x, height);
                shape.push(x, y);
            }
            else if (+idx + 1 === xs.length) {
                if (config_1.default.style.rectunged) {
                    line.lineTo(x, prevY);
                    shape.push(x, prevY);
                }
                line.lineTo(x, y);
                shape.push(x, y);
                prevY = y;
            }
            else {
                if (config_1.default.style.rectunged) {
                    line.lineTo(x, prevY);
                    shape.push(x, prevY);
                }
                line.lineTo(x, y);
                shape.push(x, y);
                prevY = y;
            }
            prevY = y;
            prevX = x;
        }
        shape.push(prevX, height);
        const [gradient, gradientState] = this.get('gradient', () => new pixi_1.Graphics());
        if (gradientState.new)
            container.addChild(gradient);
        gradient
            .clear()
            .beginTextureFill({
            texture: context.textures.get(__2.PRICE_LINE_TEXTURE),
            alpha: 0.5,
        })
            .drawPolygon(shape)
            .closePath()
            .endFill();
        return container;
    }
}
exports.PriceLineRenderer = PriceLineRenderer;
PriceLineRenderer.PRICE_LINE_ID = Symbol('PRICE_LINE_ID');
//# sourceMappingURL=PriceLineRenderer.js.map