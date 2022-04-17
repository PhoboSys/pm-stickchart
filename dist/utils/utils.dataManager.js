"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = void 0;
class DataManager {
    constructor(rawData, dataMapper, //TODO mapper
    newRawDataMapper, dateMapper) {
        this.dataMapper = dataMapper;
        this.newRawDataMapper = newRawDataMapper;
        this.dateMapper = dateMapper;
        this.data = dataMapper(rawData);
    }
    get length() {
        return this.data.length;
    }
    get isEmpty() {
        return !this.data.length;
    }
    selectByDateRange(dateRange) {
        const dates = this.data.map(this.dateMapper);
        const selected = [];
        for (let i = 0; i < this.length; i++) {
            const hasSelected = selected.length;
            if (dateRange.isContain(dates[i])) {
                if (hasSelected && i) {
                    selected.push(this.data[i - 1]);
                }
                selected.push(this.data[i]);
            }
            else if (hasSelected) {
                selected.push(this.data[i]);
                break;
            }
        }
        return selected;
    }
    at(index) {
        const { data } = this;
        return data.at(index);
    }
    addData(raw) {
        this.data = this.newRawDataMapper(this.data, raw);
    }
}
exports.DataManager = DataManager;
//# sourceMappingURL=utils.dataManager.js.map