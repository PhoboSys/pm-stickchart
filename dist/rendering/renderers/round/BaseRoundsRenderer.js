"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoundsRenderer = void 0;
const _infra_1 = require("../../../infra/index.js");
const _rendering_1 = require("../../index.js");
const symbols_1 = require("../../textures/symbols");
const utils_1 = require("../../../lib/utils");
const calc_utils_1 = require("../../../lib/calc-utils");
const _chartdata_1 = require("../../../chartdata/index.js");
const _enums_1 = require("../../../enums/index.js");
const _constants_1 = require("../../../constants/index.js");
const _constants_2 = require("../../../constants/index.js");
class BaseRoundsRenderer extends _rendering_1.BaseRenderer {
    constructor() {
        super(...arguments);
        this.prevrounds = {};
        this.newrounds = {};
    }
    update(context, layer) {
        if ((0, utils_1.isEmpty)(context.rounds)) {
            this.cleanup();
            return layer;
        }
        this.updateEachRound(context, layer);
        this.cleanup();
        return layer;
    }
    updateEachRound(context, layer) {
        (0, utils_1.forEach)(context.rounds, (round, idx) => {
            // NOTE: short exit if not in timeframe, [performance improvment]
            if (round.endDate < context.timeframe.since)
                return;
            if (round.startDate > context.timeframe.until)
                return;
            this.rebind(round.roundid);
            this.updateRound(round, context, layer, idx);
            this.newrounds[round.roundid] = round.roundid;
        });
    }
    cleanup() {
        (0, utils_1.forEach)(this.prevrounds, roundid => {
            if (roundid in this.newrounds)
                return;
            this.rebind(roundid);
            this.clear();
        });
        this.prevrounds = this.newrounds;
        this.newrounds = {};
    }
    getRoundResolution(round, context) {
        if (round.resolved)
            return round.resolution;
        if (this.isNoContestRound(round, context))
            return _enums_1.EPosition.NoContest;
        const rprice = this.getResolutionPricePoint(round, context);
        const resolution = this.getRoundResolutionByPrice(round, rprice);
        return resolution;
    }
    getRoundResolutionByPrice(round, exitPrice) {
        if (!exitPrice || !round.entryPriceValue)
            return _enums_1.EPosition.Undefined;
        if ((0, calc_utils_1.eq)(exitPrice.value, round.entryPriceValue))
            return _enums_1.EPosition.Zero;
        if ((0, calc_utils_1.gt)(exitPrice.value, round.entryPriceValue))
            return _enums_1.EPosition.Up;
        if ((0, calc_utils_1.lt)(exitPrice.value, round.entryPriceValue))
            return _enums_1.EPosition.Down;
        return _enums_1.EPosition.Undefined;
    }
    isNoContestRound(round, context) {
        if (this.isActualRound(round, context)) {
            if (((0, utils_1.nowUnixTS)() - (context.options.noContestDelay || 0)) < round.lockDate)
                return false;
            const price = _chartdata_1.DataBuilder.getLatest(context.chartdata);
            if (!(price === null || price === void 0 ? void 0 : price.timestamp) || price.timestamp < round.lockDate)
                return false;
        }
        if (this.isNoContestEmptyRound(round))
            return true;
        if (round.resolved && round.resolution === _enums_1.EPosition.NoContest)
            return true;
        if (!this.isHistoricalRound(round, context))
            return false;
        const rprice = this.getResolutionPricePoint(round, context);
        const resolution = this.getRoundResolutionByPrice(round, rprice);
        if (this._isNoContestRound(round, resolution))
            return true;
        return false;
    }
    isNoContestEmptyRound(round) {
        const prizefundTotal = round.prizefunds[_constants_1.PRIZEFUNDS.TOTAL];
        return (round.prizefunds[_constants_1.PRIZEFUNDS.UP] == prizefundTotal ||
            round.prizefunds[_constants_1.PRIZEFUNDS.ZERO] == prizefundTotal ||
            round.prizefunds[_constants_1.PRIZEFUNDS.DOWN] == prizefundTotal);
    }
    _isNoContestRound(round, position) {
        if (position === _enums_1.EPosition.Undefined)
            return false;
        const prizefundTotal = round.prizefunds[_constants_1.PRIZEFUNDS.TOTAL];
        const prizefundWin = round.prizefunds[position];
        return Number(prizefundWin) === 0 || prizefundWin === prizefundTotal;
    }
    isHistoricalRound(round, context) {
        var _a;
        if (this.isActualRound(round, context))
            return false;
        return (round.resolved ||
            !!((_a = context.settlments) === null || _a === void 0 ? void 0 : _a[round.endDate]));
    }
    getResolutionPricePoint(round, context) {
        var _a, _b;
        if (this.isActualRound(round, context)) {
            const latest = _chartdata_1.DataBuilder.getLatest(context.chartdata);
            if (latest.timestamp > round.entryPriceTimestamp)
                return latest;
            return null;
        }
        const isResolveReady = !round.resolved && ((_a = context.settlments) === null || _a === void 0 ? void 0 : _a[round.endDate]);
        if (isResolveReady) {
            return {
                value: context.settlments[round.endDate].exitPrice.value,
                timestamp: context.settlments[round.endDate].exitPrice.timestamp,
            };
        }
        const isResolved = round.resolved && round.exitPriceTimestamp && round.exitPriceValue;
        if (isResolved) {
            return {
                value: round.exitPriceValue,
                timestamp: round.exitPriceTimestamp,
            };
        }
        const isResolvedNoResolutionPrice = round.resolved && (!round.exitPriceTimestamp || !round.exitPriceValue);
        if (isResolvedNoResolutionPrice && ((_b = context.settlments) === null || _b === void 0 ? void 0 : _b[round.endDate])) {
            return {
                value: context.settlments[round.endDate].exitPrice.value,
                timestamp: context.settlments[round.endDate].exitPrice.timestamp,
            };
        }
        const latest = _chartdata_1.DataBuilder.getLatest(context.chartdata);
        if (latest.timestamp <= round.entryPriceTimestamp)
            return null;
        if (latest.timestamp < round.endDate)
            return latest;
        return this.getRoundResolutionPriceFormPricefeed(round.endDate, context.chartdata);
    }
    getRoundResolutionPriceFormPricefeed(endDate, chartdata) {
        const { timestamps, prices } = chartdata;
        const index = (0, utils_1.binarySearchNearest)(timestamps, endDate - 1);
        if (index === -1)
            return null;
        return {
            timestamp: timestamps[index],
            value: prices[index],
        };
    }
    isActualRound(round, context) {
        var _a, _b;
        const now = ((_b = (_a = context === null || context === void 0 ? void 0 : context.plotdata) === null || _a === void 0 ? void 0 : _a.latest) === null || _b === void 0 ? void 0 : _b.timestamp) || (0, utils_1.nowUnixTS)();
        const end = round === null || round === void 0 ? void 0 : round.endDate;
        return end > now;
    }
    getLevelTextureName(context) {
        var _a, _b;
        switch ((_a = context.game) === null || _a === void 0 ? void 0 : _a.level) {
            case _constants_2.BRONZE:
                return symbols_1.BRONZE_LEVEL_TEXTURE;
            case _constants_2.SILVER:
                return symbols_1.SILVER_LEVEL_TEXTURE;
            case _constants_2.GOLD:
                return symbols_1.GOLD_LEVEL_TEXTURE;
            default:
                _infra_1.Logger.error(`game level "${(_b = context.game) === null || _b === void 0 ? void 0 : _b.level}" is not supported, fallback to SILVER`);
                return symbols_1.SILVER_LEVEL_TEXTURE;
        }
    }
}
exports.BaseRoundsRenderer = BaseRoundsRenderer;
//# sourceMappingURL=BaseRoundsRenderer.js.map