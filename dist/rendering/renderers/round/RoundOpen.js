"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundOpen = void 0;
const _rendering_1 = require("../../index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const utils_1 = require("../../../lib/utils");
const _enums_1 = require("../../../enums/index.js");
const GroupComponent_1 = require("../../components/GroupComponent");
const BaseRoundsRenderer_1 = require("./BaseRoundsRenderer");
class RoundOpen extends BaseRoundsRenderer_1.BaseRoundsRenderer {
    constructor() {
        super(...arguments);
        this.dashLineStyle = {
            width: 1,
            join: 'round',
            cap: 'round',
            gap: 8,
            dash: 6,
            color: 0xFFFFFF,
        };
    }
    get rendererId() {
        return RoundOpen.ROUND_OPEN_ID;
    }
    updateRound(round, context, container) {
        var _a;
        const predictions = (_a = context.predictions) === null || _a === void 0 ? void 0 : _a[round.roundid];
        if (!round.openPriceTimestamp || !this.isActualRound(round, context) && (0, utils_1.isEmpty)(predictions))
            return this.clear();
        const resolution = this.getRoundResolution(round, context);
        const hasWinPrediction = predictions && predictions.some(prediction => prediction.position === resolution);
        const isHistorical = this.isHistoricalRound(round, context);
        const nocontest = resolution === _enums_1.EPosition.NoContest;
        const emptyround = this.isNoContestEmptyRound(round);
        const hashClaimablePrediction = predictions && predictions.some(prediction => {
            const phantom = prediction.phantom;
            const win = prediction.position === resolution;
            const won = win && isHistorical && !nocontest && !phantom;
            const reverted = _rendering_1.EntityUtils.isEnityReverted(context, prediction.predictionid);
            const propagating = _rendering_1.EntityUtils.isEntityPropagating(context, prediction.predictionid);
            const orphan = phantom && reverted || isHistorical && phantom && !propagating;
            const claimable = !prediction.claimed && (won || nocontest) && !orphan && !phantom;
            return claimable;
        });
        const [groupElement] = this.get('groupElement', () => new GroupComponent_1.GroupComponent());
        const state = { win: hasWinPrediction, isHistorical, nocontest, emptyround, claimable: hashClaimablePrediction };
        const [group, groupstate] = groupElement.update(context, { roundid: round.roundid, predictionState: state });
        if (group && groupstate.new)
            container.addChild(group);
        this.updateOpenLine(round, context, group);
    }
    updateOpenLine(round, context, container) {
        if (!container)
            return this.clear('line');
        const { width, height } = context.screen;
        const { timerange } = context.plotdata;
        const [x] = datamath_1.default.scale([round.openPriceTimestamp], timerange, width);
        const [line, linestate] = this.get('line', () => _rendering_1.GraphicUtils.createVerticalDashLine(0, [0, context.screen.height], this.dashLineStyle), [height]);
        if (linestate.new)
            container.addChild(line);
        line.position.x = x;
    }
}
exports.RoundOpen = RoundOpen;
RoundOpen.ROUND_OPEN_ID = Symbol('ROUND_OPEN_ID');
//# sourceMappingURL=RoundOpen.js.map