"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const chartdata_1 = require("./chartdata");
const config_1 = __importDefault(require("./config"));
const events_1 = require("./events");
const infra_1 = require("./infra");
const morph_1 = __importDefault(require("./lib/morph"));
const pixi_1 = require("./lib/pixi");
const timeframe_1 = require("./lib/timeframe");
const rendering_1 = require("./rendering");
const rendering_2 = require("./rendering");
class StickChart extends EventTarget {
    constructor(stageElement) {
        super();
        this.stageElement = stageElement;
        this.application = new pixi_1.Application({
            resizeTo: stageElement,
            antialias: config_1.default.antialias,
            resolution: config_1.default.resolution,
            autoDensity: config_1.default.autoDensity,
            autoStart: config_1.default.autoStart,
            forceCanvas: config_1.default.forceCanvas,
            backgroundColor: config_1.default.style.background,
            backgroundAlpha: config_1.default.style.backgroundAlpha,
        });
        this.eventsProducer = new events_1.EventsProducer(this, this.canvas, stageElement);
        this.textureStorage = new rendering_2.TextureStorage(this.application);
        this.timeframe = new timeframe_1.Timeframe(this, () => this.applyTimeframe());
        this.morphController = new morph_1.default(chartdata_1.DataBuilder.isEqual, (point) => this.applyLatestPoint(point), config_1.default.morph);
        const renderer = new rendering_2.GraphicStorage(this.application.stage);
        this.pipelineFactory = new rendering_1.RenderingPipelineFactory(renderer);
    }
    setScreenSize({ width, height }) {
        this.application.renderer.resize(width, height);
    }
    setTimeframe(timeframe) {
        this.timeframe.save(timeframe);
    }
    get canvas() {
        return this.application.view;
    }
    applyTimeframe() {
        if (!this._context)
            return;
        this._context.plotdata = chartdata_1.DataBuilder.plotdata(this._context.chartdata, this.application.screen, this.timeframe.get());
        this.rerender('zoom');
    }
    applyLatestPoint(latest) {
        if (!this._context)
            return;
        const { price, timestamp } = latest;
        const { timestamps, prices } = this._context.chartdata;
        const idx = timestamps.length - 1;
        timestamps[idx] = timestamp;
        prices[idx] = price;
        this._context.plotdata = chartdata_1.DataBuilder.plotdata(this._context.chartdata, this.application.screen, this.timeframe.get());
        this.rerender('morph');
    }
    rerender(reason) {
        window.requestAnimationFrame(() => {
            if (!this._context)
                return;
            const pipeline = this.pipelineFactory.get(this._context.charttype);
            pipeline.render(Object.assign(Object.assign({}, this._context), { rerender: true }), () => infra_1.Logger.info('re-render', reason));
        });
    }
    render(context) {
        var _a;
        const pipeline = this.pipelineFactory.get(context.charttype);
        const chartdata = chartdata_1.DataBuilder.chartdata(context.chartdata);
        const plotdata = chartdata_1.DataBuilder.plotdata(chartdata, this.application.screen, this.timeframe.actualize().get());
        const ctx = {
            pool: context.pool,
            paris: context.paris,
            resolved: context.resolved,
            charttype: context.charttype,
            screen: this.application.screen,
            textures: this.textureStorage,
            eventTarget: this,
            chartdata,
            plotdata,
        };
        if (context.pool.metaid !== ((_a = this._context) === null || _a === void 0 ? void 0 : _a.pool.metaid)) {
            // clear context if metaid changed
            this._context = null;
        }
        window.requestAnimationFrame(() => {
            const latestPoint = (_context) => _context ? chartdata_1.DataBuilder.getLatest(_context.plotdata) : undefined;
            this.morphController.perform(latestPoint(this._context), latestPoint(ctx));
            if (!this.morphController.isActive) {
                pipeline.render(ctx, () => infra_1.Logger.info('render'));
            }
            // save latest rendered context
            this._context = ctx;
        });
    }
    destroy() {
        this.application.destroy();
        this.eventsProducer.destroy();
        this.timeframe.destroy();
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=StickChart.js.map