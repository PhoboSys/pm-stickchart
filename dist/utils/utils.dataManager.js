"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = void 0;
const utils_range_1 = require("./utils.range");
class DataManager {
    constructor(data, rawDataMapper, rawNewDataMapper, valuesDataMapper) {
        this.rawDataMapper = rawDataMapper;
        this.rawNewDataMapper = rawNewDataMapper;
        this.valuesDataMapper = valuesDataMapper;
        this.data = rawDataMapper(data);
        this.valueRange = this.createValueRange();
    }
    get values() {
        return this.data
            .map(this.valuesDataMapper)
            .reduce((a, v) => [...a, ...v], []);
    }
    createValueRange() {
        const { values } = this;
        if (values.length < 1)
            return new utils_range_1.ValueRange(Infinity, 0);
        const min = Math.min(...values);
        const max = Math.max(...values);
        return new utils_range_1.ValueRange(min, max);
    }
    updateValueRange(data) {
        const values = this.valuesDataMapper(data);
        values.forEach(value => this.valueRange.updateIf(value));
    }
    addData(raw) {
        this.data = this.rawNewDataMapper(this.data, raw);
        this.updateValueRange(this.data.at(-1));
    }
}
exports.DataManager = DataManager;
//# sourceMappingURL=utils.dataManager.js.map