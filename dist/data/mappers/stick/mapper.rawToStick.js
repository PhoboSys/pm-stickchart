"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawToSticksDataMapper = void 0;
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
            date: new Date(point.blockTimestamp * 1000),
        });
    }
    return candleSticks;
};
exports.rawToSticksDataMapper = rawToSticksDataMapper;
//# sourceMappingURL=mapper.rawToStick.js.map