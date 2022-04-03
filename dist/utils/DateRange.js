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
    getIntervalsCount(interval) {
        return this.duration / interval.asMilliseconds();
    }
    getPointByDate(date) {
        return (date.valueOf() - this.from.valueOf()) / this.duration;
    }
    toString() {
        return `Range(from: ${this.from}, to: ${this.to})`;
    }
}
exports.DateRange = DateRange;
//# sourceMappingURL=DateRange.js.map