"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPriceLineRenderer = void 0;
const _rendering_1 = require("../../../index.js");
const _config_1 = __importDefault(require("../../../../config.js"));
const datamath_1 = __importDefault(require("../../../../lib/datamath"));
const ui_1 = __importDefault(require("../../../../lib/ui"));
const _constants_1 = require("../../../../constants/index.js");
class LatestPriceLineRenderer extends _rendering_1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.lineStyle = {
            width: 2,
            color: _config_1.default.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
            paddingx: 12,
        };
        this.textCoverStyle = {
            color: _config_1.default.style.linecolor,
            paddingx: 8,
            paddingy: 6,
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
                color: _config_1.default.style.linecolor,
                width: 1,
            },
        };
    }
    get rendererId() {
        return LatestPriceLineRenderer.LATEST_PRICE_LINE_ID;
    }
    update(context, container) {
        const { latestY, latest, } = context.plotdata;
        const { width, height, } = context.screen;
        const x = width;
        const y = latestY;
        const price = latest.value;
        const [coveredText, coveredTextState] = this.get('coveredText', () => _rendering_1.GraphicUtils.createCoveredText(datamath_1.default.toFixedPrecision(Number(price), 8), [x, y], this.textCoverStyle));
        if (coveredTextState.new)
            container.addChild(coveredText);
        const textGraphic = coveredText.getChildAt(1);
        textGraphic.text = ui_1.default.currency(price, _constants_1.USD);
        const { paddingx, paddingy } = this.textCoverStyle;
        const coverGraphic = coveredText.getChildAt(0);
        coverGraphic.width = textGraphic.width + paddingx * 2;
        coverGraphic.height = textGraphic.height + paddingy * 2;
        const { anchorx, anchory } = this.textCoverStyle;
        coveredText.position.set(x - coveredText.width * anchorx, y - coveredText.height * anchory);
        const padding = coveredText.width + this.lineStyle.paddingx;
        const [line, lineState] = this.get('line', () => _rendering_1.GraphicUtils.createLine([0, 0], [width, 0], this.lineStyle));
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