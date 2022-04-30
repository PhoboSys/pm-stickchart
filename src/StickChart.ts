import config from './config'

import { EChartType } from './enums'
import { EventsProducer } from './events'
import { Application } from './lib/pixi'
import { DataConverter, ChartData } from './chartdata'

import { Logger } from './infra'
import { RenderingPipelineFactory, GraphicStorage } from './rendering'
import { TextureStorage, GraphicUtils } from './rendering'
import { POOL_ROUND_TEXTURE, PRICE_LINE_TEXTURE } from './rendering'

export class StickChart extends EventTarget {

    private application: Application
    private eventsProducer: EventsProducer
    private pipelineFactory: RenderingPipelineFactory
    private textureStorage: TextureStorage

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
            backgroundAlpha: config.style.backgroundAlpha,
        })

        this.eventsProducer = new EventsProducer(this, this.canvas, stageElement)
        this.textureStorage = new TextureStorage(this.application)

        const renderer = new GraphicStorage(this.application.stage)
        this.pipelineFactory = new RenderingPipelineFactory(renderer)
    }

    public get canvas(): HTMLCanvasElement {
        return this.application.view
    }

    public render(context: {
        chartdata: ChartData,
        charttype: EChartType,
        paris: any[],
        resolved: any[],
        pool: any,
    }): void {
        const pipeline = this.pipelineFactory.get(context.charttype)
        const ctx = {
            pool: context.pool,
            paris: context.paris,
            resolved: context.resolved,
            chartdata: context.chartdata,
            plotdata: DataConverter.convert(context.chartdata),
            screen: this.application.screen,
            textures: this.textureStorage
        }

        Logger.info('chart render')
        window.requestAnimationFrame(() =>
            pipeline.render(
                ctx,
                () => this.application.render()
            )
        )
    }

    public destroy() {
        this.application.destroy()
        this.eventsProducer.destroy()
    }
}
