"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueRange = void 0;
class ValueRange {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    getPointByValue(value) {
        return (value - this.from) / this.value;
    }
    getIntervalsCount(interval) {
        return this.value / interval;
    }
    get value() {
        return this.to - this.from;
    }
    toString() {
        return `Range(from: ${this.from}, to: ${this.to})`;
    }
}
exports.ValueRange = ValueRange;
//# sourceMappingURL=ValueRange.js.map