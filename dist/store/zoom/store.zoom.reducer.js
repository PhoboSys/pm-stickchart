"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomStateReducer = void 0;
const utils_handledEvent_1 = require("../../utils/utils.handledEvent");
class ZoomStateReducer {
    constructor(state) {
        this.state = state;
    }
    reduceState() {
        this.moveRenderDateRange();
        this.state.emittedEvent = new utils_handledEvent_1.HandledEvent();
        return this.state;
    }
    moveRenderDateRange() {
        const { emittedEvent: zoomEvent, renderDateRange, columnIntervalSize } = this.state;
        const { deltaY } = zoomEvent;
        const zoomValue = deltaY * (renderDateRange.duration * 0.001);
        renderDateRange.moveRangeInMilliseconds(-zoomValue, zoomValue);
        // const intervalCount = renderDateRange.getIntervalsCount(columnIntervalSize)
        // if (intervalCount > 15) {
        //     columnIntervalSize.add(columnIntervalSize.asMilliseconds(), 'milliseconds')
        // }
        // if (intervalCount < 7) {
        //     columnIntervalSize.subtract(columnIntervalSize.asMilliseconds() / 2, 'milliseconds')
        // }
    }
}
exports.ZoomStateReducer = ZoomStateReducer;
//# sourceMappingURL=store.zoom.reducer.js.map