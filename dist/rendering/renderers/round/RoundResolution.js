"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundResolution = void 0;
const _config_1 = __importDefault(require("../../../config.js"));
const _infra_1 = require("../../../infra/index.js");
const _rendering_1 = require("../../index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const _constants_1 = require("../../../constants/index.js");
const BaseRoundsRenderer_1 = require("./BaseRoundsRenderer");
class RoundResolution extends BaseRoundsRenderer_1.BaseRoundsRenderer {
    constructor() {
        super(...arguments);
        this.lineStyle = {
            width: 1,
            join: 'round',
            cap: 'round',
            gap: 8,
            dash: 6,
            alpha: 0.5,
        };
    }
    get rendererId() {
        return RoundResolution.ROUND_RESOLUTION_ID;
    }
    updateRound(round, context, container) {
        if (this.isHistoricalRound(round, context) || !this.hasRoundPrice(round, context))
            return this.clear();
        this.updateActualRound(round, context, container);
    }
    updateActualRound(round, context, container) {
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([round.endDate], timerange, width);
        const [line, linestate] = this.get('line', () => _rendering_1.GraphicUtils.createVerticalDashLine(0, [0, height], Object.assign(Object.assign({}, this.lineStyle), { color: this.getLevelLineColor(context) })));
        line.position.x = x;
        line.height = height;
        if (linestate.new)
            container.addChild(line);
    }
    getLevelLineColor(context) {
        var _a, _b;
        switch ((_a = context.game) === null || _a === void 0 ? void 0 : _a.level) {
            case _constants_1.BRONZE:
                return _config_1.default.style.levels.bronzeLineColor;
            case _constants_1.SILVER:
                return _config_1.default.style.levels.silverLineColor;
            case _constants_1.GOLD:
                return _config_1.default.style.levels.goldLineColor;
            default:
                _infra_1.Logger.error(`game level "${(_b = context.game) === null || _b === void 0 ? void 0 : _b.level}" is not supported, fallback to SILVER`);
                return _config_1.default.style.levels.silverLineColor;
        }
    }
}
exports.RoundResolution = RoundResolution;
RoundResolution.ROUND_RESOLUTION_ID = Symbol('ROUND_RESOLUTION_ID');
//# sourceMappingURL=RoundResolution.js.map