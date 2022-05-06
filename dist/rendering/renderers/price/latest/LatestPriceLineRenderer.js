"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPriceLineRenderer = void 0;
const __1 = require("../../..");
const config_1 = __importDefault(require("../../../../config"));
const datamath_1 = __importDefault(require("../../../../lib/datamath"));
class LatestPriceLineRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.lineStyle = {
            width: 2,
            color: config_1.default.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
            paddingx: 16,
        };
        this.textCoverStyle = {
            color: config_1.default.style.linecolor,
            paddingx: 7,
            paddingy: 5,
            anchorx: 1.1,
            anchory: 0.5,
            radius: 30,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
            linestyle: {
                color: config_1.default.style.linecolor,
                width: 1,
            },
        };
    }
    get rendererId() {
        return LatestPriceLineRenderer.LATEST_PRICE_LINE_ID;
    }
    update(context, container) {
        const { ys, prices, } = context.plotdata;
        const { width, height, } = context.screen;
        const x = width;
        const y = Number(ys.at(-1));
        const price = Number(prices.at(-1));
        const [coveredText, coveredTextState] = this.get('coveredText', () => __1.GraphicUtils.createCoveredText(datamath_1.default.toFixedPrecision(price, 8), [x, y], this.textCoverStyle));
        if (coveredTextState.new)
            container.addChild(coveredText);
        const textGraphic = coveredText.getChildAt(1);
        textGraphic.text = datamath_1.default.toFixedPrecision(price, 8);
        const { paddingx, paddingy } = this.textCoverStyle;
        const coverGraphic = coveredText.getChildAt(0);
        coverGraphic.width = textGraphic.width + paddingx * 2;
        coverGraphic.height = textGraphic.height + paddingy * 2;
        const { anchorx, anchory } = this.textCoverStyle;
        coveredText.position.set(x - coveredText.width * anchorx, y - coveredText.height * anchory);
        const padding = coveredText.width + this.lineStyle.paddingx;
        const [line, lineState] = this.get('line', () => __1.GraphicUtils.createLine([0, 0], [x, 0], this.lineStyle));
        if (lineState.new)
            container.addChild(line);
        line.position.set(0, y);
        line.width = width - padding;
        return container;
    }
}
exports.LatestPriceLineRenderer = LatestPriceLineRenderer;
LatestPriceLineRenderer.LATEST_PRICE_LINE_ID = Symbol('LATEST_PRICE_LINE_ID');
//# sourceMappingURL=LatestPriceLineRenderer.js.map