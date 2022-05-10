import { DataBuilder, ChartData } from './chartdata'
import config from './config'

import { EChartType } from './enums'
import { EventsProducer, ZoomEvent } from './events'
import { Logger } from './infra'

import datamath from './lib/datamath'
import { Application, gsap } from './lib/pixi'
import { Timeframe } from './lib/timeframe'

import { RenderingPipelineFactory, RenderingContext } from './rendering'
import { TextureStorage, GraphicStorage } from './rendering'

export class StickChart extends EventTarget {

    private application: Application

    private eventsProducer: EventsProducer

    private pipelineFactory: RenderingPipelineFactory

    private textureStorage: TextureStorage

    private _context: RenderingContext | null

    private animation: any

    private timeframe: Timeframe

    constructor(
        private stageElement: HTMLElement
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
        this.timeframe = new Timeframe(this, () => this.applyTimeframe())

        const renderer = new GraphicStorage(this.application.stage)

        this.pipelineFactory = new RenderingPipelineFactory(renderer)
    }

    public setTimeframe(timeframe: number) {
        this.timeframe.save(timeframe)
    }

    public get canvas(): HTMLCanvasElement {
        return this.application.view
    }

    private applyTimeframe() {
        if (!this._context) return

        this._context.plotdata = DataBuilder.plotdata(
            this._context.chartdata,
            this.application.screen,
            this.timeframe.get(),
        )
        this.rerender('zoom')
    }

    private applyLatestPoint(latest: { price, timestamp }) {
        if (!this._context) return

        const { price, timestamp } = latest
        const { timestamps, prices } = this._context.chartdata
        const idx = timestamps.length - 1

        timestamps[idx] = timestamp
        prices[idx] = price

        this._context.plotdata = DataBuilder.plotdata(
            this._context.chartdata,
            this.application.screen,
            this.timeframe.get(),
        )
        this.rerender('morph')
    }

    public rerender(reason: string): void {
        window.requestAnimationFrame(() => {
            if (!this._context) return

            const pipeline = this.pipelineFactory.get(this._context.charttype)

            pipeline.render(
                {
                    ...this._context,
                    rerender: true
                },
                () => Logger.info('re-render', reason)
            )
        })
    }

    public render(context: {
        chartdata: ChartData,
        charttype: EChartType,
        paris: any[],
        resolved: any[],
        pool: any,
    }): void {

        const pipeline = this.pipelineFactory.get(context.charttype)
        const chartdata = DataBuilder.chartdata(context.chartdata)
        const plotdata = DataBuilder.plotdata(
            chartdata,
            this.application.screen,
            this.timeframe.get()
        )
        const ctx: RenderingContext = {
            pool: context.pool,
            paris: context.paris,
            resolved: context.resolved,
            charttype: context.charttype,
            screen: this.application.screen,
            textures: this.textureStorage,

            stageEventTarget: this.application.resizeTo,
            chartdata,
            plotdata,
        }

        if (context.pool.metaid !== this._context?.pool.metaid) {
            // clear context if metaid changed
            this._context = null
        }

        window.requestAnimationFrame(() => {
            this.animation?.kill()
            this.animation = null

            // Morph
            if (config.morph && this._context) {

                const aminated = DataBuilder.getLatest(this._context.plotdata)
                const target = DataBuilder.getLatest(ctx.plotdata)

                if (!DataBuilder.isEqual(aminated, target)) {

                    // morph animation
                    this.animation = gsap.to(
                        aminated,
                        {
                            ...target,
                            ...config.morph,
                            onUpdate: () => {
                                if (!DataBuilder.isEqual(aminated, target)) {
                                    this.applyLatestPoint(aminated)
                                }
                            },
                            onComplete: () => {
                                // gsap has limited precision
                                // in order to render exactly 'target'
                                // we have to apply it in the end
                                this.applyLatestPoint(target)
                            }
                        }
                    )

                }
            }

            if (!this.animation) {

                pipeline.render(
                    ctx,
                    () => Logger.info('render')
                )

            }

            // save latest rendered context
            this._context = ctx
        })
    }

    public destroy(): void {
        this.application.destroy()
        this.eventsProducer.destroy()
        this.timeframe.destroy()
    }
}
