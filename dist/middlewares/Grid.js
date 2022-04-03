"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridBuilderMiddleware = void 0;
const graphics_1 = require("@pixi/graphics");
const __1 = require("..");
class GridBuilderMiddleware {
    handle(options, handler) {
        Object.assign(this, options);
        this.build();
        return handler.next(options);
    }
    get beginColumnWhitespace() {
        const { renderDateRange, dateRange, columnIntervalSize } = this;
        const distance = __1.DateRange.getBeginDistance(dateRange, renderDateRange);
        const segment = columnIntervalSize.asMilliseconds();
        const point = 1 - (distance / segment % 1);
        return point * this.columnWhitespace;
    }
    get columnWhitespace() {
        const { width, renderDateRange, columnIntervalSize } = this;
        return width / renderDateRange.getIntervalsCount(columnIntervalSize);
    }
    get rowWhitespace() {
        const { height, valueRange, rowIntervalSize } = this;
        return height / valueRange.getIntervalsCount(rowIntervalSize);
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
    }
    buildVerticalLines() {
        const { columnsCount, columnWhitespace, height, beginColumnWhitespace, viewport } = this;
        const coords = [beginColumnWhitespace];
        for (let i = 0; i < columnsCount; i++) {
            const pos = coords[i];
            coords[i + 1] = pos + columnWhitespace;
            const line = new graphics_1.Graphics();
            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(pos, 0)
                .lineTo(pos, height);
            viewport.addChild(line);
        }
    }
    buildHorizontalLines() {
        const { rowsCount, rowWhitespace, width, viewport } = this;
        for (let i = 0; i < rowsCount; i++) {
            const pos = i * rowWhitespace;
            const line = new graphics_1.Graphics();
            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(0, pos)
                .lineTo(width, pos)
                .endFill();
            viewport.addChild(line);
        }
    }
}
exports.GridBuilderMiddleware = GridBuilderMiddleware;
//# sourceMappingURL=Grid.js.map