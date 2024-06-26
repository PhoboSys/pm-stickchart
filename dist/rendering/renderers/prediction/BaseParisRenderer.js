"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePredictionsRenderer = void 0;
const _rendering_1 = require("../../index.js");
const BaseRoundsRenderer_1 = require("../../renderers/round/BaseRoundsRenderer");
const utils_1 = require("../../../lib/utils");
const _enums_1 = require("../../../enums/index.js");
class BasePredictionsRenderer extends BaseRoundsRenderer_1.BaseRoundsRenderer {
    constructor() {
        super(...arguments);
        this.prevpredictions = {};
        this.newpredictions = {};
    }
    updateRound(round, context, layer) {
        var _a;
        const predictions = (_a = context.predictions) === null || _a === void 0 ? void 0 : _a[round.roundid];
        if ((0, utils_1.isEmpty)(predictions)) {
            this.cleanupPrediction(round);
            return layer;
        }
        this.updateEachPrediction(round, predictions, context, layer);
        this.cleanupPrediction(round);
        return layer;
    }
    updateEachPrediction(round, predictions, context, layer) {
        (0, utils_1.forEach)(predictions, (prediction, idx) => {
            // NOTE: short exit if not in timeframe, [performance improvment]
            if (round.endDate < context.timeframe.since)
                return;
            if (round.startDate > context.timeframe.until)
                return;
            this.rebind(round.roundid, prediction.predictionid);
            this.updatePrediction(round, prediction, context, layer, idx);
            this.newpredictions[prediction.predictionid] = prediction.predictionid;
        });
    }
    cleanupPrediction(round) {
        (0, utils_1.forEach)(this.prevpredictions, predictionid => {
            if (predictionid in this.newpredictions)
                return;
            this.rebind(round.roundid, predictionid);
            this.clear();
        });
        this.prevpredictions = this.newpredictions;
        this.newpredictions = {};
    }
    getPredictionState(round, prediction, context) {
        const resolution = this.getRoundResolution(round, context);
        const phantom = prediction.phantom;
        const undef = resolution === _enums_1.EPosition.Undefined;
        const nocontest = resolution === _enums_1.EPosition.NoContest;
        const isHistorical = this.isHistoricalRound(round, context);
        const win = prediction.position === resolution;
        const lose = !win && !phantom;
        const winning = win && !isHistorical && !phantom;
        const loseing = lose && !isHistorical && !phantom;
        const won = win && isHistorical && !nocontest && !phantom;
        const reverted = _rendering_1.EntityUtils.isEnityReverted(context, prediction.predictionid);
        const emptyround = this.isNoContestEmptyRound(round);
        const propagating = _rendering_1.EntityUtils.isEntityPropagating(context, prediction.predictionid);
        const orphan = phantom && reverted || isHistorical && phantom && !propagating;
        const claimable = !prediction.claimed && (won || nocontest) && !orphan && !phantom;
        return {
            phantom,
            undef,
            nocontest,
            isHistorical,
            win,
            lose,
            winning,
            loseing,
            won,
            reverted,
            orphan,
            claimable,
            emptyround,
            resolution,
            propagating,
        };
    }
}
exports.BasePredictionsRenderer = BasePredictionsRenderer;
//# sourceMappingURL=BaseParisRenderer.js.map