"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const store_candlestick_middleware_1 = require("../store/candlestick/store.candlestick.middleware");
const store_grid_middleware_1 = require("../store/grid/store.grid.middleware");
const store_zoom_middleware_1 = require("../store/zoom/store.zoom.middleware");
const core_middlewareRunner_1 = require("./core.middlewareRunner");
const core_viewport_1 = require("./core.viewport");
class StickChart {
    constructor(width, height, dateRange, renderDateRange, columnIntervalSize, stickIntervalWidth, valueRange, rowIntervalSize, renderSticks = []) {
        this.width = width;
        this.height = height;
        this.dateRange = dateRange;
        this.renderDateRange = renderDateRange;
        this.columnIntervalSize = columnIntervalSize;
        this.stickIntervalWidth = stickIntervalWidth;
        this.valueRange = valueRange;
        this.rowIntervalSize = rowIntervalSize;
        this.renderSticks = renderSticks;
        this.middlewareRunner = new core_middlewareRunner_1.MiddlewareRunner();
        this.middlewareRunner.add(new store_zoom_middleware_1.ZoomHandleMiddleware());
        this.middlewareRunner.add(new store_grid_middleware_1.GridViewMiddleware());
        this.middlewareRunner.add(new store_candlestick_middleware_1.CandleStickMiddleware());
    }
    set setZoomEvent(event) {
        this.state.zoomEvent = event;
    }
    createState() {
        const state = {
            width: this.width,
            height: this.height,
            dateRange: this.dateRange,
            renderDateRange: this.renderDateRange,
            columnIntervalSize: this.columnIntervalSize,
            stickIntervalWidth: this.stickIntervalWidth,
            valueRange: this.valueRange,
            rowIntervalSize: this.rowIntervalSize,
            renderSticks: this.renderSticks,
            zoomEvent: undefined,
        };
        this.state = state;
    }
    createViewport(container) {
        this.viewport = new core_viewport_1.Viewport(container);
    }
    create(container) {
        this.createViewport(container);
        this.createState();
    }
    render() {
        this.throwIfNotCreatedState();
        this.middlewareRunner.run(this.viewport, this.state);
    }
    addStick(...stick) {
        this.renderSticks.unshift(...stick);
    }
    zoomHandler(event) {
        this.setZoomEvent = event;
        this.render();
    }
    throwIfNotCreatedState() {
        if (this.state === undefined) {
            throw new Error('Expected to call this.create() before');
        }
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=core.stickChart.js.map