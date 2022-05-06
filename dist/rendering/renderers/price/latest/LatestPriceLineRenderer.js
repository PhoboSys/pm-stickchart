"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPriceLineRenderer = void 0;
const __1 = require("../../..");
const config_1 = __importDefault(require("../../../../config"));
const datamath_1 = __importDefault(require("../../../../lib/datamath"));
const pixi_1 = require("../../../../lib/pixi");
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
        var _a, _b;
        const { ys, ydata, } = context.plotdata;
        const { width, height, } = context.screen;
        const x = width;
        const y = Number(ys.at(-1));
        const price = Number(ydata.at(-1));
        const [coveredText, coveredTextState] = this.get('coveredText', () => __1.GraphicUtils.createCoveredText(datamath_1.default.toFixedPrecision(price, 8), [x, y], this.textCoverStyle));
        if (coveredTextState.new)
            container.addChild(coveredText);
        const textGraphic = coveredText.getChildAt(1);
        textGraphic.text = datamath_1.default.toFixedPrecision(price, 8);
        const { anchorx, anchory } = this.textCoverStyle;
        (_a = coveredTextState.timeline) === null || _a === void 0 ? void 0 : _a.kill();
        coveredTextState.timeline = pixi_1.gsap.to(coveredText, {
            pixi: {
                positionX: x - coveredText.width * anchorx,
                positionY: y - coveredText.height * anchory,
            },
            duration: 0.3,
            ease: 'power4.out',
        });
        const padding = coveredText.width + this.lineStyle.paddingx;
        const [line, lineState] = this.get('line', () => __1.GraphicUtils.createLine([0, 0], [x, 0], this.lineStyle));
        if (lineState.new) {
            container.addChild(line);
            line.position.set(0, y);
        }
        line.width = width - padding;
        (_b = lineState.timeline) === null || _b === void 0 ? void 0 : _b.kill();
        lineState.timeline = pixi_1.gsap.to(line, {
            pixi: {
                positionX: 0,
                positionY: y
            },
            duration: 0.3,
            ease: 'power4.out',
        });
        return container;
    }
}
exports.LatestPriceLineRenderer = LatestPriceLineRenderer;
LatestPriceLineRenderer.LATEST_PRICE_LINE_ID = Symbol('LATEST_PRICE_LINE_ID');
//# sourceMappingURL=LatestPriceLineRenderer.js.map