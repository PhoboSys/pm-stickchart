"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeframeChangedEvent = void 0;
class TimeframeChangedEvent extends Event {
    constructor(timeframe) {
        super(TimeframeChangedEvent.NAME);
        this.timeframe = timeframe;
    }
}
exports.TimeframeChangedEvent = TimeframeChangedEvent;
TimeframeChangedEvent.NAME = 'timeframechanged';
//# sourceMappingURL=TimeframeChangedEvent.js.map