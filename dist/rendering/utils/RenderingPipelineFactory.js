"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingPipelineFactory = void 0;
const __1 = require("..");
const __2 = require("..");
const EChartType_1 = require("../../enums/EChartType");
class RenderingPipelineFactory {
    constructor(renderer) {
        this.renderer = renderer;
        this.pipelines = {
            [EChartType_1.EChartType.LINE]: this.create(EChartType_1.EChartType.LINE),
            [EChartType_1.EChartType.CANDLES]: this.create(EChartType_1.EChartType.CANDLES),
        };
    }
    get(charttype) {
        return this.pipelines[charttype] || this.create(charttype);
    }
    create(charttype) {
        if (charttype === EChartType_1.EChartType.LINE) {
            return new __1.LineChartRenderer(this.renderer);
        }
        // if (charttype === EChartType.CANDLES) {
        //     return new CandlesRenderingPipeline(this.renderer)
        // }
        return new __2.NotSupportedChartTypeRenderer(this.renderer);
    }
}
exports.RenderingPipelineFactory = RenderingPipelineFactory;
//# sourceMappingURL=RenderingPipelineFactory.js.map