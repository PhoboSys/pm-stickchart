"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const graphics_1 = require("@pixi/graphics");
const utils_1 = require("../utils/");
class Grid extends graphics_1.Graphics {
    constructor({ width, height, dateRange, renderDateRange, columnIntervalSize, valueRange, rowIntervalSize }) {
        super();
        this.screenWidth = width;
        this.screenHeight = height;
        this.dateRange = dateRange;
        this.renderDateRange = renderDateRange;
        this.columnIntervalSize = columnIntervalSize;
        this.valueRange = valueRange;
        this.rowIntervalSize = rowIntervalSize;
    }
    get beginColumnWhitespace() {
        const { renderDateRange, dateRange, columnIntervalSize } = this;
        const distance = utils_1.DateRange.getBeginDistance(dateRange, renderDateRange);
        const segment = columnIntervalSize.asMilliseconds();
        const point = 1 - (distance / segment % 1);
        return point * this.columnWhitespace;
    }
    get columnWhitespace() {
        const { screenWidth, renderDateRange, columnIntervalSize } = this;
        return screenWidth / renderDateRange.getIntervalsCount(columnIntervalSize);
    }
    get rowWhitespace() {
        const { screenHeight, valueRange, rowIntervalSize } = this;
        return screenHeight / valueRange.getIntervalsCount(rowIntervalSize);
    }
    get columnsCount() {
        return this.renderDateRange.getIntervalsCount(this.columnIntervalSize);
    }
    get rowsCount() {
        return this.valueRange.getIntervalsCount(this.rowIntervalSize);
    }
    build() {
        this.buildVerticalLines();
        this.buildHorizontalLines();
        return this;
    }
    buildVerticalLines() {
        const { columnsCount, columnWhitespace, screenHeight, beginColumnWhitespace } = this;
        const coords = [beginColumnWhitespace];
        for (let i = 0; i < columnsCount; i++) {
            const pos = coords[i];
            coords[i + 1] = pos + columnWhitespace;
            const line = new graphics_1.Graphics();
            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(pos, 0)
                .lineTo(pos, screenHeight);
            super.addChild(line);
        }
    }
    buildHorizontalLines() {
        const { rowsCount, rowWhitespace, screenWidth } = this;
        for (let i = 0; i < rowsCount; i++) {
            const pos = i * rowWhitespace;
            const line = new graphics_1.Graphics();
            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(0, pos)
                .lineTo(screenWidth, pos)
                .endFill();
            super.addChild(line);
        }
    }
}
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map