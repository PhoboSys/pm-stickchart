"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chartdata = void 0;
const _chartdata_1 = require("../../chartdata/index.js");
const utils_1 = require("../utils");
class Chartdata {
    get() {
        return { prices: this.prices, timestamps: this.timestamps };
    }
    set({ prices, timestamps }) {
        this.prices = prices;
        this.timestamps = timestamps;
        return this;
    }
    isInitialized() {
        return !!(this.prices && this.timestamps);
    }
    calculate(chartdataOrig) {
        const chartdata = _chartdata_1.DataBuilder.chartdata(chartdataOrig);
        return new utils_1.GetSet(() => chartdata, this.set.bind(this));
    }
    updatePoint(point, index) {
        this.timestamps[index] = point.timestamp;
        this.prices[index] = point.value;
        return this;
    }
}
exports.Chartdata = Chartdata;
//# sourceMappingURL=index.js.map