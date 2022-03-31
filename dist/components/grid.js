"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const graphics_1 = require("@pixi/graphics");
class Grid extends graphics_1.Graphics {
    constructor({ width, height, renderDateRange, dateRange, segmentDateInterval, stickDateInterval, valueInterval, valueRange, }) {
        super();
        this.gridWidth = width;
        this.gridHeight = height;
        this.dateRange = dateRange;
        this.renderDateRange = renderDateRange;
        this.segmentDateInterval = segmentDateInterval;
        this.stickDateInterval = stickDateInterval;
        this.valueRange = valueRange;
        this.valueInterval = valueInterval;
    }
    get segmentWidth() {
        return this.gridWidth / this.verticalSegmentsCount();
    }
    get segmentHeight() {
        return this.gridHeight / this.horizontalSegmentsCount();
    }
    get firstSegmentX() {
        const point = ((this.renderDateRange.from.valueOf() - this.dateRange.from.valueOf()) / this.segmentDateInterval.asMilliseconds()) % 1;
        return point * this.segmentWidth;
    }
    build() {
        this.buildVerticalLines();
        this.buildHorizontalLines();
        return this;
    }
    buildVerticalLines() {
        const coords = [this.firstSegmentX];
        const verticalSegmentsCount = this.verticalSegmentsCount();
        const widthForSegment = this.segmentWidth;
        for (let i = 0; i < verticalSegmentsCount; i++) {
            const pos = coords[i];
            coords[i + 1] = pos + widthForSegment;
            const line = new graphics_1.Graphics();
            line
                .lineStyle({ width: 1, color: 0xFFFF })
                .moveTo(pos, 0)
                .lineTo(pos, this.gridHeight);
            super.addChild(line);
        }
    }
    buildHorizontalLines() {
        const horizontalSegmentsCount = this.horizontalSegmentsCount();
        for (let i = 0; i < horizontalSegmentsCount; i++) {
            const pos = i * this.segmentHeight;
            const line = new graphics_1.Graphics();
            line
                .lineStyle({ width: 1, color: 0xFFFF })
                .moveTo(0, pos)
                .lineTo(this.gridWidth, pos)
                .endFill();
            super.addChild(line);
        }
    }
    verticalSegmentsCount() {
        const verticalSegmentsCount = this.renderDateRange.milliseconds / this.segmentDateInterval.asMilliseconds();
        if (verticalSegmentsCount < 1) {
            throw new Error('DateRange could\'t be smaller than the Interval. It should contain 1 or more intervals');
        }
        return verticalSegmentsCount;
    }
    horizontalSegmentsCount() {
        const horizontalSegmentsCount = this.valueRange.value / this.valueInterval;
        if (horizontalSegmentsCount < 1) {
            throw new Error('DateRange could\'t be smaller than the Interval. It should contain 1 or more intervals');
        }
        return horizontalSegmentsCount;
    }
}
exports.Grid = Grid;
//# sourceMappingURL=grid.js.map