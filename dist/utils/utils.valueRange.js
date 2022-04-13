"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueRange = void 0;
class ValueRange {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    get value() {
        return this.to - this.from;
    }
    inRange(point) {
        return this.from > point && point < this.to;
    }
    getPointByValue(value) {
        return (value - this.from) / this.value;
    }
    getIntervalsCount(interval) {
        return this.value / interval;
    }
    clone() {
        return new ValueRange(this.from, this.to);
    }
    toString() {
        return `Range(from: ${this.from}, to: ${this.to})`;
    }
}
exports.ValueRange = ValueRange;
//# sourceMappingURL=utils.valueRange.js.map