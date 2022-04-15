"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalsStateReducer = void 0;
const utils_range_1 = require("../../utils/utils.range");
class IntervalsStateReducer {
    constructor(state) {
        this.state = state;
    }
    reduceState() {
        this.setPriceRange();
        this.roundColumnIntervalSize();
        this.roundRowIntervalSize();
        return this.state;
    }
    setPriceRange() {
        const { renderConfig: { dataPriceRange: range } } = this.state;
        if (!(range === null || range === void 0 ? void 0 : range.length))
            return;
        const valueRange = new utils_range_1.PriceRange(range.range.from - range.length * .2, range.range.to + range.length * .2);
        this.state.renderConfig.priceRange = valueRange;
    }
    roundRowIntervalSize() {
        const { renderConfig: { priceRange: valueRange, rowIntervalSize }, } = this.state;
        if (valueRange.length <= 0)
            return;
        const minInterval = rowIntervalSize * 7;
        if (valueRange.length < minInterval) {
            this.state.renderConfig.rowIntervalSize /= 2;
            return this.roundRowIntervalSize();
        }
        if (valueRange.getIntervalsCount(minInterval) < 2)
            return;
        this.state.renderConfig.rowIntervalSize *= 2;
        this.roundRowIntervalSize();
    }
    roundColumnIntervalSize() {
        const { renderConfig: { dateRange, columnIntervalSize }, } = this.state;
        const intervalsDuration = columnIntervalSize * 7;
        if (dateRange.length < intervalsDuration) {
            this.state.renderConfig.columnIntervalSize /= 2;
            return this.roundColumnIntervalSize();
        }
        if (dateRange.getIntervalsCount(intervalsDuration) < 2)
            return;
        this.state.renderConfig.columnIntervalSize *= 2;
        this.roundColumnIntervalSize();
    }
}
exports.IntervalsStateReducer = IntervalsStateReducer;
//# sourceMappingURL=store.intervls.reducer.js.map