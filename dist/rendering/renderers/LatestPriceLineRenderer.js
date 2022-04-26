"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPriceLineRenderer = void 0;
const __1 = require("..");
const config_1 = __importDefault(require("../../config"));
const datamath_1 = __importDefault(require("../../lib/datamath"));
const pixi_1 = require("../../lib/pixi");
class LatestPriceLineRenderer extends __1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
        this.lineStyle = {
            width: 2,
            color: config_1.default.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
            paddingx: 6,
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
<<<<<<< HEAD
            linestyle: {
                color: config_1.default.style.linecolor,
                width: 1,
            }
=======
>>>>>>> 5d8a960 (eslint fix)
        };
    }
    get rendererId() {
        return LatestPriceLineRenderer.LATEST_PRICE_LINE_ID;
    }
    create(context) {
        const { ylast, yrange, } = context.plotdata;
        const { width, height, } = context.screen;
        const [yr] = datamath_1.default.scale([ylast], yrange, height);
        const y = height - yr;
        const coveredText = __1.GraphicUtils.createCoveredText(datamath_1.default.toFixedPrecision(ylast, 8), [width, y], this.textCoverStyle);
        const coverx = coveredText.x + coveredText.children[0].x;
        const line = __1.GraphicUtils.createLine([0, y], [coverx - this.lineStyle.paddingx, y], this.lineStyle);
        const result = new pixi_1.Graphics();
        result.addChild(line, coveredText);
        return result;
    }
}
exports.LatestPriceLineRenderer = LatestPriceLineRenderer;
LatestPriceLineRenderer.LATEST_PRICE_LINE_ID = Symbol('LATEST_PRICE_LINE_ID');
//# sourceMappingURL=LatestPriceLineRenderer.js.map