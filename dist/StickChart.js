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
const rendering_1 = require("./rendering");
const rendering_2 = require("./rendering");
class StickChart extends EventTarget {
    constructor(stageElement, chartType) {
        super();
        this.stageElement = stageElement;
        this.chartType = chartType;
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
        const renderer = new rendering_2.GraphicStorage(this.application.stage);
        this.pipelineFactory = new rendering_1.RenderingPipelineFactory(renderer);
    }
    get canvas() {
        return this.application.view;
    }
    render(context) {
        const pipeline = this.pipelineFactory.get(context.charttype);
        const ctx = {
            pool: context.pool,
            paris: context.paris,
            resolved: context.resolved,
            chartdata: context.chartdata,
            plotdata: chartdata_1.DataConverter.convert(context.chartdata, this.application.screen),
            screen: this.application.screen,
            textures: this.textureStorage,
        };
        window.requestAnimationFrame(() => {
            var _a;
            // Morph
            if (config_1.default.morph && this._plotdata) {
                (_a = this.timeline) === null || _a === void 0 ? void 0 : _a.kill();
                this.timeline = pixi_1.gsap.to(chartdata_1.DataConverter.toPath(this._plotdata), {
                    duration: 0.2,
                    ease: 'power2',
                    morphSVG: {
                        shape: chartdata_1.DataConverter.toPath(ctx.plotdata),
                        shapeIndex: 'auto',
                        updateTarget: false,
                        render: (path) => {
                            infra_1.Logger.info('animational render');
                            const { xs, ys } = chartdata_1.DataConverter.fromPath(path);
                            console.log(ys);
                            ctx.plotdata = Object.assign(Object.assign({}, ctx.plotdata), { ys, xs });
                            pipeline.render(ctx, () => this.application.render());
                        }
                    }
                });
            }
            else {
                infra_1.Logger.info('chart render');
                pipeline.render(ctx, () => this.application.render());
            }
            this._plotdata = ctx.plotdata;
        });
    }
    destroy() {
        this.application.destroy();
        this.eventsProducer.destroy();
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=StickChart.js.map