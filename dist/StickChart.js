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
const pixi_1 = require("./lib/pixi");
const date_utils_1 = require("./lib/date-utils");
const rendering_1 = require("./rendering");
const rendering_2 = require("./rendering");
function validate(duration) {
    return duration && !tooBig(duration) && !tooSmall(duration);
}
function tooBig(duration) {
    return duration > date_utils_1.UNIX_DAY;
}
function tooSmall(duration) {
    return duration < date_utils_1.UNIX_MINUTE * 10;
}
class StickChart extends EventTarget {
    constructor(stageElement) {
        super();
        this.stageElement = stageElement;
        this.since = (0, date_utils_1.nowUnixTS)() - date_utils_1.UNIX_DAY;
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
        this.addEventListener('zoom', (e) => {
            const zoom = e.zoom;
            let timeframe = (0, date_utils_1.nowUnixTS)() - this.since;
            timeframe += Math.round(timeframe * zoom);
            const zoominUp = zoom > 0;
            const zoominDown = zoom < 0;
            const hitLower = tooSmall(timeframe) && zoominDown;
            const hitUpper = tooBig(timeframe) && zoominUp;
            if (!hitLower && !hitUpper) {
                this.applyTimeframe(timeframe);
            }
        });
        const renderer = new rendering_2.GraphicStorage(this.application.stage);
        this.pipelineFactory = new rendering_1.RenderingPipelineFactory(renderer);
    }
    setTimeframe(timeframe) {
        if (!validate(timeframe))
            timeframe = date_utils_1.UNIX_DAY;
        this.since = (0, date_utils_1.nowUnixTS)() - timeframe;
    }
    get canvas() {
        return this.application.view;
    }
    applyTimeframe(timeframe) {
        this.since = (0, date_utils_1.nowUnixTS)() - timeframe;
        if (!this._context)
            return;
        this._context.plotdata = chartdata_1.DataConverter.plotdata(this._context.chartdata, this.application.screen, this.since);
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
        this._context.plotdata = chartdata_1.DataConverter.plotdata(this._context.chartdata, this.application.screen, this.since);
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
        const chartdata = chartdata_1.DataConverter.chartdata(context.chartdata);
        const plotdata = chartdata_1.DataConverter.plotdata(chartdata, this.application.screen, this.since);
        const ctx = {
            pool: context.pool,
            paris: context.paris,
            resolved: context.resolved,
            charttype: context.charttype,
            screen: this.application.screen,
            textures: this.textureStorage,
            chartdata,
            plotdata,
        };
        if (context.pool.metaid !== ((_a = this._context) === null || _a === void 0 ? void 0 : _a.pool.metaid)) {
            // clear context if metaid changed
            this._context = null;
        }
        window.requestAnimationFrame(() => {
            var _a;
            (_a = this.animation) === null || _a === void 0 ? void 0 : _a.kill();
            this.animation = null;
            // Morph
            if (config_1.default.morph && this._context) {
                const aminated = chartdata_1.DataConverter.getLatest(this._context.plotdata);
                const target = chartdata_1.DataConverter.getLatest(ctx.plotdata);
                if (!chartdata_1.DataConverter.isEqual(aminated, target)) {
                    // morph animation
                    this.animation = pixi_1.gsap.to(aminated, Object.assign(Object.assign({}, target), { duration: 1, ease: 'power2.out', onUpdate: () => {
                            if (!chartdata_1.DataConverter.isEqual(aminated, target)) {
                                this.applyLatestPoint(aminated);
                            }
                        }, onComplete: () => {
                            // gsap has limited precision
                            // in order to render exactly target
                            // we have to apply taregt in the end
                            this.applyLatestPoint(target);
                        } }));
                }
            }
            if (!this.animation) {
                pipeline.render(ctx, () => infra_1.Logger.info('render'));
            }
            // save latest rendered context
            this._context = ctx;
        });
    }
    destroy() {
        this.application.destroy();
        this.eventsProducer.destroy();
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=StickChart.js.map