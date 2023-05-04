"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Framedata = void 0;
const _chartdata_1 = require("../../chartdata/index.js");
const utils_1 = require("../utils");
class Framedata {
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
    calculate(chartdata, timeframe) {
        const framedata = _chartdata_1.DataBuilder.framedata(chartdata, timeframe);
        return new utils_1.GetSet(() => framedata, this.set.bind(this));
    }
    updatePoint(point, timeframe, index) {
        this.timestamps[index] = point.timestamp;
        this.prices[index] = point.value;
        this.calculate({ timestamps: this.timestamps, prices: this.prices }, timeframe).set().get();
        return this;
    }
    createUpdater() {
        let index = this.get().timestamps.length;
        return (animated, timeframe) => {
            const framedata = this.updatePoint(animated, timeframe, index).get();
            index = framedata.timestamps.length - 1;
            return this;
        };
    }
}
exports.Framedata = Framedata;
//# sourceMappingURL=index.js.map