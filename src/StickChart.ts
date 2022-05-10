import { DataConverter, ChartData } from './chartdata'
import config from './config'

import { EChartType } from './enums'
import { EventsProducer, localEventTarget } from './events'
import { Logger } from './infra'
import { Application } from './lib/pixi'

import { RenderingPipelineFactory } from './rendering'
import { TextureStorage, GraphicStorage } from './rendering'

export class StickChart extends EventTarget {

    private application: Application

    private eventsProducer: EventsProducer

    private pipelineFactory: RenderingPipelineFactory

    private textureStorage: TextureStorage

    constructor(
        private stageElement: HTMLElement,
        private chartType: EChartType,
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

        this.eventsProducer = new EventsProducer(
            this,
            this.canvas,
            stageElement,
        )

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
        pari: any,
        pool: any,
        mousepos: any,
    }): void {
        const pipeline = this.pipelineFactory.get(context.charttype)
        const ctx = {
            pool: context.pool,
            paris: context.paris,
            chartdata: context.chartdata,
            plotdata: DataConverter.convert(context.chartdata),
            mousepos: context.mousepos,
            screen: this.application.screen,
            textures: this.textureStorage,
            application: this.application,
        }

        window.requestAnimationFrame(() =>
            pipeline.render(
                ctx,
                () => this.application.render(),
            ),
        )
    }

    public destroy(): void {
        this.application.destroy()
        this.eventsProducer.destroy()
        Logger.warn('Applicaiont get destoryed!!!!!!!!!!!')
    }
}
