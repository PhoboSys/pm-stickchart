"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollStateReducer = void 0;
class ScrollStateReducer {
    constructor(state, previousEvent) {
        this.state = state;
        this.previousEvent = previousEvent;
    }
    reduceState() {
        this.moveRenderDateRange();
        return this.state;
    }
    moveRenderDateRange() {
        const { xShift, state: { renderDateRange } } = this;
        const scrollValue = xShift * (renderDateRange.duration * 0.001);
        renderDateRange.moveRangeInMilliseconds(scrollValue, scrollValue);
    }
    get xShift() {
        const { previousEvent, state } = this;
        const event = state.emittedEvent;
        if (previousEvent === null || previousEvent.mouseX !== event.mouseX) {
            return event.mouseX - event.dragX;
        }
        return previousEvent.dragX - event.dragX;
    }
}
exports.ScrollStateReducer = ScrollStateReducer;
//# sourceMappingURL=store.scroll.reducer.js.map