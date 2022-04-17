"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRange = exports.PriceRange = exports.Range = void 0;
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
class PriceRange extends Range {
    get length() {
        return this.to - this.from;
    }
    update(value) {
        this.from = Math.min(this.from, value);
        this.to = Math.max(this.to, value);
        return this;
    }
    move(left, right) {
        this.from += left;
        this.to += right;
        return this;
    }
    getPointByValue(value) {
        return (value - this.from) / this.length;
    }
    getIntervalsCount(interval) {
        return this.length / interval;
    }
    clone() {
        return new PriceRange(this.from, this.to);
    }
}
exports.PriceRange = PriceRange;
class DateRange extends Range {
    static getBeginDistance(mainRange, subRange) {
        return subRange.from.valueOf() - mainRange.from.valueOf();
    }
    get length() {
        return this.to.valueOf() - this.from.valueOf();
    }
    isContain(date) {
        return this.from.valueOf() < date && date < this.to.valueOf();
    }
    update(value) {
        if (this.from.valueOf() > value.valueOf()) {
            this.from = value;
        }
        if (this.to.valueOf() < value.valueOf()) {
            this.to = value;
        }
        return this;
    }
    moveInMilliseconds(left, right) {
        this.from = new Date(this.from.valueOf() + left);
        this.to = new Date(this.to.valueOf() + right);
        return this;
    }
    getIntervalsCount(interval) {
        return this.length / interval;
    }
    getPointByValue(value) {
        return (value.valueOf() - this.from.valueOf()) / this.length;
    }
    clone() {
        return new DateRange(this.from, this.to);
    }
}
exports.DateRange = DateRange;
//# sourceMappingURL=utils.range.js.map