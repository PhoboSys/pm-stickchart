"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePoolsRenderer = void 0;
const __1 = require("../..");
const utils_1 = require("../../../lib/utils");
const chartdata_1 = require("../../../chartdata");
const enums_1 = require("../../../enums");
class BasePoolsRenderer extends __1.BaseRenderer {
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
    getPoolResolutionByPrice(pool, resolutionPrice) {
        if (!resolutionPrice)
            return enums_1.EPosition.Undefined;
        if (resolutionPrice.price === pool.openPriceValue)
            return enums_1.EPosition.Zero;
        if (resolutionPrice.price > pool.openPriceValue)
            return enums_1.EPosition.Up;
        if (resolutionPrice.price < pool.openPriceValue)
            return enums_1.EPosition.Down;
        return enums_1.EPosition.Undefined;
    }
    isHistoricalPool(pool, context) {
        if (this.isActualPool(pool))
            return false;
        const pricepoint = chartdata_1.DataBuilder.getLatest(context.plotdata);
        return pricepoint.timestamp >= pool.resolutionDate;
    }
    isActualPool(pool) {
        return pool.resolutionDate > (0, utils_1.nowUnixTS)();
    }
    getResolutionPricePoint(pool, context) {
        var _a;
        if (this.isActualPool(pool)) {
            return chartdata_1.DataBuilder.getLatest(context.plotdata);
        }
        const isResolveReady = !pool.resolved && ((_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.poolid]);
        if (isResolveReady) {
            return {
                price: context.settlements[pool.poolid].resolutionPrice.value,
                timestamp: context.settlements[pool.poolid].resolutionPrice.timestamp,
            };
        }
        const isResolved = pool.resolved && pool.resolutionPriceTimestamp && pool.resolutionPriceValue;
        if (isResolved) {
            return {
                price: pool.resolutionPriceValue,
                timestamp: pool.resolutionPriceTimestamp,
            };
        }
        const latest = chartdata_1.DataBuilder.getLatest(context.plotdata);
        if (pool.resolutionDate > latest.timestamp) {
            return latest;
        }
        return null;
    }
}
exports.BasePoolsRenderer = BasePoolsRenderer;
//# sourceMappingURL=BasePoolsRenderer.js.map