"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSticks = void 0;
const utils_1 = require("../utils");
function generateSticks({ stickIntervalWidth, valueRange }, whitespace, stickDateFrom, stickDateTo) {
    const sticks = [];
    const stickDateRange = new utils_1.DateRange(stickDateFrom, stickDateTo);
    for (let i = 0; i < stickDateRange.duration; i += stickIntervalWidth.asMilliseconds() + whitespace.asMilliseconds()) {
        const date = stickDateFrom.clone().add(i, 'milliseconds');
        const open = Math.random() * valueRange.to;
        const close = Math.random() * valueRange.to;
        sticks.push({ date: date.toDate(), open, close, high: Math.max(open, close), low: Math.min(open, close) });
    }
    return sticks;
}
exports.generateSticks = generateSticks;
//# sourceMappingURL=test.sticksMok.js.map