"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = exports.Application = void 0;
var app_1 = require("@pixi/app");
Object.defineProperty(exports, "Application", { enumerable: true, get: function () { return app_1.Application; } });
class DateRange {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    get milliseconds() {
        return this.to.valueOf() - this.from.valueOf();
    }
    findTimePoint(time) {
        if (this.from.valueOf() > time.valueOf() || time.valueOf() > this.to.valueOf())
            throw new Error(`TimePoint(${time}) should fit in the ${this.toString()}`);
        return (time.valueOf() - this.from.valueOf()) / this.milliseconds;
    }
    toString() {
        return `Range(from: ${this.from}, to: ${this.to})`;
    }
}
class ValueRange {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    findValuePoint(value) {
        if (this.from > value || this.to < value)
            throw new Error(`ValuePoint(${value}) should fit in the ${this.toString()}`);
        return (value - this.from) / this.value;
    }
    get value() {
        return this.to - this.from;
    }
    toString() {
        return `Range(from: ${this.from}, to: ${this.to})`;
    }
}
class StickChart {
    constructor({ width, height, dateRange, segmentDateInterval: segmentInterval, stickDateInterval: stickInterval }) {
        this.width = width;
        this.height = height;
        this.dateRange = dateRange;
        this.segmentInterval = segmentInterval;
        this.stickInterval = stickInterval;
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=index.js.map