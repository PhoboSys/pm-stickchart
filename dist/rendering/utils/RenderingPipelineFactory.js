"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingPipelineFactory = void 0;
const __1 = require("..");
const __2 = require("..");
const _enums_1 = require("../../enums/index.js");
class RenderingPipelineFactory {
    constructor(renderer) {
        this.renderer = renderer;
        this.pipelines = {
            [_enums_1.EChartType.LINE]: this.create(_enums_1.EChartType.LINE),
            [_enums_1.EChartType.CANDLES]: this.create(_enums_1.EChartType.CANDLES),
        };
    }
    get(charttype) {
        return this.pipelines[charttype] || this.create(charttype);
    }
    create(charttype) {
        if (charttype === _enums_1.EChartType.LINE) {
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