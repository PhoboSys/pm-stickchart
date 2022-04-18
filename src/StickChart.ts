import { EChartType } from './enums'
import { Application } from './lib/pixi'

import { Logger } from './infra'
import { RenderingPipelineFactory, PixiGraphicRenderer, ChartData } from './rendering'

export class StickChart {

    private renderer: PixiGraphicRenderer

    private application: Application

    constructor(
        private stageElement: HTMLInputElement,
        private chartType: EChartType
    ) {
        this.application = new Application({
            resizeTo: stageElement,
            antialias: true,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            autoStart: false,

            backgroundColor: 0x202124,
            backgroundAlpha: 1,
        })

        this.renderer = new PixiGraphicRenderer(this.application.stage)

        // stageElement.onwheel = (e) => this.dispatchEvent(new Event('zoom', e))
        // addScrollEvent(stageElement, (ev) => this.addInputEventHandler(ev, EInputEvent.scroll))
    }

    public get canvas(): HTMLCanvasElement {
        return this.application.view
    }

    public render(
        chartdata: ChartData,
        charttype: EChartType
    ): void {
        const pipelineFactory = new RenderingPipelineFactory(this.renderer)
        const pipeline = pipelineFactory.get(charttype)
        const context = {
            chartdata,
            screen: this.application.screen
        }
        pipeline.render(
            context,
            () => this.application.render()
        )
    }

    public destroy() {
        this.application.destroy()
        Logger.warn('Applicaiont get destoryed!!!!!!!!!!!')
    }
}
