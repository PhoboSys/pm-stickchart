import {
    LineChartRenderer,
    NotSupportedChartTypeRenderer,
    IRenderer,
    IGraphicStorage
} from '@rendering'
import { EChartType } from '@enums'

export class RenderingPipelineFactory {

    private pipelines: { [key in EChartType]: IRenderer }

    constructor(
        private readonly renderer: IGraphicStorage,
    ) {

        this.pipelines = {
            [EChartType.LINE]: this.create(EChartType.LINE),
            [EChartType.CANDLES]: this.create(EChartType.CANDLES),
        }

    }

    public get(charttype: EChartType): IRenderer {
        return this.pipelines[charttype] || this.create(charttype)
    }

    private create(charttype: EChartType): IRenderer {

        if (charttype === EChartType.LINE) {
            return new LineChartRenderer(this.renderer)
        }

        // if (charttype === EChartType.CANDLES) {
        //     return new CandlesRenderingPipeline(this.renderer)
        // }

        return new NotSupportedChartTypeRenderer(this.renderer)

    }
}

