"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridView = void 0;
const graphics_1 = require("@pixi/graphics");
const text_1 = require("@pixi/text");
const utils_1 = require("../../utils");
const utils_formatDateMarkText_1 = require("../../utils/utils.formatDateMarkText");
class GridView {
    constructor(state, viewport) {
        this.state = state;
        this.viewport = viewport;
        this.buildedGrid = new graphics_1.Graphics();
        this.columnsCount = this.getColumnsCount();
        this.rowsCount = this.getRowsCount();
        this.columnWhitespace = this.getColumnWhitespace();
        this.rowWhitespace = this.getRowWhitespace();
        this.beginColumnWhitespace = this.getBeginColumnWhitespace();
    }
    get realHeight() {
        const { basicConfig } = this.state;
        return basicConfig.height - basicConfig.style.gridBottomPadding;
    }
    getBeginColumnWhitespace() {
        const { basicConfig: { dateRange }, renderConfig: { dateRange: renderDateRange, columnIntervalSize }, } = this.state;
        const distance = utils_1.DateRange.getBeginDistance(dateRange, renderDateRange);
        const point = Math.abs(distance) / columnIntervalSize % 1;
        const absolutePoint = distance < 0 ? point : 1 - point;
        return absolutePoint * this.columnWhitespace;
    }
    getColumnWhitespace() {
        return this.state.basicConfig.width / this.columnsCount;
    }
    getRowWhitespace() {
        return this.realHeight / this.rowsCount;
    }
    getColumnsCount() {
        const { dateRange, columnIntervalSize } = this.state.renderConfig;
        return dateRange.getIntervalsCount(columnIntervalSize);
    }
    getRowsCount() {
        const { priceRange: valueRange, rowIntervalSize } = this.state.renderConfig;
        return valueRange.getIntervalsCount(rowIntervalSize);
    }
    render() {
        this.build();
        this.viewport.render(this.buildedGrid, GridView.renderKey);
    }
    build() {
        this.buildVerticalLines();
        this.buildHorizontalLines();
        this.buildPriceMarks();
        this.buildDateMarks();
    }
    buildVerticalLines() {
        const { columnsCount, columnWhitespace, beginColumnWhitespace, realHeight } = this;
        const coords = [beginColumnWhitespace];
        for (let i = 0; i < columnsCount; i++) {
            const x = coords[i];
            coords[i + 1] = x + columnWhitespace;
            this.buildLine([x, 0], [x, realHeight]);
        }
    }
    buildHorizontalLines() {
        const { rowsCount, rowWhitespace, state: { basicConfig: { width } } } = this;
        for (let i = 0; i < rowsCount; i++) {
            const y = i * rowWhitespace;
            this.buildLine([0, y], [width, y]);
        }
    }
    buildLine([x1, y1], [x2, y2]) {
        const { gridColor, gridOpacity, gridWidth } = this.state.basicConfig.style;
        const line = new graphics_1.Graphics()
            .lineStyle({ width: gridWidth, color: gridColor, alpha: gridOpacity })
            .moveTo(x1, y1)
            .lineTo(x2, y2);
        this.buildedGrid.addChild(line);
    }
    buildPriceMarks() {
        var _a, _b, _c, _d;
        const { rowsCount, rowWhitespace, state: { basicConfig: { width, style }, renderConfig: { priceRange, rowIntervalSize }, }, } = this;
        const topPrice = priceRange.range.to;
        const textGraphics = (text) => new text_1.Text(text, style.markStyle);
        for (let i = 0; i < rowsCount; i++) {
            const bottomPadding = (_b = (_a = style.markStyle) === null || _a === void 0 ? void 0 : _a.horizontalBottomPadding) !== null && _b !== void 0 ? _b : 0;
            const rightPadding = (_c = style.markStyle.horizontalRightPadding) !== null && _c !== void 0 ? _c : 0;
            const text = (topPrice - i * rowIntervalSize).toFixed(3);
            const graphics = textGraphics(text);
            graphics.resolution = 2;
            graphics.y = i * rowWhitespace - graphics.height - bottomPadding;
            graphics.x = width - graphics.width - rightPadding;
            graphics.alpha = (_d = style.markStyle.alpha) !== null && _d !== void 0 ? _d : 1;
            this.buildedGrid.addChild(graphics);
        }
    }
    buildDateMarks() {
        var _a, _b, _c;
        const { columnsCount, columnWhitespace, beginColumnWhitespace, state: { basicConfig: { width, style, height }, renderConfig: { dateRange, columnIntervalSize }, }, } = this;
        const coords = [beginColumnWhitespace];
        const leftDate = dateRange.range.from.valueOf();
        const textGraphics = (text) => new text_1.Text(text, style.markStyle);
        for (let i = 0; i < columnsCount; i++) {
            const x = coords[i];
            coords[i + 1] = x + columnWhitespace;
            const bottomPadding = (_b = (_a = style.markStyle) === null || _a === void 0 ? void 0 : _a.verticalBottomPadding) !== null && _b !== void 0 ? _b : 0;
            const text = (0, utils_formatDateMarkText_1.formatDateMarkText)(new Date(leftDate + x / width * dateRange.length), columnIntervalSize);
            const graphics = textGraphics(text);
            graphics.resolution = 2;
            graphics.x = x - graphics.width / 2;
            graphics.y = height - bottomPadding - graphics.height;
            graphics.alpha = (_c = style.markStyle.alpha) !== null && _c !== void 0 ? _c : 1;
            this.buildedGrid.addChild(graphics);
        }
    }
}
exports.GridView = GridView;
GridView.renderKey = 'grid_graphics';
//# sourceMappingURL=store.grid.view.js.map