"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPriceTagRenderer = void 0;
const _rendering_1 = require("../../../index.js");
const _config_1 = __importDefault(require("../../../../config.js"));
const ui_1 = __importDefault(require("../../../../lib/ui"));
const _constants_1 = require("../../../../constants/index.js");
class LatestPriceTagRenderer extends _rendering_1.BaseRenderer {
    constructor(renderer) {
        super(renderer);
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
        return LatestPriceTagRenderer.LATEST_PRICE_TAG_ID;
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
        return container;
    }
}
exports.LatestPriceTagRenderer = LatestPriceTagRenderer;
LatestPriceTagRenderer.LATEST_PRICE_TAG_ID = Symbol('LATEST_PRICE_TAG_ID');
//# sourceMappingURL=LatestPriceTagRenderer.js.map