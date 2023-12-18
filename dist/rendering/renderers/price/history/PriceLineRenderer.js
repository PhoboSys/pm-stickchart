"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceLineRenderer = void 0;
const _rendering_1 = require("../../../index.js");
const _rendering_2 = require("../../../index.js");
const _config_1 = __importDefault(require("../../../../config.js"));
const pixi_1 = require("../../../../lib/pixi");
class PriceLineRenderer extends _rendering_1.BaseRenderer {
    constructor() {
        super(...arguments);
        this.lineStyle = {
            width: _config_1.default.style.linesize,
            color: _config_1.default.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
        };
    }
    get rendererId() {
        return PriceLineRenderer.PRICE_LINE_ID;
    }
    update(context, container) {
        if (context.plotdata.xs.length === 0)
            return container;
        const [line, lineState] = this.get('line', () => new pixi_1.Graphics());
        if (lineState.new)
            container.addChild(line);
        this.drawLine(context);
        if (_config_1.default.style.gradient.enabled) {
            const [gradient, gradientState] = this.get('gradient', () => new pixi_1.Graphics());
            if (gradientState.new)
                container.addChild(gradient);
            this.drawGradient(context);
        }
        return container;
    }
    drawLine(context) {
        const { xs, ys } = context.plotdata;
        let prevY = null;
        const [line] = this.read('line');
        for (const idx in xs) {
            const x = xs[idx];
            const y = ys[idx];
            if (+idx === 0) {
                line
                    .clear()
                    .lineStyle(this.lineStyle)
                    .moveTo(x, y);
            }
            else if (+idx + 1 === xs.length) {
                if (context.features.rectungedPriceLine)
                    line.lineTo(x, prevY);
                line.lineTo(x, y);
            }
            else {
                if (context.features.rectungedPriceLine)
                    line.lineTo(x, prevY);
                line.lineTo(x, y);
            }
            prevY = y;
        }
    }
    drawGradient(context) {
        const { height } = context.screen;
        const { xs, ys } = context.plotdata;
        const shape = [];
        let prevY = null;
        let prevX = null;
        for (const idx in xs) {
            const x = xs[idx];
            const y = ys[idx];
            if (+idx === 0) {
                shape.push(x, height);
                shape.push(x, y);
            }
            else if (+idx + 1 === xs.length) {
                if (context.features.rectungedPriceLine)
                    shape.push(x, prevY);
                shape.push(x, y);
            }
            else {
                if (context.features.rectungedPriceLine)
                    shape.push(x, prevY);
                shape.push(x, y);
            }
            prevY = y;
            prevX = x;
        }
        shape.push(prevX, height);
        const [gradient] = this.read('gradient');
        gradient
            .clear()
            .beginTextureFill({
            texture: context.textures.get(_rendering_2.PRICE_LINE_TEXTURE),
            alpha: 0.5,
        })
            .drawPolygon(shape)
            .closePath()
            .endFill();
    }
}
exports.PriceLineRenderer = PriceLineRenderer;
PriceLineRenderer.PRICE_LINE_ID = Symbol('PRICE_LINE_ID');
//# sourceMappingURL=PriceLineRenderer.js.map