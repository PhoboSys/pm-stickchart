import config from './config'

import { EChartType } from './enums'
import { EventsProducer } from './events'
import { Application } from './lib/pixi'
import { DataConverter, ChartData } from './chartdata'

import { Logger } from './infra'
import { RenderingPipelineFactory, PixiGraphicRenderer } from './rendering'

export class StickChart extends EventTarget {

    private renderer: PixiGraphicRenderer
    private application: Application
    private eventsProducer: EventsProducer

    constructor(
        private stageElement: HTMLElement,
        private chartType: EChartType
    ) {
        super()
        this.application = new Application({
            resizeTo: stageElement,
            antialias: config.antialias,
            resolution: config.resolution,
            autoDensity: config.autoDensity,
            autoStart: config.autoStart,
            forceCanvas: config.forceCanvas,

            backgroundColor: config.style.background,
            backgroundAlpha: 1,
        })

		this.renderer = new PixiGraphicRenderer(this.application.stage)
		this.eventsProducer = new EventsProducer(this, this.canvas, stageElement)
    }

    public get canvas(): HTMLCanvasElement {
        return this.application.view
    }

    public render(context: {
        chartdata: ChartData,
        charttype: EChartType,
        pari: any,
        pool: any,
        mousepos: any,
    }): void {
        const pipelineFactory = new RenderingPipelineFactory(this.renderer)
        const pipeline = pipelineFactory.get(context.charttype)
        const ctx = {
            pool: context.pool,
            chartdata: context.chartdata,
            plotdata: DataConverter.convert(context.chartdata),
            mousepos: context.mousepos,
            screen: this.application.screen,
        }

        pipeline.render(
            ctx,
            () => this.application.render()
        )
    }

    public destroy() {
        this.application.destroy()
		this.eventsProducer.destroy()
        Logger.warn('Applicaiont get destoryed!!!!!!!!!!!')
    }
}
