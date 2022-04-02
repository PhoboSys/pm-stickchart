"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const graphics_1 = require("@pixi/graphics");
const CandleStick_1 = require("./CandleStick");
const Grid_1 = require("./Grid");
class StickChart {
    constructor({ width, height, dateRange, renderDateRange, segmentDateInterval, stickDateInterval, valueRange, valueInterval, }) {
        this.candleSticks = [];
        this.width = width;
        this.height = height;
        this.dateRange = dateRange;
        this.renderDateRange = renderDateRange;
        this.segmentDateInterval = segmentDateInterval;
        this.stickDateInterval = stickDateInterval;
        this.valueRange = valueRange;
        this.valueInterval = valueInterval;
    }
    get segmentWidth() {
        return this.width / this.verticalSegmentsCount;
    }
    get segmentHeight() {
        return this.height / this.horizontalSegmentsCount;
    }
    get horizontalSegmentsCount() {
        const horizontalSegmentsCount = this.valueRange.value / this.valueInterval;
        if (horizontalSegmentsCount < 1) {
            throw new Error('ValueRange could\'t be smaller than the ValueInterval. It should contain at least 1 Interval');
        }
        return horizontalSegmentsCount;
    }
    get verticalSegmentsCount() {
        const { renderDateRange, segmentDateInterval } = this;
        const verticalSegmentsCount = renderDateRange.milliseconds / segmentDateInterval.asMilliseconds();
        if (verticalSegmentsCount < 1) {
            throw new Error('DateRange could\'t be smaller than the Interval. It should contain at least 1 Interval');
        }
        return verticalSegmentsCount;
    }
    get firstVerticalSegmentX() {
        const { renderDateRange, dateRange, segmentDateInterval } = this;
        const distance = renderDateRange.from.valueOf() - dateRange.from.valueOf();
        const segment = segmentDateInterval.asMilliseconds();
        const point = 1 - (distance / segment % 1);
        return point * this.segmentWidth;
    }
    get firstHorizontalSegmentY() {
        return 0;
    }
    appendRenderStickChart() {
        const renderStickChart = {
            width: this.width,
            height: this.height,
            verticalSegmentsCount: this.verticalSegmentsCount,
            horizontalSegmentsCount: this.horizontalSegmentsCount,
            segmentWidth: this.segmentWidth,
            segmentHeight: this.segmentHeight,
            firstVerticalSegmentX: this.firstVerticalSegmentX,
            firstHorizontalSegmentY: this.firstHorizontalSegmentY,
            dateRange: this.dateRange,
            renderDateRange: this.renderDateRange,
            segmentDateInterval: this.segmentDateInterval,
            stickDateInterval: this.stickDateInterval,
            valueRange: this.valueRange,
            valueInterval: this.valueInterval,
        };
        this.renderStickChart = renderStickChart;
    }
    cacheBuild() {
        this.appendRenderStickChart();
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
        const grid = new Grid_1.Grid(this.renderStickChart);
        return grid.build();
    }
    buildSticks() {
        const builded = new graphics_1.Graphics();
        for (const iStick of this.candleSticks) {
            const stick = new CandleStick_1.CandleStick(iStick, this.renderStickChart);
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