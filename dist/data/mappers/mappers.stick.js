"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sticksToValuesDataMapper = exports.rawNewToSticksDataMapper = exports.rawToSticksDataMapper = void 0;
const utils_1 = require("../../utils");
const rawToSticksDataMapper = (data, interval) => {
    const candleSticks = [];
    for (let i = 0; i < data.length; i++) {
        const point = data[i];
        let high = point.answer;
        let low = point.answer;
        i++;
        while (i < data.length) {
            const current = data[i];
            const currentInterval = current.blockTimestamp * 1000 - point.blockTimestamp * 1000;
            if (currentInterval > interval.asMilliseconds())
                break;
            high = Math.max(current.answer, high);
            low = Math.min(current.answer, low);
            i++;
        }
        i--;
        const last = data[i];
        candleSticks.push({
            low,
            high,
            open: point.answer,
            close: last.answer,
            date: (0, utils_1.unixTimestampToDate)(point.blockTimestamp),
        });
    }
    return candleSticks;
};
exports.rawToSticksDataMapper = rawToSticksDataMapper;
const rawNewToSticksDataMapper = (sticks, raw, interval) => {
    if (sticks.length < 1)
        return (0, exports.rawToSticksDataMapper)([raw], interval);
    const { blockTimestamp, answer } = raw;
    const lastStick = sticks.at(-1);
    const millSinceLastStick = (0, utils_1.unixTimestampToMilliseconds)(blockTimestamp) - lastStick.date.valueOf();
    if (millSinceLastStick > interval.asMilliseconds()) {
        const stick = {
            low: answer,
            high: answer,
            open: answer,
            close: answer,
            date: (0, utils_1.unixTimestampToDate)(blockTimestamp),
        };
        return [...sticks, stick];
    }
    lastStick.close = answer;
    lastStick.high = Math.max(lastStick.high, answer);
    lastStick.low = Math.min(lastStick.low, answer);
    return sticks;
};
exports.rawNewToSticksDataMapper = rawNewToSticksDataMapper;
const sticksToValuesDataMapper = (stick) => {
    return [stick.high, stick.low];
};
exports.sticksToValuesDataMapper = sticksToValuesDataMapper;
//# sourceMappingURL=mappers.stick.js.map