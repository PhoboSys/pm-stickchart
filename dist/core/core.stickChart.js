"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const maps_1 = require("../data/maps");
const defaults_1 = require("../defaults");
const pixi_1 = require("../libs/pixi");
const store_candlestick_middleware_1 = require("../store/candlestick/store.candlestick.middleware");
const store_data_middleware_1 = require("../store/data/store.data.middleware");
const store_grid_middleware_1 = require("../store/grid/store.grid.middleware");
const store_intervals_middleware_1 = require("../store/intervals/store.intervals.middleware");
const store_lines_middleware_1 = require("../store/lines/store.lines.middleware");
const store_scroll_middleware_1 = require("../store/scroll/store.scroll.middleware");
const store_zoom_middleware_1 = require("../store/zoom/store.zoom.middleware");
const utils_1 = require("../utils");
const utils_inputEvent_1 = require("../utils/utils.inputEvent");
const core_middlewareRunner_1 = require("./core.middlewareRunner");
const core_viewport_1 = require("./core.viewport");
class StickChart {
    constructor(width, height, chartType, stickIntervalSize, columnIntervalSize = defaults_1.defaultColumnIntervalSize, style = defaults_1.defaultStickChartStyle, dateRange = (0, defaults_1.defaultChartDateRange)(), data = defaults_1.defaultStickChartData) {
        this.width = width;
        this.height = height;
        this.chartType = chartType;
        this.stickIntervalSize = stickIntervalSize;
        this.columnIntervalSize = columnIntervalSize;
        this.style = style;
        this.dateRange = dateRange;
        this.data = data;
        this.middlewareRunner = new core_middlewareRunner_1.MiddlewareRunner();
        this.application = new pixi_1.Application(Object.assign(Object.assign({ width, height }, style), { antialias: true }));
        this.application.start();
        this.middlewareRunner.add(new store_data_middleware_1.DataMiddleware());
        this.middlewareRunner.add(new store_zoom_middleware_1.ZoomHandleMiddleware());
        this.middlewareRunner.add(new store_scroll_middleware_1.ScrollHandleMiddleware());
        this.middlewareRunner.add(new store_intervals_middleware_1.IntervalsHandlerMiddleware());
        this.middlewareRunner.add(new store_grid_middleware_1.GridViewMiddleware());
        this.middlewareRunner.add(new store_lines_middleware_1.LinesViewMiddleware());
        this.middlewareRunner.add(new store_candlestick_middleware_1.CandleStickMiddleware());
    }
    get view() {
        return this.application.view;
    }
    createViewConfig() {
        return {
            width: this.width,
            height: this.height,
            stickIntervalSize: this.stickIntervalSize,
            columnIntervalSize: this.columnIntervalSize,
            dateRange: this.dateRange,
        };
    }
    createDataManager() {
        var _a, _b;
        const chartType = (_b = (_a = this.state) === null || _a === void 0 ? void 0 : _a.chartType) !== null && _b !== void 0 ? _b : this.chartType;
        const rawDataMapper = maps_1.rawDataMappersMap[chartType];
        const newRawDataMapper = maps_1.newRawDataMappersMap[chartType];
        return new utils_1.DataManager(this.data, (raw) => rawDataMapper(raw, this.viewConfig.stickIntervalSize), (data, raw) => newRawDataMapper(data, raw, this.viewConfig.stickIntervalSize));
    }
    createState() {
        return {
            viewConfig: this.viewConfig,
            chartType: this.chartType,
            style: this.style,
            dataManager: this.createDataManager(),
            renderConfig: Object.assign(Object.assign({ priceRange: defaults_1.defaultChartPriceRange, rowIntervalSize: defaults_1.defaultIntervalRowSize }, this.viewConfig), { dateRange: this.viewConfig.dateRange.clone() }),
        };
    }
    createViewport() {
        return new core_viewport_1.Viewport(this.application.stage);
    }
    create() {
        this.viewport = this.createViewport();
        this.viewConfig = this.createViewConfig();
        this.state = this.createState();
    }
    render() {
        this.throwIfNotCreatedState();
        this.middlewareRunner.run(this.viewport, this.state);
        return this;
    }
    setChartType(type) {
        this.state.chartType = type;
        this.state.dataManager = this.createDataManager();
        return this;
    }
    addData(rawPricePoint) {
        this.data.push(rawPricePoint);
        this.state.dataManager.addData(rawPricePoint);
        return this;
    }
    addInputEventHandler(event, type) {
        this.state.inputEvent = new utils_inputEvent_1.ChartInputEvent(event, type);
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