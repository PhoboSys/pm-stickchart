"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRange = exports.ValueRange = exports.Range = void 0;
class Range {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    get range() {
        return { from: this.from, to: this.to };
    }
}
exports.Range = Range;
class ValueRange extends Range {
    get width() {
        return this.to - this.from;
    }
    isNull() {
        return this.from === Infinity;
    }
    updateIf(value) {
        this.from = Math.min(this.from, value);
        this.to = Math.max(this.to, value);
        return this;
    }
    expandFor(left, right) {
        this.from += left;
        this.to += right;
        return this;
    }
    getPointByValue(value) {
        return (value - this.from) / this.width;
    }
    getIntervalsCount(interval) {
        return this.width / interval;
    }
    clone() {
        return new ValueRange(this.from, this.to);
    }
}
exports.ValueRange = ValueRange;
class DateRange extends Range {
    static getBeginDistance(mainRange, subRange) {
        return subRange.from.valueOf() - mainRange.from.valueOf();
    }
    get width() {
        return this.to.valueOf() - this.from.valueOf();
    }
    updateIf(value) {
        if (this.from.valueOf() > value.valueOf()) {
            this.from = value;
        }
        if (this.to.valueOf() < value.valueOf()) {
            this.to = value;
        }
        return this;
    }
    expandInMilliseconds(left, right) {
        this.from.add(left, 'milliseconds');
        this.to.add(right, 'milliseconds');
        return this;
    }
    getIntervalsCount(interval) {
        return this.width / interval.asMilliseconds();
    }
    getPointByValue(value) {
        return (value.valueOf() - this.from.valueOf()) / this.width;
    }
    clone() {
        return new DateRange(this.from.clone(), this.to.clone());
    }
}
exports.DateRange = DateRange;
//# sourceMappingURL=utils.range.js.map