"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridView = void 0;
const graphics_1 = require("@pixi/graphics");
const utils_1 = require("../../utils");
class GridView {
    constructor(state, viewport) {
        this.state = state;
        this.viewport = viewport;
        this.buildedGrid = new graphics_1.Graphics();
    }
    render() {
        this.build();
        this.viewport.render(this.buildedGrid, GridView.renderKey);
    }
    get beginColumnWhitespace() {
        const { viewConfig: { dateRange }, renderConfig: { dateRange: renderDateRange, columnIntervalSize }, } = this.state;
        const distance = utils_1.DateRange.getBeginDistance(dateRange, renderDateRange);
        const segment = columnIntervalSize.asMilliseconds();
        const point = (Math.abs(distance) / segment % 1);
        const absolutePoint = distance < 0 ? point : 1 - point;
        return absolutePoint * this.columnWhitespace;
    }
    get columnWhitespace() {
        const { viewConfig: { width }, renderConfig: { dateRange, columnIntervalSize }, } = this.state;
        return width / dateRange.getIntervalsCount(columnIntervalSize.asMilliseconds());
    }
    get rowWhitespace() {
        const { viewConfig: { height }, renderConfig: { valueRange, rowIntervalSize }, } = this.state;
        return height / valueRange.getIntervalsCount(rowIntervalSize);
    }
    get columnsCount() {
        const { dateRange, columnIntervalSize } = this.state.renderConfig;
        return dateRange.getIntervalsCount(columnIntervalSize.asMilliseconds());
    }
    get rowsCount() {
        const { valueRange, rowIntervalSize } = this.state.renderConfig;
        return valueRange.getIntervalsCount(rowIntervalSize);
    }
    build() {
        this.buildVerticalLines();
        this.buildHorizontalLines();
    }
    buildVerticalLines() {
        const { columnsCount, columnWhitespace, beginColumnWhitespace, state: { viewConfig: { height } } } = this;
        const coords = [beginColumnWhitespace];
        for (let i = 0; i < columnsCount; i++) {
            const x = coords[i];
            coords[i + 1] = x + columnWhitespace;
            this.buildLine([x, 0], [x, height]);
        }
    }
    buildHorizontalLines() {
        const { rowsCount, rowWhitespace, state: { viewConfig: { width } } } = this;
        for (let i = 0; i < rowsCount; i++) {
            const y = i * rowWhitespace;
            this.buildLine([0, y], [width, y]);
        }
    }
    buildLine([x1, y1], [x2, y2]) {
        const { gridColor, gridOpacity, gridWidth } = this.state.style;
        const line = (new graphics_1.Graphics())
            .lineStyle({ width: gridWidth, color: gridColor, alpha: gridOpacity })
            .moveTo(x1, y1)
            .lineTo(x2, y2);
        this.buildedGrid.addChild(line);
    }
}
exports.GridView = GridView;
GridView.renderKey = 'grid_graphics';
//# sourceMappingURL=store.grid.view.js.map