"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridView = void 0;
const graphics_1 = require("@pixi/graphics");
const utils_1 = require("../../utils");
class GridView {
    constructor(state, viewport) {
        this.state = state;
        this.viewport = viewport;
        this.renderKey = 'grid_graphics';
        this.buildedGrid = new graphics_1.Graphics();
    }
    render() {
        this.build();
        this.viewport.renderWithKey(this.buildedGrid, this.renderKey);
    }
    get beginColumnWhitespace() {
        const { renderDateRange, dateRange, columnIntervalSize } = this.state;
        const distance = utils_1.DateRange.getBeginDistance(dateRange, renderDateRange);
        const segment = columnIntervalSize.asMilliseconds();
        const point = 1 - (distance / segment % 1);
        return point * this.columnWhitespace;
    }
    get columnWhitespace() {
        const { width, renderDateRange, columnIntervalSize } = this.state;
        return width / renderDateRange.getIntervalsCount(columnIntervalSize);
    }
    get rowWhitespace() {
        const { height, valueRange, rowIntervalSize } = this.state;
        return height / valueRange.getIntervalsCount(rowIntervalSize);
    }
    get columnsCount() {
        const { renderDateRange, columnIntervalSize } = this.state;
        return renderDateRange.getIntervalsCount(columnIntervalSize);
    }
    get rowsCount() {
        const { valueRange, rowIntervalSize } = this.state;
        return valueRange.getIntervalsCount(rowIntervalSize);
    }
    build() {
        this.buildVerticalLines();
        this.buildHorizontalLines();
    }
    buildVerticalLines() {
        const { columnsCount, columnWhitespace, beginColumnWhitespace } = this;
        const coords = [beginColumnWhitespace];
        for (let i = 0; i < columnsCount; i++) {
            const pos = coords[i];
            coords[i + 1] = pos + columnWhitespace;
            const line = new graphics_1.Graphics();
            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(pos, 0)
                .lineTo(pos, this.state.height);
            this.buildedGrid.addChild(line);
        }
    }
    buildHorizontalLines() {
        const { rowsCount, rowWhitespace } = this;
        for (let i = 0; i < rowsCount; i++) {
            const pos = i * rowWhitespace;
            const line = new graphics_1.Graphics();
            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(0, pos)
                .lineTo(this.state.width, pos)
                .endFill();
            this.buildedGrid.addChild(line);
        }
    }
}
exports.GridView = GridView;
//# sourceMappingURL=store.grid.view.js.map