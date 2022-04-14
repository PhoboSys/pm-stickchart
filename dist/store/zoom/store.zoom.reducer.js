"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomStateReducer = void 0;
class ZoomStateReducer {
    constructor(state) {
        this.state = state;
    }
    reduceState() {
        this.moveRenderDateRange();
        this.state.inputEvent.preventDefault();
        this.state.inputEvent.markAsHandled();
        return this.state;
    }
    moveRenderDateRange() {
        const { inputEvent: { event }, renderConfig: { dateRange }, } = this.state;
        const { deltaY } = event;
        const zoomValue = deltaY * (dateRange.width * 0.001);
        dateRange.expandInMilliseconds(-zoomValue, zoomValue);
    }
}
exports.ZoomStateReducer = ZoomStateReducer;
//# sourceMappingURL=store.zoom.reducer.js.map