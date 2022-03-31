"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const graphics_1 = require("@pixi/graphics");
class Grid extends graphics_1.Graphics {
    constructor({ width, height, dateRange, segmentDateInterval, stickDateInterval, valueInterval, valueRange }) {
        super();
        this.gridWidth = width;
        this.gridHeight = height;
        this.dateRange = dateRange;
        this.segmentDateInterval = segmentDateInterval;
        this.stickDateInterval = stickDateInterval;
        this.valueRange = valueRange;
        this.valueInterval = valueInterval;
    }
    build() {
        this.buildVerticalLines();
        this.buildHorizontalLines();
        return this;
    }
    buildVerticalLines() {
        const verticalSegmentsCount = this.verticalSegmentsCount();
        for (let i = 0; i < verticalSegmentsCount; i++) {
            const pos = i * this.widthForSegment();
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
            const pos = i * this.heightForSegment();
            const line = new graphics_1.Graphics();
            line
                .lineStyle({ width: 1, color: 0xFFFF })
                .moveTo(0, pos)
                .lineTo(this.gridWidth, pos)
                .endFill();
            super.addChild(line);
        }
    }
    widthForSegment() {
        return this.gridWidth / this.verticalSegmentsCount();
    }
    heightForSegment() {
        return this.gridHeight / this.horizontalSegmentsCount();
    }
    verticalSegmentsCount() {
        const verticalSegmentsCount = this.dateRange.milliseconds / this.segmentDateInterval.milliseconds;
        if (verticalSegmentsCount < 1) {
            throw new Error('DateRange could\'t be smaller than the Interval. It should contain 1 or more intervals');
        }
        return verticalSegmentsCount;
    }
    horizontalSegmentsCount() {
        const horizontalSegmentsCount = this.valueRange.value / this.valueInterval.value;
        if (horizontalSegmentsCount < 1) {
            throw new Error('DateRange could\'t be smaller than the Interval. It should contain 1 or more intervals');
        }
        return horizontalSegmentsCount;
    }
}
exports.Grid = Grid;
//# sourceMappingURL=grid.js.map