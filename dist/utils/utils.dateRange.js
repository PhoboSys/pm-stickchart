"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRange = void 0;
class DateRange {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    get duration() {
        return this.to.valueOf() - this.from.valueOf();
    }
    static getBeginDistance(mainRange, subRange) {
        return subRange.from.valueOf() - mainRange.from.valueOf();
    }
    moveRangeInMilliseconds(from, to) {
        this.from.add(from, 'milliseconds');
        this.to.add(to, 'milliseconds');
    }
    getIntervalsCount(interval) {
        return this.duration / interval;
    }
    getPointByDate(timestamp) {
        return (timestamp.valueOf() - this.from.valueOf()) / this.duration;
    }
    clone() {
        return new DateRange(this.from.clone(), this.to.clone());
    }
    toString() {
        return `Range(from: ${this.from}, to: ${this.to})`;
    }
}
exports.DateRange = DateRange;
//# sourceMappingURL=utils.dateRange.js.map