"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeframeStickToNowEvent = void 0;
class TimeframeStickToNowEvent extends Event {
    constructor(timeframe) {
        super(TimeframeStickToNowEvent.NAME);
        this.timeframe = timeframe;
    }
}
exports.TimeframeStickToNowEvent = TimeframeStickToNowEvent;
TimeframeStickToNowEvent.NAME = 'timeframe2now';
//# sourceMappingURL=TimeframeStickToNowEvent.js.map