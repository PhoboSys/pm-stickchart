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
    constructor(options) {
        this.middlewareRunner = new core_middlewareRunner_1.MiddlewareRunner();
        this.registerInitConfig(options);
        this.application = this.createApplication();
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
    registerInitConfig(options) {
        const { width, height, style, stickIntervalSize, columnIntervalSize, dateRange, chartType, data } = options;
        const config = {
            width,
            height,
            style: style !== null && style !== void 0 ? style : defaults_1.defaultStickChartStyle,
            stickIntervalSize: stickIntervalSize !== null && stickIntervalSize !== void 0 ? stickIntervalSize : defaults_1.defaultStickIntervalSize,
            columnIntervalSize: columnIntervalSize !== null && columnIntervalSize !== void 0 ? columnIntervalSize : defaults_1.defaultColumnIntervalSize,
            dateRange: dateRange !== null && dateRange !== void 0 ? dateRange : (0, defaults_1.defaultChartDateRange)(),
            chartType: chartType !== null && chartType !== void 0 ? chartType : defaults_1.defaultStickChartType,
            data: data !== null && data !== void 0 ? data : defaults_1.defaultStickChartData,
        };
        this.initConfig = config;
    }
    createApplication() {
        const { initConfig: config } = this;
        return new pixi_1.Application(Object.assign(Object.assign(Object.assign({}, config), config.style), { antialias: true }));
    }
    createState() {
        const state = {
            chartType: this.initConfig.chartType,
            basicConfig: this.createBasicConfig(),
            renderConfig: this.createRenderConfig(),
            dataManager: this.createDataManager(),
        };
        return state;
    }
    createBasicConfig() {
        const { width, height, style, stickIntervalSize, dateRange } = this.initConfig;
        const basicConfig = {
            width,
            height,
            style,
            stickIntervalSize,
            dateRange: dateRange.clone(),
        };
        return basicConfig;
    }
    createRenderConfig() {
        const { dateRange, columnIntervalSize } = this.initConfig;
        const renderConfig = {
            columnIntervalSize,
            dateRange: dateRange.clone(),
            priceRange: defaults_1.defaultChartPriceRange,
            rowIntervalSize: defaults_1.defaultRowIntervalSize,
        };
        return renderConfig;
    }
    createDataManager() {
        var _a, _b;
        const { stickIntervalSize, data } = this.initConfig;
        const chartType = (_b = (_a = this.state) === null || _a === void 0 ? void 0 : _a.chartType) !== null && _b !== void 0 ? _b : this.initConfig.chartType;
        const rawDataMapper = maps_1.rawDataMappersMap[chartType];
        const newRawDataMapper = maps_1.newRawDataMappersMap[chartType];
        return new utils_1.DataManager(data, (raw) => rawDataMapper(raw, stickIntervalSize), (prevData, raw) => newRawDataMapper(prevData, raw, stickIntervalSize));
    }
    createViewport() {
        return new core_viewport_1.Viewport(this.application.stage);
    }
    create() {
        this.viewport = this.createViewport();
        this.state = this.createState();
        return this;
    }
    render() {
        this.throwIfStateNotCreated();
        this.middlewareRunner.run(this.viewport, this.state);
        return this;
    }
    setChartType(type) {
        this.state.chartType = type;
        this.state.dataManager = this.createDataManager();
        return this;
    }
    addData(rawPricePoint) {
        this.initConfig.data.push(rawPricePoint);
        this.state.dataManager.addData(rawPricePoint);
        return this;
    }
    addInputEventHandler(event, type) {
        this.state.inputEvent = new utils_inputEvent_1.ChartInputEvent(event, type);
        this.render();
    }
    throwIfStateNotCreated() {
        if (this.state !== undefined)
            return;
        throw new Error('Expected to call this.create() before');
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=core.stickChart.js.map