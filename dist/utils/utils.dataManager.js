"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = void 0;
class DataManager {
    constructor(rawData, dataMapper, //TODO mapper
    newRawDataMapper) {
        this.dataMapper = dataMapper;
        this.newRawDataMapper = newRawDataMapper;
        this.data = dataMapper(rawData);
    }
    get length() {
        return this.data.length;
    }
    get isEmpty() {
        return !this.data.length;
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