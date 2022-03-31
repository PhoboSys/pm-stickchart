"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const graphics_1 = require("@pixi/graphics");
class Grid {
    constructor(stickChart) {
        this.stickChart = stickChart;
    }
    draw(container) {
        const verticalSegmentsCount = this.verticalSegmentsCount();
        for (let i = 0; i < verticalSegmentsCount; i++) {
            const pos = i * this.widthForSegment();
            const line = new graphics_1.Graphics();
            line.lineStyle({ width: 1, color: 0xFFFF }).moveTo(pos, 0).lineTo(pos, this.stickChart.height).endFill();
            container.addChild(line);
        }
    }
    widthForSegment() {
        return this.stickChart.width / this.verticalSegmentsCount();
    }
    verticalSegmentsCount() {
        const verticalSegmentsCount = this.stickChart.dateRange.milliseconds / this.stickChart.segmentDateInterval.milliseconds;
        if (verticalSegmentsCount < 1) {
            throw new Error('DateRange could\'t be smaller than the Interval. It should contain 1 or more intervals');
        }
        return verticalSegmentsCount;
    }
}
exports.Grid = Grid;
//# sourceMappingURL=grid.js.map