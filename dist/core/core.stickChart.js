"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const lodash_1 = require("lodash");
const map_dataToValueMappers_1 = require("../data/maps/map.dataToValueMappers");
const map_rawDataMappers_1 = require("../data/maps/map.rawDataMappers");
const defaults_1 = require("../defaults");
const pixi_1 = require("../libs/pixi");
const store_candlestick_middleware_1 = require("../store/candlestick/store.candlestick.middleware");
const store_grid_middleware_1 = require("../store/grid/store.grid.middleware");
const store_intervals_middleware_1 = require("../store/intervals/store.intervals.middleware");
const store_lines_middleware_1 = require("../store/lines/store.lines.middleware");
const store_scroll_middleware_1 = require("../store/scroll/store.scroll.middleware");
const store_zoom_middleware_1 = require("../store/zoom/store.zoom.middleware");
const core_dataManager_1 = require("./core.dataManager");
const core_inputEvent_1 = require("./core.inputEvent");
const core_middlewareRunner_1 = require("./core.middlewareRunner");
const core_viewport_1 = require("./core.viewport");
const infra_1 = require("../infra");
class StickChart {
    constructor(width, height, chartType, stickIntervalSize, columnIntervalSize = defaults_1.defaultColumnIntervalSize, dateRange = (0, defaults_1.defaultChartDateRange)(), style = defaults_1.defaultStickChartStyle, data = defaults_1.defaultStickChartData) {
        this.width = width;
        this.height = height;
        this.chartType = chartType;
        this.stickIntervalSize = stickIntervalSize;
        this.columnIntervalSize = columnIntervalSize;
        this.dateRange = dateRange;
        this.style = style;
        this.data = data;
        this.middlewareRunner = new core_middlewareRunner_1.MiddlewareRunner();
        this.logger = new infra_1.Logger('pm');
        this.application = new pixi_1.Application(Object.assign(Object.assign({ width, height }, style), { antialias: true }));
        this.application.start();
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
            chartType: this.chartType,
            stickIntervalSize: this.stickIntervalSize,
            columnIntervalSize: this.columnIntervalSize,
            dateRange: this.dateRange,
        };
    }
    createDataManager() {
        const rawDataMapper = map_rawDataMappers_1.rawDataMappersMap[this.viewConfig.chartType];
        const data = rawDataMapper(this.data, this.viewConfig.stickIntervalSize);
        return new core_dataManager_1.DataManager(data, map_dataToValueMappers_1.dataToValueMappersMap[this.viewConfig.chartType]);
    }
    createState() {
        return {
            viewConfig: this.viewConfig,
            style: this.style,
            data: this.data,
            renderConfig: Object.assign(Object.assign({ valueRange: defaults_1.defaultChartValueRange, rowIntervalSize: defaults_1.defaultIntervalRowSize, dataManager: this.createDataManager() }, this.viewConfig), { columnIntervalSize: this.viewConfig.columnIntervalSize.clone(), dateRange: this.viewConfig.dateRange.clone(), backgroundAlpha: 0 }),
            inputEvent: defaults_1.defaultInputEvent,
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
    render(state) {
        if ((0, lodash_1.isEmpty)(state))
            this.logger.error('state object is not provided to render');
        this.middlewareRunner.run(this.viewport, this.state);
    }
    setChartType(type) {
        this.state.viewConfig.chartType = type;
        this.state.renderConfig.dataManager = this.createDataManager();
        this.render();
    }
    inputData(rawPricePoint) {
        this.state.data.push(rawPricePoint);
        this.state.renderConfig.dataManager = this.createDataManager();
    }
    addInputEventHandler(event, type) {
        this.state.inputEvent = new core_inputEvent_1.ChartInputEvent(event, type);
        this.render();
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=core.stickChart.js.map