"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseParisRenderer = void 0;
const _rendering_1 = require("../../index.js");
const BasePoolsRenderer_1 = require("../../renderers/pool/BasePoolsRenderer");
const utils_1 = require("../../../lib/utils");
const _enums_1 = require("../../../enums/index.js");
class BaseParisRenderer extends BasePoolsRenderer_1.BasePoolsRenderer {
    constructor() {
        super(...arguments);
        this.prevparis = {};
        this.newparis = {};
    }
    updatePool(pool, context, layer) {
        var _a;
        const paris = (_a = context.paris) === null || _a === void 0 ? void 0 : _a[pool.poolid];
        if ((0, utils_1.isEmpty)(paris)) {
            this.cleanupPari(pool);
            return layer;
        }
        this.updateEachPari(pool, paris, context, layer);
        this.cleanupPari(pool);
        return layer;
    }
    updateEachPari(pool, paris, context, layer) {
        (0, utils_1.forEach)(paris, (pari, idx) => {
            // NOTE: short exit if not in timeframe, [performance improvment]
            if (pool.endDate < context.timeframe.since)
                return;
            if (pool.startDate > context.timeframe.until)
                return;
            this.rebind(pool.poolid, pari.pariid);
            this.updatePari(pool, pari, context, layer, idx);
            this.newparis[pari.pariid] = pari.pariid;
        });
    }
    cleanupPari(pool) {
        (0, utils_1.forEach)(this.prevparis, pariid => {
            if (pariid in this.newparis)
                return;
            this.rebind(pool.poolid, pariid);
            this.clear();
        });
        this.prevparis = this.newparis;
        this.newparis = {};
    }
    getPariState(pool, pari, context) {
        const resolution = this.getPoolResolution(pool, context);
        const phantom = pari.phantom;
        const undef = resolution === _enums_1.EPosition.Undefined;
        const nocontest = resolution === _enums_1.EPosition.NoContest;
        const isHistorical = this.isHistoricalPool(pool, context);
        const win = pari.position === resolution;
        const lose = !win && !phantom;
        const winning = win && !isHistorical && !phantom;
        const loseing = lose && !isHistorical && !phantom;
        const won = win && isHistorical && !nocontest && !phantom;
        const reverted = _rendering_1.EntityUtils.isEnityReverted(context, pari.pariid);
        const orphan = phantom && reverted;
        const emptypool = this.isNoContestEmptyPool(pool);
        const claimable = !pari.claimed && (won || nocontest) && !orphan && !phantom;
        const propagating = _rendering_1.EntityUtils.isEntityPropagating(context, pari.pariid);
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
            emptypool,
            resolution,
            propagating,
        };
    }
}
exports.BaseParisRenderer = BaseParisRenderer;
//# sourceMappingURL=BaseParisRenderer.js.map