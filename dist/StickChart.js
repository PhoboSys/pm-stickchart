"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickChart = void 0;
const config_1 = __importDefault(require("./config"));
const events_1 = require("./events");
const pixi_1 = require("./lib/pixi");
const chartdata_1 = require("./chartdata");
const infra_1 = require("./infra");
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
            backgroundAlpha: 1,
        });
        this.renderer = new rendering_1.PixiGraphicRenderer(this.application.stage);
        this.eventsProducer = new events_1.EventsProducer(this, this.canvas, stageElement);
        this.textureStorage = new rendering_2.TextureStorage(this.application);
    }
    get canvas() {
        return this.application.view;
    }
    render(context) {
        const pipelineFactory = new rendering_1.RenderingPipelineFactory(this.renderer);
        const pipeline = pipelineFactory.get(context.charttype);
        const ctx = {
            pool: context.pool,
            chartdata: context.chartdata,
            plotdata: chartdata_1.DataConverter.convert(context.chartdata),
            mousepos: context.mousepos,
            screen: this.application.screen,
            gradient: this.textureStorage.getPriceLineGradient(),
        };
        pipeline.render(ctx, () => this.application.render());
    }
    destroy() {
        this.application.destroy();
        this.eventsProducer.destroy();
        infra_1.Logger.warn('Applicaiont get destoryed!!!!!!!!!!!');
    }
}
exports.StickChart = StickChart;
//# sourceMappingURL=StickChart.js.map