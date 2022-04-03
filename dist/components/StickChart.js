"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const graphics_1 = require("@pixi/graphics");
const CandleStick_1 = require("./CandleStick");
const Grid_1 = require("./Grid");
class StickChart {
    constructor(init) {
        this.buildedChart = new graphics_1.Graphics();
        this.candleSticks = [];
        Object.assign(this, init);
    }
    viewport(container) {
        container.addChild(this.buildedChart);
    }
    zoomEventHandler(event) {
        event.preventDefault();
        const { /*offsetX,*/ deltaY } = event;
        const { renderDateRange } = this;
        const zoomValue = deltaY * (renderDateRange.duration * 0.001);
        renderDateRange.moveRangeInMilliseconds(-zoomValue, zoomValue);
        const { columnIntervalSize } = this;
        const intervalCount = renderDateRange.getIntervalsCount(columnIntervalSize);
        if (intervalCount > 15) {
            columnIntervalSize.add(columnIntervalSize.asMilliseconds(), 'milliseconds');
        }
        if (intervalCount < 7) {
            columnIntervalSize.subtract(columnIntervalSize.asMilliseconds() / 2, 'milliseconds');
        }
        // eslint-disable-next-line no-console
        console.log(intervalCount, columnIntervalSize.asMilliseconds());
        this.cacheBuild();
    }
    cacheBuild() {
        const grid = this.buildGrid();
        const sticks = this.buildSticks();
        this.buildedGrid = grid;
        this.buildedSticks = sticks;
        this.buildedChart.removeChildren();
        this.buildedChart
            .addChild(grid)
            .addChild(sticks);
        return this.buildedChart;
    }
    buildGrid() {
        const { width, height, dateRange, renderDateRange, columnIntervalSize, valueRange, rowIntervalSize, } = this;
        const grid = new Grid_1.Grid({
            width,
            height,
            dateRange,
            renderDateRange,
            columnIntervalSize,
            valueRange,
            rowIntervalSize,
        });
        return grid.build();
    }
    buildSticks() {
        const builded = new graphics_1.Graphics();
        for (const iStick of this.candleSticks) {
            const { width, height, renderDateRange, stickIntervalWidth, valueRange, } = this;
            const stick = new CandleStick_1.CandleStick(Object.assign(Object.assign({}, iStick), { width,
                height,
                renderDateRange,
                stickIntervalWidth,
                valueRange }));
            builded.addChild(stick.build());
        }
        return builded;
    }
    clear() {
        this.buildedChart.removeChildren();
    }
    rebuild() {
        if (this.buildedGrid === undefined || this.buildedSticks === undefined) {
            throw Error('Expected to call this.cacheBuild() before');
        }
        this.buildedChart.removeChildren();
        this.buildedChart
            .addChild(this.buildedSticks)
            .addChild(this.buildedGrid);
        return this.buildedChart;
    }
    addCandleStick(candleStick) {
        this.candleSticks.push(candleStick);
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=StickChart.js.map