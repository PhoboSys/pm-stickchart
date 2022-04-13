"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomStateReducer = void 0;
class ZoomStateReducer {
    constructor(state) {
        this.state = state;
    }
    reduceState() {
        this.moveRenderDateRange();
        this.roundColumnIntervalSize();
        this.state.inputEvent.preventDefault();
        this.state.inputEvent.markAsHandled();
        return this.state;
    }
    moveRenderDateRange() {
        const { inputEvent: { event }, renderConfig: { dateRange }, } = this.state;
        const { deltaY } = event;
        const zoomValue = deltaY * (dateRange.duration * 0.001);
        dateRange.moveRangeInMilliseconds(-zoomValue, zoomValue);
    }
    roundColumnIntervalSize() {
        const { renderConfig: { dateRange, columnIntervalSize }, } = this.state;
        const duration = columnIntervalSize.asMilliseconds() * 7;
        if (dateRange.duration < duration) {
            columnIntervalSize.subtract(columnIntervalSize.asMilliseconds() / 2, 'milliseconds');
            return;
        }
        if (dateRange.getIntervalsCount(duration) < 2)
            return;
        columnIntervalSize.add(columnIntervalSize.asMilliseconds(), 'milliseconds');
    }
}
exports.ZoomStateReducer = ZoomStateReducer;
//# sourceMappingURL=store.zoom.reducer.js.map