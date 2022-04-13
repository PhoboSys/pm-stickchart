"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalsStateReducer = void 0;
const core_dataManager_1 = require("../../core/core.dataManager");
const map_dataToValueMappers_1 = require("../../data/maps/map.dataToValueMappers");
const map_rawDataMappers_1 = require("../../data/maps/map.rawDataMappers");
const utils_valueRange_1 = require("../../utils/utils.valueRange");
class IntervalsStateReducer {
    constructor(state) {
        this.state = state;
    }
    reduceState() {
        this.setValueRange();
        this.roundColumnIntervalSize();
        // this.roundRowIntervalSize()
        return this.state;
    }
    setValueRange() {
        const rawDataMapper = map_rawDataMappers_1.rawDataMappersMap[this.state.viewConfig.chartType];
        const columnIntervalSize = this.state.renderConfig.columnIntervalSize;
        const data = rawDataMapper(this.state.data, columnIntervalSize);
        const dataManager = new core_dataManager_1.DataManager(data, map_dataToValueMappers_1.dataToValueMappersMap[this.state.viewConfig.chartType]);
        const valuePeek = dataManager.valuePeek;
        if (valuePeek === undefined)
            return;
        const dist = valuePeek.max - valuePeek.min;
        const valueRange = new utils_valueRange_1.ValueRange(valuePeek.min - dist * .2, valuePeek.max + dist * .2);
        this.state.renderConfig.valueRange = valueRange;
        console.log(valueRange);
    }
    roundRowIntervalSize() {
        const { renderConfig: { valueRange, rowIntervalSize }, } = this.state;
        const minInterval = rowIntervalSize * 3;
        if (valueRange.value < minInterval) {
            this.state.renderConfig.rowIntervalSize = rowIntervalSize / 2;
            return;
        }
        if (valueRange.getIntervalsCount(minInterval) < 2)
            return;
        this.state.renderConfig.rowIntervalSize += rowIntervalSize;
    }
    roundColumnIntervalSize() {
        const { renderConfig: { dateRange, columnIntervalSize }, } = this.state;
        const duration = columnIntervalSize.asMilliseconds() * 3;
        if (dateRange.duration < duration) {
            columnIntervalSize.subtract(columnIntervalSize.asMilliseconds() / 2, 'milliseconds');
            return;
        }
        if (dateRange.getIntervalsCount(duration) < 2)
            return;
        columnIntervalSize.add(columnIntervalSize.asMilliseconds(), 'milliseconds');
    }
}
exports.IntervalsStateReducer = IntervalsStateReducer;
//# sourceMappingURL=store.intervls.reducer.js.map