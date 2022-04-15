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
    get isEmpty() {
        return !this.data.length;
    }
    addData(raw) {
        this.data = this.newRawDataMapper(this.data, raw);
    }
}
exports.DataManager = DataManager;
//# sourceMappingURL=utils.dataManager.js.map