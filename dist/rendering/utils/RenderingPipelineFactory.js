"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingPipelineFactory = void 0;
const __1 = require("..");
const enums_1 = require("../../enums");
class RenderingPipelineFactory {
    constructor(renderer) {
        this.renderer = renderer;
        this.pipelines = {
            [enums_1.EChartType.LINE]: this.create(enums_1.EChartType.LINE),
            [enums_1.EChartType.CANDLES]: this.create(enums_1.EChartType.CANDLES),
        };
    }
    get(charttype) {
        return this.pipelines[charttype] || this.create(charttype);
    }
    create(charttype) {
        if (charttype === enums_1.EChartType.LINE) {
            return new __1.LineChartRenderer(this.renderer);
        }
        // if (charttype === EChartType.CANDLES) {
        //     return new CandlesRenderingPipeline(this.renderer)
        // }
        return new __1.NotSupportedChartTypeRenderer(this.renderer);
    }
}
exports.RenderingPipelineFactory = RenderingPipelineFactory;
//# sourceMappingURL=RenderingPipelineFactory.js.map