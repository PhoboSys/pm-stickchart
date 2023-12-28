"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPriceLineRenderer = void 0;
const _rendering_1 = require("../../../index.js");
const _config_1 = __importDefault(require("../../../../config.js"));
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
            paddingx: 16,
        };
        this.textCoverStyle = {
            color: 0x071226,
            padding: [6, 8],
            anchor: [1.1, 0.5],
            radius: 30,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 500,
                fontFamily: 'Roboto',
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
        const { width, } = context.screen;
        const x = width;
        const y = latestY;
        const price = latest.value;
        const [coveredText, coveredTextState] = this.get('coveredText', () => _rendering_1.GraphicUtils.createCoveredText(ui_1.default.currency(price, _constants_1.USD), [x, y], this.textCoverStyle));
        if (coveredTextState.new)
            container.addChild(coveredText);
        else
            coveredText.update((textGraphic) => textGraphic.text = ui_1.default.currency(price, _constants_1.USD), [x, y], this.textCoverStyle);
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