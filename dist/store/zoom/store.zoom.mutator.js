"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomStateMutator = void 0;
class ZoomStateMutator {
    constructor(state) {
        this.state = state;
    }
    mutateState() {
        this.moveRenderDateRange();
        return this.state;
    }
    moveRenderDateRange() {
        const { zoomEvent, renderDateRange, columnIntervalSize } = this.state;
        const { deltaY } = zoomEvent;
        console.log(zoomEvent);
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
exports.ZoomStateMutator = ZoomStateMutator;
//# sourceMappingURL=store.zoom.mutator.js.map