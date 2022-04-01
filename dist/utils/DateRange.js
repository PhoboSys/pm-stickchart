"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRange = void 0;
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
exports.DateRange = DateRange;
//# sourceMappingURL=DateRange.js.map