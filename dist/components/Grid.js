"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const graphics_1 = require("@pixi/graphics");
class Grid extends graphics_1.Graphics {
    constructor(stickChart) {
        super();
        this.stickChart = stickChart;
    }
    build() {
        this.buildVerticalLines();
        this.buildHorizontalLines();
        return this;
    }
    buildVerticalLines() {
        const { verticalSegmentsCount, segmentWidth, height, firstVerticalSegmentX } = this.stickChart;
        const coords = [firstVerticalSegmentX];
        for (let i = 0; i < verticalSegmentsCount; i++) {
            const pos = coords[i];
            coords[i + 1] = pos + segmentWidth;
            const line = new graphics_1.Graphics();
            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(pos, 0)
                .lineTo(pos, height);
            super.addChild(line);
        }
    }
    buildHorizontalLines() {
        const { horizontalSegmentsCount, segmentHeight, width } = this.stickChart;
        for (let i = 0; i < horizontalSegmentsCount; i++) {
            const pos = i * segmentHeight;
            const line = new graphics_1.Graphics();
            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(0, pos)
                .lineTo(width, pos)
                .endFill();
            super.addChild(line);
        }
    }
}
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map