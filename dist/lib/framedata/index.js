"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Framedata = void 0;
const _chartdata_1 = require("../../chartdata/index.js");
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
        return _chartdata_1.DataBuilder.framedata(chartdata, timeframe);
    }
    createUpdater() {
        let index = this.get().timestamps.length;
        return (animated, timeframe) => {
            const timestamps = [...this.timestamps];
            const prices = [...this.prices];
            timestamps[index] = animated.timestamp;
            prices[index] = animated.value;
            const framedata = this.calculate({ timestamps, prices }, timeframe);
            index = framedata.timestamps.length - 1;
            this.set(framedata);
            return this;
        };
    }
}
exports.Framedata = Framedata;
//# sourceMappingURL=index.js.map