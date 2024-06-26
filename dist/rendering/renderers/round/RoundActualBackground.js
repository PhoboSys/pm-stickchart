"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundActualBackground = void 0;
const _config_1 = __importDefault(require("../../../config.js"));
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const BaseRoundsRenderer_1 = require("./BaseRoundsRenderer");
class RoundActualBackground extends BaseRoundsRenderer_1.BaseRoundsRenderer {
    get rendererId() {
        return RoundActualBackground.ROUND_ACTUAL_BACKGROUND_ID;
    }
    updateRound(round, context, container) {
        if (!round.openPriceTimestamp || !round.openPriceValue || !this.isActualRound(round, context))
            return this.clear();
        this.updateBackground(round, context, container);
    }
    updateBackground(round, context, container) {
        const { width, height, } = context.screen;
        const { timerange } = context.plotdata;
        const { openPriceTimestamp, endDate } = round;
        const [ox, rx] = datamath_1.default.scale([openPriceTimestamp, endDate], timerange, width);
        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ];
        const [background, backgroundState] = this.get('background', () => new pixi_1.Graphics());
        if (backgroundState.new)
            container.addChild(background);
        background
            .clear()
            .beginFill(_config_1.default.style.roundActualRoundColor, 0.1)
            .drawPolygon(shape)
            .closePath()
            .endFill();
    }
}
exports.RoundActualBackground = RoundActualBackground;
RoundActualBackground.ROUND_ACTUAL_BACKGROUND_ID = Symbol('ROUND_ACTUAL_BACKGROUND_ID');
//# sourceMappingURL=RoundActualBackground.js.map