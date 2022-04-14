"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalsStateReducer = void 0;
const moment_1 = require("moment");
const utils_range_1 = require("../../utils/utils.range");
class IntervalsStateReducer {
    constructor(state) {
        this.state = state;
    }
    reduceState() {
        this.setValueRange();
        this.roundColumnIntervalSize();
        this.roundRowIntervalSize();
        return this.state;
    }
    setValueRange() {
        const { dataManager } = this.state;
        const range = dataManager.valueRange;
        if (range === undefined)
            return;
        const valueRange = new utils_range_1.ValueRange(range.range.from - range.width * .2, range.range.to + range.width * .2);
        this.state.renderConfig.valueRange = valueRange;
    }
    roundRowIntervalSize() {
        const { renderConfig: { valueRange, rowIntervalSize }, } = this.state;
        const minInterval = rowIntervalSize * 6;
        if (valueRange.width < minInterval) {
            this.state.renderConfig.rowIntervalSize = rowIntervalSize / 2;
            return this.roundRowIntervalSize();
        }
        if (valueRange.getIntervalsCount(minInterval) < 2)
            return;
        this.state.renderConfig.rowIntervalSize += rowIntervalSize;
        this.roundRowIntervalSize();
    }
    roundColumnIntervalSize() {
        const { renderConfig: { dateRange, columnIntervalSize }, } = this.state;
        const intervalsDuration = (0, moment_1.duration)(columnIntervalSize.asMilliseconds() * 7, 'milliseconds');
        if (dateRange.width < intervalsDuration.asMilliseconds()) {
            columnIntervalSize.subtract(columnIntervalSize.asMilliseconds() / 2, 'milliseconds');
            return;
        }
        if (dateRange.getIntervalsCount(intervalsDuration) < 2)
            return;
        columnIntervalSize.add(columnIntervalSize.asMilliseconds(), 'milliseconds');
    }
}
exports.IntervalsStateReducer = IntervalsStateReducer;
//# sourceMappingURL=store.intervls.reducer.js.map