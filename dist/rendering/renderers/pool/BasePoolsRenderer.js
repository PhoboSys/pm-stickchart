"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePoolsRenderer = void 0;
const _infra_1 = require("../../../infra/index.js");
const _rendering_1 = require("../../index.js");
const symbols_1 = require("../../textures/symbols");
const utils_1 = require("../../../lib/utils");
const calc_utils_1 = require("../../../lib/calc-utils");
const _chartdata_1 = require("../../../chartdata/index.js");
const _enums_1 = require("../../../enums/index.js");
const _constants_1 = require("../../../constants/index.js");
const _constants_2 = require("../../../constants/index.js");
class BasePoolsRenderer extends _rendering_1.BaseRenderer {
    constructor() {
        super(...arguments);
        this.prevpools = {};
        this.newpools = {};
    }
    update(context, layer) {
        if ((0, utils_1.isEmpty)(context.pools)) {
            this.cleanup();
            return layer;
        }
        this.updateEachPool(context, layer);
        this.cleanup();
        return layer;
    }
    updateEachPool(context, layer) {
        (0, utils_1.forEach)(context.pools, (pool, idx) => {
            // NOTE: short exit if not in timeframe, [performance improvment]
            if (pool.endDate < context.timeframe.since)
                return;
            if (pool.startDate > context.timeframe.until)
                return;
            this.rebind(pool.poolid);
            this.updatePool(pool, context, layer, idx);
            this.newpools[pool.poolid] = pool.poolid;
        });
    }
    cleanup() {
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
        if (!resolutionPrice || !pool.openPriceValue)
            return _enums_1.EPosition.Undefined;
        if ((0, calc_utils_1.eq)(resolutionPrice.value, pool.openPriceValue))
            return _enums_1.EPosition.Zero;
        if ((0, calc_utils_1.gt)(resolutionPrice.value, pool.openPriceValue))
            return _enums_1.EPosition.Up;
        if ((0, calc_utils_1.lt)(resolutionPrice.value, pool.openPriceValue))
            return _enums_1.EPosition.Down;
        return _enums_1.EPosition.Undefined;
    }
    isNoContestPool(pool, context) {
        if (this.isActualPool(pool, context)) {
            if ((0, utils_1.nowUnixTS)() < pool.lockDate)
                return false;
            const price = _chartdata_1.DataBuilder.getLatest(context.chartdata);
            if (!(price === null || price === void 0 ? void 0 : price.timestamp) || price.timestamp < pool.lockDate)
                return false;
        }
        if (this.isNoContestEmptyPool(pool))
            return true;
        if (pool.resolved && pool.resolution === _enums_1.EPosition.NoContest)
            return true;
        if (!this.isHistoricalPool(pool, context))
            return false;
        const rprice = this.getResolutionPricePoint(pool, context);
        const resolution = this.getPoolResolutionByPrice(pool, rprice);
        if (this._isNoContestPool(pool, resolution))
            return true;
        return false;
    }
    isNoContestEmptyPool(pool) {
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
        if (this.isActualPool(pool, context))
            return false;
        return (pool.resolved ||
            !!((_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.endDate]));
    }
    getResolutionPricePoint(pool, context) {
        var _a, _b;
        if (this.isActualPool(pool, context)) {
            const latest = _chartdata_1.DataBuilder.getLatest(context.chartdata);
            if (latest.timestamp > pool.openPriceTimestamp)
                return latest;
            return null;
        }
        const isResolveReady = !pool.resolved && ((_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.endDate]);
        if (isResolveReady) {
            return {
                value: context.settlements[pool.endDate].resolutionPrice.value,
                timestamp: context.settlements[pool.endDate].resolutionPrice.timestamp,
            };
        }
        const isResolved = pool.resolved && pool.resolutionPriceTimestamp && pool.resolutionPriceValue;
        if (isResolved) {
            return {
                value: pool.resolutionPriceValue,
                timestamp: pool.resolutionPriceTimestamp,
            };
        }
        const isResolvedNoResolutionPrice = pool.resolved && (!pool.resolutionPriceTimestamp || !pool.resolutionPriceValue);
        if (isResolvedNoResolutionPrice && ((_b = context.settlements) === null || _b === void 0 ? void 0 : _b[pool.endDate])) {
            return {
                value: context.settlements[pool.endDate].resolutionPrice.value,
                timestamp: context.settlements[pool.endDate].resolutionPrice.timestamp,
            };
        }
        const latest = _chartdata_1.DataBuilder.getLatest(context.chartdata);
        if (latest.timestamp <= pool.openPriceTimestamp)
            return null;
        if (latest.timestamp < pool.endDate)
            return latest;
        return this.getPoolResolutionPriceFormPricefeed(pool.endDate, context.chartdata);
    }
    getPoolResolutionPriceFormPricefeed(endDate, chartdata) {
        const { timestamps, prices } = chartdata;
        const index = (0, utils_1.binarySearchNearest)(timestamps, endDate - 1);
        if (index === -1)
            return null;
        return {
            timestamp: timestamps[index],
            value: prices[index],
        };
    }
    isActualPool(pool, context) {
        var _a, _b;
        const now = ((_b = (_a = context === null || context === void 0 ? void 0 : context.plotdata) === null || _a === void 0 ? void 0 : _a.latest) === null || _b === void 0 ? void 0 : _b.timestamp) || (0, utils_1.nowUnixTS)();
        const end = pool === null || pool === void 0 ? void 0 : pool.endDate;
        return end > now;
    }
    getLevelTextureName(context) {
        var _a, _b;
        switch ((_a = context.metapool) === null || _a === void 0 ? void 0 : _a.level) {
            case _constants_2.BRONZE:
                return symbols_1.BRONZE_LEVEL_TEXTURE;
            case _constants_2.SILVER:
                return symbols_1.SILVER_LEVEL_TEXTURE;
            case _constants_2.GOLD:
                return symbols_1.GOLD_LEVEL_TEXTURE;
            default:
                _infra_1.Logger.error(`metapool level "${(_b = context.metapool) === null || _b === void 0 ? void 0 : _b.level}" is not supported, fallback to SILVER`);
                return symbols_1.SILVER_LEVEL_TEXTURE;
        }
    }
}
exports.BasePoolsRenderer = BasePoolsRenderer;
//# sourceMappingURL=BasePoolsRenderer.js.map