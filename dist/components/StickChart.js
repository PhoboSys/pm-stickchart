"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const graphics_1 = require("@pixi/graphics");
const CandleStick_1 = require("./CandleStick");
const Grid_1 = require("./Grid");
class StickChart {
    constructor({ width, height, dateRange, renderDateRange, columnIntervalSize, stickIntervalWidth, valueRange, rowIntervalSize, }) {
        this.candleSticks = [];
        this.width = width;
        this.height = height;
        this.dateRange = dateRange;
        this.renderDateRange = renderDateRange;
        this.columnIntervalSize = columnIntervalSize;
        this.stickIntervalWidth = stickIntervalWidth;
        this.valueRange = valueRange;
        this.rowIntervalSize = rowIntervalSize;
    }
    cacheBuild() {
        const grid = this.buildGrid();
        const sticks = this.buildSticks();
        this.buildedGrid = grid;
        this.buildedSticks = sticks;
        const chart = new graphics_1.Graphics();
        chart
            .addChild(grid)
            .addChild(sticks);
        return chart;
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
    rebuild() {
        if (this.buildedGrid === undefined || this.buildedSticks === undefined) {
            throw Error('Expected to call this.cacheBuild() before');
        }
        const chart = new graphics_1.Graphics();
        chart
            .addChild(this.buildedSticks)
            .addChild(this.buildedGrid);
        return chart;
    }
    addCandleStick(candleStick) {
        this.candleSticks.push(candleStick);
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=StickChart.js.map