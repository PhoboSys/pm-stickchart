"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePoolsRenderer = void 0;
const _rendering_1 = require("../../index.js");
const utils_1 = require("../../../lib/utils");
const _chartdata_1 = require("../../../chartdata/index.js");
const _enums_1 = require("../../../enums/index.js");
const _constants_1 = require("../../../constants/index.js");
class BasePoolsRenderer extends _rendering_1.BaseRenderer {
    constructor() {
        super(...arguments);
        this.prevpools = {};
        this.newpools = {};
    }
    update(context, layer) {
        if ((0, utils_1.isEmpty)(context.pools)) {
            this.cleanup(context);
            return layer;
        }
        this.updateEachPool(context, layer);
        this.cleanup(context);
        return layer;
    }
    updateEachPool(context, layer) {
        (0, utils_1.forEach)(context.pools, (pool, idx) => {
            this.rebind(pool.poolid);
            this.updatePool(pool, context, layer, idx);
            this.newpools[pool.poolid] = pool.poolid;
        });
    }
    cleanup(context) {
        (0, utils_1.forEach)(this.prevpools, poolid => {
            if (poolid in this.newpools)
                return;
            this.rebind(poolid);
            this.clear();
        });
        this.prevpools = this.newpools;
        this.newpools = {};
    }
    getPoolResolution(pool, context) {
        if (pool.resolved)
            return pool.resolution;
        if (this.isNoContestPool(pool, context))
            return _enums_1.EPosition.NoContest;
        const rprice = this.getResolutionPricePoint(pool, context);
        const resolution = this.getPoolResolutionByPrice(pool, rprice);
        return resolution;
    }
    getPoolResolutionByPrice(pool, resolutionPrice) {
        if (!resolutionPrice)
            return _enums_1.EPosition.Undefined;
        if (resolutionPrice.value === pool.openPriceValue)
            return _enums_1.EPosition.Zero;
        if (resolutionPrice.value > pool.openPriceValue)
            return _enums_1.EPosition.Up;
        if (resolutionPrice.value < pool.openPriceValue)
            return _enums_1.EPosition.Down;
        return _enums_1.EPosition.Undefined;
    }
    isNoContestPool(pool, context) {
        if ((0, utils_1.nowUnixTS)() < pool.lockDate)
            return false;
        const price = _chartdata_1.DataBuilder.getLatest(context.plotdata);
        if (!(price === null || price === void 0 ? void 0 : price.timestamp) || price.timestamp < pool.lockDate)
            return false;
        // TODO: Implement Early Pool Resolution with NoContest
        // if (this._isNoContestEmptyPool(pool)) return true
        if (!this.isHistoricalPool(pool, context))
            return false;
        if (pool.resolved && pool.resolution === _enums_1.EPosition.NoContest)
            return true;
        if (this._isNoContestEmptyPool(pool))
            return true;
        const rprice = this.getResolutionPricePoint(pool, context);
        const resolution = this.getPoolResolutionByPrice(pool, rprice);
        if (this._isNoContestPool(pool, resolution))
            return true;
        return false;
    }
    _isNoContestEmptyPool(pool) {
        const prizefundTotal = pool.prizefunds[_constants_1.PRIZEFUNDS.TOTAL];
        return (pool.prizefunds[_constants_1.PRIZEFUNDS.UP] == prizefundTotal ||
            pool.prizefunds[_constants_1.PRIZEFUNDS.ZERO] == prizefundTotal ||
            pool.prizefunds[_constants_1.PRIZEFUNDS.DOWN] == prizefundTotal);
    }
    _isNoContestPool(pool, position) {
        if (position === _enums_1.EPosition.Undefined)
            return false;
        const prizefundTotal = pool.prizefunds[_constants_1.PRIZEFUNDS.TOTAL];
        const prizefundWin = pool.prizefunds[position];
        return Number(prizefundWin) === 0 || prizefundWin === prizefundTotal;
    }
    isHistoricalPool(pool, context) {
        var _a;
        if (this.isActualPool(pool))
            return false;
        return (pool.resolved ||
            ((_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.poolid]));
    }
    getResolutionPricePoint(pool, context) {
        var _a;
        if (this.isActualPool(pool)) {
            return _chartdata_1.DataBuilder.getLatest(context.plotdata);
        }
        const isResolveReady = !pool.resolved && ((_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.poolid]);
        if (isResolveReady) {
            return {
                value: context.settlements[pool.poolid].resolutionPrice.value,
                timestamp: context.settlements[pool.poolid].resolutionPrice.timestamp,
            };
        }
        const isResolved = pool.resolved && pool.resolutionPriceTimestamp && pool.resolutionPriceValue;
        if (isResolved) {
            return {
                value: pool.resolutionPriceValue,
                timestamp: pool.resolutionPriceTimestamp,
            };
        }
        const latest = _chartdata_1.DataBuilder.getLatest(context.plotdata);
        if (pool.resolutionDate > latest.timestamp) {
            return latest;
        }
        return null;
    }
    isActualPool(pool) {
        return pool.resolutionDate > (0, utils_1.nowUnixTS)();
    }
}
exports.BasePoolsRenderer = BasePoolsRenderer;
//# sourceMappingURL=BasePoolsRenderer.js.map