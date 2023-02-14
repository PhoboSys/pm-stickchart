"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeframeUnstickToNowEvent = void 0;
class TimeframeUnstickToNowEvent extends Event {
    constructor(timeframe) {
        super(TimeframeUnstickToNowEvent.NAME);
        this.timeframe = timeframe;
    }
}
exports.TimeframeUnstickToNowEvent = TimeframeUnstickToNowEvent;
TimeframeUnstickToNowEvent.NAME = 'timeframeUnnow';
//# sourceMappingURL=TimeframeUnstickToNowEvent.js.map