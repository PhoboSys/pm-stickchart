"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const maps_1 = require("../data/maps");
const map_dataToDateMappers_1 = require("../data/maps/map.dataToDateMappers");
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
const core_eventEmitter_1 = require("./core.eventEmitter");
const core_middlewareRunner_1 = require("./core.middlewareRunner");
const core_viewport_1 = require("./core.viewport");
class StickChart extends core_eventEmitter_1.EventEmitter {
    constructor(options) {
        super();
        this.middlewareRunner = new core_middlewareRunner_1.MiddlewareRunner();
        this.options = Object.assign((0, defaults_1.defaultStickChartOptions)(), options);
        this.application = this.createApplication();
        this.application.start();
        this.middlewareRunner.add(new store_data_middleware_1.DataMiddleware());
        this.middlewareRunner.add(new store_zoom_middleware_1.ZoomHandleMiddleware());
        this.middlewareRunner.add(new store_scroll_middleware_1.ScrollHandleMiddleware());
        this.middlewareRunner.add(new store_intervals_middleware_1.IntervalsHandlerMiddleware());
        this.middlewareRunner.add(new store_lines_middleware_1.LinesViewMiddleware());
        this.middlewareRunner.add(new store_candlestick_middleware_1.CandleStickViewMiddleware());
        this.middlewareRunner.add(new store_grid_middleware_1.GridViewMiddleware());
    }
    get view() {
        return this.application.view;
    }
    createApplication() {
        const { options } = this;
        return new pixi_1.Application(Object.assign(Object.assign(Object.assign({}, options), options.style), { antialias: true }));
    }
    createState() {
        const state = {
            chartType: this.options.chartType,
            basicConfig: this.createBasicConfig(),
            renderConfig: this.createRenderConfig(),
            dataManager: this.createDataManager(),
        };
        return state;
    }
    createBasicConfig() {
        const { width, height, style, stickIntervalSize, dateRange } = this.options;
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
        const { dateRange, columnIntervalSize } = this.options;
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
        const { stickIntervalSize, data } = this.options;
        const chartType = (_b = (_a = this.state) === null || _a === void 0 ? void 0 : _a.chartType) !== null && _b !== void 0 ? _b : this.options.chartType;
        const rawDataMapper = maps_1.rawDataMappersMap[chartType];
        const newRawDataMapper = maps_1.newRawDataMappersMap[chartType];
        const dateMapper = map_dataToDateMappers_1.dataToDateMappersMap[chartType];
        return new utils_1.DataManager(data, (raw) => rawDataMapper(raw, stickIntervalSize), (prevData, raw) => newRawDataMapper(prevData, raw, stickIntervalSize), dateMapper);
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
        this.middlewareRunner.run(this.viewport, this, this.state);
        return this;
    }
    setChartType(type) {
        this.state.chartType = type;
        this.state.dataManager = this.createDataManager();
        return this;
    }
    addData(rawPricePoint) {
        this.options.data.push(rawPricePoint);
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