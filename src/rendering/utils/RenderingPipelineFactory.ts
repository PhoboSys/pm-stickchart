import { Container, Graphics } from '../../lib/pixi'
import { EChartType } from '../../enums'

import { LineChartRenderer } from '..'
import { NotSupportedChartTypeRenderer } from '..'
import { IRenderer, IGraphicStorage } from '..'

export class RenderingPipelineFactory {

    private pipelines: { [key in EChartType]: IRenderer }

    constructor (
        private readonly renderer: IGraphicStorage
    ) {

        this.pipelines = {
            [EChartType.LINE]: this.create(EChartType.LINE),
            [EChartType.CANDLES]: this.create(EChartType.CANDLES)
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



