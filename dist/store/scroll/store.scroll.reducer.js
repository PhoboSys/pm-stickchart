"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollStateReducer = void 0;
class ScrollStateReducer {
    constructor(state, previousEvent) {
        this.state = state;
        this.previousEvent = previousEvent;
    }
    reduceState() {
        var _a;
        this.moveRenderDateRange();
        (_a = this.state.inputEvent) === null || _a === void 0 ? void 0 : _a.preventDefault();
        return this.state;
    }
    moveRenderDateRange() {
        const { xShift, state: { renderConfig: { dateRange }, viewConfig: { width } } } = this;
        const scrollValue = (xShift / width * dateRange.length);
        dateRange.moveInMilliseconds(scrollValue, scrollValue);
    }
    get xShift() {
        var _a;
        const { previousEvent, state } = this;
        const event = (_a = state.inputEvent) === null || _a === void 0 ? void 0 : _a.event;
        if (previousEvent === null || previousEvent.mouseX !== event.mouseX) {
            return event.mouseX - event.dragX;
        }
        return previousEvent.dragX - event.dragX;
    }
}
exports.ScrollStateReducer = ScrollStateReducer;
//# sourceMappingURL=store.scroll.reducer.js.map