import { DataConverter, ChartData } from './chartdata'
import config from './config'


import { EChartType } from './enums'
import { EventsProducer } from './events'
import { Logger } from './infra'

import datamath from './lib/datamath'
import { Application, gsap } from './lib/pixi'

import { RenderingPipelineFactory } from './rendering'
import { TextureStorage, GraphicStorage } from './rendering'

export class StickChart extends EventTarget {

    private application: Application

    private eventsProducer: EventsProducer

    private pipelineFactory: RenderingPipelineFactory

    private textureStorage: TextureStorage

    private _plotdata: any

    private timeline: any

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
            plotdata: DataConverter.convert(context.chartdata, this.application.screen),
            screen: this.application.screen,
            textures: this.textureStorage,
        }

        window.requestAnimationFrame(() => {

            // Morph
            if (config.morph && this._plotdata) {
                this.timeline?.kill()
                this.timeline = gsap.to(
                    DataConverter.toPath(this._plotdata),
                    {
                        duration: 0.2,
                        ease: 'power2',
                        morphSVG: {
                            shape: DataConverter.toPath(ctx.plotdata),
                            type: 'linear',
                            shapeIndex: 'auto',
                            updateTarget: false,
                            render: (path) => {
                                Logger.info('morph render')
                                const { xs, ys } = DataConverter.fromPath(path)
                                ctx.plotdata = { ...ctx.plotdata, xs, ys }
                                pipeline.render(
                                    ctx,
                                    () => this.application.render()
                                )
                            }
                        }
                    }
                )
            } else {
                Logger.info('render')
                pipeline.render(
                    ctx,
                    () => this.application.render()
                )
            }

            this._plotdata = ctx.plotdata
        })
    }

    public destroy(): void {
        this.application.destroy()
        this.eventsProducer.destroy()
    }
}
