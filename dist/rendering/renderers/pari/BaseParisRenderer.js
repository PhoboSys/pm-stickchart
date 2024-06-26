"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseParisRenderer = void 0;
const _rendering_1 = require("../../index.js");
const BaseRoundsRenderer_1 = require("../../renderers/round/BaseRoundsRenderer");
const utils_1 = require("../../../lib/utils");
const _enums_1 = require("../../../enums/index.js");
class BaseParisRenderer extends BaseRoundsRenderer_1.BaseRoundsRenderer {
    constructor() {
        super(...arguments);
        this.prevparis = {};
        this.newparis = {};
    }
    updateRound(round, context, layer) {
        var _a;
        const paris = (_a = context.paris) === null || _a === void 0 ? void 0 : _a[round.roundid];
        if ((0, utils_1.isEmpty)(paris)) {
            this.cleanupPari(round);
            return layer;
        }
        this.updateEachPari(round, paris, context, layer);
        this.cleanupPari(round);
        return layer;
    }
    updateEachPari(round, paris, context, layer) {
        (0, utils_1.forEach)(paris, (pari, idx) => {
            // NOTE: short exit if not in timeframe, [performance improvment]
            if (round.endDate < context.timeframe.since)
                return;
            if (round.startDate > context.timeframe.until)
                return;
            this.rebind(round.roundid, pari.pariid);
            this.updatePari(round, pari, context, layer, idx);
            this.newparis[pari.pariid] = pari.pariid;
        });
    }
    cleanupPari(round) {
        (0, utils_1.forEach)(this.prevparis, pariid => {
            if (pariid in this.newparis)
                return;
            this.rebind(round.roundid, pariid);
            this.clear();
        });
        this.prevparis = this.newparis;
        this.newparis = {};
    }
    getPariState(round, pari, context) {
        const resolution = this.getRoundResolution(round, context);
        const phantom = pari.phantom;
        const undef = resolution === _enums_1.EPosition.Undefined;
        const nocontest = resolution === _enums_1.EPosition.NoContest;
        const isHistorical = this.isHistoricalRound(round, context);
        const win = pari.position === resolution;
        const lose = !win && !phantom;
        const winning = win && !isHistorical && !phantom;
        const loseing = lose && !isHistorical && !phantom;
        const won = win && isHistorical && !nocontest && !phantom;
        const reverted = _rendering_1.EntityUtils.isEnityReverted(context, pari.pariid);
        const emptyround = this.isNoContestEmptyRound(round);
        const propagating = _rendering_1.EntityUtils.isEntityPropagating(context, pari.pariid);
        const orphan = phantom && reverted || isHistorical && phantom && !propagating;
        const claimable = !pari.claimed && (won || nocontest) && !orphan && !phantom;
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
exports.BaseParisRenderer = BaseParisRenderer;
//# sourceMappingURL=BaseParisRenderer.js.map