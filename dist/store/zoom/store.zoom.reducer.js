"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomStateReducer = void 0;
class ZoomStateReducer {
    constructor(state) {
        this.state = state;
    }
    reduceState() {
        var _a, _b;
        this.moveRenderDateRange();
        (_a = this.state.inputEvent) === null || _a === void 0 ? void 0 : _a.preventDefault();
        (_b = this.state.inputEvent) === null || _b === void 0 ? void 0 : _b.markAsHandled();
        return this.state;
    }
    moveRenderDateRange() {
        const { inputEvent, renderConfig: { dateRange }, } = this.state;
        const { deltaY } = inputEvent === null || inputEvent === void 0 ? void 0 : inputEvent.event;
        const zoomValue = deltaY * (dateRange.length * 0.001);
        dateRange.moveInMilliseconds(-zoomValue, zoomValue);
    }
}
exports.ZoomStateReducer = ZoomStateReducer;
//# sourceMappingURL=store.zoom.reducer.js.map