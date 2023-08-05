"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const _chartdata_1 = require("./chartdata/index.js");
const _config_1 = __importDefault(require("./config.js"));
const _infra_1 = require("./infra/index.js");
const _events_1 = require("./events/index.js");
const morph_1 = __importDefault(require("./lib/morph"));
const pixi_1 = require("./lib/pixi");
const timeframe_1 = require("./lib/timeframe");
const _rendering_1 = require("./rendering/index.js");
const _rendering_2 = require("./rendering/index.js");
class StickChart extends EventTarget {
    constructor(stageElement) {
        super();
        this.stageElement = stageElement;
        this.application = new pixi_1.Application({
            resizeTo: stageElement,
            antialias: _config_1.default.antialias,
            resolution: _config_1.default.resolution,
            autoDensity: _config_1.default.autoDensity,
            autoStart: _config_1.default.autoStart,
            forceCanvas: _config_1.default.forceCanvas,
            backgroundColor: _config_1.default.style.background,
            backgroundAlpha: _config_1.default.style.backgroundAlpha,
        });
        this.application.renderer.addSystem(pixi_1.EventSystem, 'events');
        this.eventsProducer = new _events_1.EventsProducer(this, this.canvas, stageElement);
        this.textureStorage = new _rendering_2.TextureStorage(this.application);
        this.timeframe = new timeframe_1.Timeframe(this, () => this.applyTimeframe());
        this.morphController = new morph_1.default(() => this.applyMorph());
        const renderer = new _rendering_2.GraphicStorage(this.application.stage);
        this.pipelineFactory = new _rendering_1.RenderingPipelineFactory(renderer);
    }
    setScreenSize({ width, height }) {
        if (width === 0)
            return;
        if (height === 0)
            return;
        this.application.renderer.resize(width, height);
        if (!this._context)
            return;
        this._context.plotdata = _chartdata_1.DataBuilder.plotdata(this._context.chartdata, this.application.screen, this.timeframe.now(_chartdata_1.DataBuilder.getLatestTS(this._context.chartdata)).get());
        this.rerender('resize');
    }
    setTimeframe(timeframe) {
        this.timeframe.save(timeframe);
    }
    resetTimeframe() {
        this.timeframe.reset();
        this.applyTimeframe();
    }
    get canvas() {
        return this.application.view;
    }
    applyTimeframe() {
        var _a, _b;
        if (!this._context)
            return;
        if (((_a = this._context.screen) === null || _a === void 0 ? void 0 : _a.width) === 0)
            return;
        if (((_b = this._context.screen) === null || _b === void 0 ? void 0 : _b.height) === 0)
            return;
        this._context.plotdata = _chartdata_1.DataBuilder.plotdata(this._context.chartdata, this.application.screen, this.timeframe.now(_chartdata_1.DataBuilder.getLatestTS(this._context.chartdata)).get());
        this.rerender('timeframe');
    }
    applyMorph() {
        var _a, _b;
        if (!this._context)
            return;
        if (((_a = this._context.screen) === null || _a === void 0 ? void 0 : _a.width) === 0)
            return;
        if (((_b = this._context.screen) === null || _b === void 0 ? void 0 : _b.height) === 0)
            return;
        this._context.plotdata = _chartdata_1.DataBuilder.plotdata(this._context.chartdata, this.application.screen, this.timeframe.now(_chartdata_1.DataBuilder.getLatestTS(this._context.chartdata)).get());
        this.rerender('morph');
    }
    rerender(reason) {
        window.requestAnimationFrame(() => {
            var _a, _b;
            if (!this._context)
                return;
            if (((_a = this._context.screen) === null || _a === void 0 ? void 0 : _a.width) === 0)
                return;
            if (((_b = this._context.screen) === null || _b === void 0 ? void 0 : _b.height) === 0)
                return;
            const pipeline = this.pipelineFactory.get(this._context.charttype);
            pipeline.render(Object.assign(Object.assign({}, this._context), { rerender: true }), () => { var _a, _b, _c; return _infra_1.Logger.info('re-render', reason, (_c = (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.plotdata) === null || _b === void 0 ? void 0 : _b.latest) === null || _c === void 0 ? void 0 : _c.timestamp); });
        });
    }
    render(context) {
        var _a;
        if (!context.metapool) {
            return _infra_1.Logger.error('Cannot initiate chart "metapool" is not provided!');
        }
        if (!this.application.screen)
            return;
        if (this.application.screen.width === 0)
            return;
        if (this.application.screen.height === 0)
            return;
        const pipeline = this.pipelineFactory.get(context.charttype);
        const chartdata = _chartdata_1.DataBuilder.chartdata(context.chartdata);
        const plotdata = _chartdata_1.DataBuilder.plotdata(chartdata, this.application.screen, this.timeframe.now(_chartdata_1.DataBuilder.getLatestTS(chartdata)).get());
        const ctx = {
            metapool: context.metapool,
            pools: context.pools,
            paris: context.paris,
            settlements: context.settlements,
            blocksLatest: context.blocksLatest,
            transactions: context.transactions,
            blocksEntities: context.blocksEntities,
            transactionsEntities: context.transactionsEntities,
            resolved: context.resolved,
            charttype: context.charttype,
            screen: this.application.screen,
            textures: this.textureStorage,
            eventTarget: this,
            chartdata,
            plotdata,
        };
        if (context.metapool.metapoolid !== ((_a = this._context) === null || _a === void 0 ? void 0 : _a.metapool.metapoolid)) {
            // clear context if metapoolid changed
            this._context = null;
            this.timeframe.reset();
        }
        window.requestAnimationFrame(() => {
            if (!this._context || !_config_1.default.morph) {
                pipeline.render(ctx, () => _infra_1.Logger.info('render', ctx.plotdata.latest.timestamp));
            }
            else {
                this.morphController.morph(this._context.chartdata, ctx.chartdata);
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