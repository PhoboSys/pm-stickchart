"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const store_grid_middleware_1 = require("../store/grid/store.grid.middleware");
const core_middlewareHandler_1 = require("./core.middlewareHandler");
const core_viewport_1 = require("./core.viewport");
class StickChart {
    constructor(width, height, dateRange, renderDateRange, columnIntervalSize, stickIntervalWidth, valueRange, rowIntervalSize) {
        this.width = width;
        this.height = height;
        this.dateRange = dateRange;
        this.renderDateRange = renderDateRange;
        this.columnIntervalSize = columnIntervalSize;
        this.stickIntervalWidth = stickIntervalWidth;
        this.valueRange = valueRange;
        this.rowIntervalSize = rowIntervalSize;
        this.handler = new core_middlewareHandler_1.MiddlewareHandler();
        this.handler.add(new store_grid_middleware_1.GridViewMiddleware());
    }
    set setViewport(container) {
        this.viewport = new core_viewport_1.Viewport(container);
    }
    render() {
        const state = {
            v: 0,
            width: this.width,
            height: this.height,
            dateRange: this.dateRange,
            renderDateRange: this.renderDateRange,
            columnIntervalSize: this.columnIntervalSize,
            stickIntervalWidth: this.stickIntervalWidth,
            valueRange: this.valueRange,
            rowIntervalSize: this.rowIntervalSize,
        };
        this.handler.next(this.viewport, state);
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=core.stickChart.js.map