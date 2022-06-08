import { DataBuilder, ChartData } from './chartdata'
import config from './config'

import { EChartType } from './enums'
import { EventsProducer } from './events'
import { Logger } from './infra'

import { Application } from './lib/pixi'
import { Timeframe } from './lib/timeframe'

import { RenderingPipelineFactory, RenderingContext } from './rendering'
import { TextureStorage, GraphicStorage } from './rendering'
import { AnimationController, Tween, ValueTween } from './lib/animation/index'

export class StickChart extends EventTarget {

    private application: Application

    private eventsProducer: EventsProducer

    private pipelineFactory: RenderingPipelineFactory

    private textureStorage: TextureStorage

    private morphController: AnimationController

    private morphAnimation: Tween | null

    private _context: RenderingContext | null

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
        this.timeframe = new Timeframe(
            this,
            () => this.applyTimeframe(),
        )
        this.morphController = new AnimationController(
            config.morph.duration,
            config.morph.ease,
        )

        const renderer = new GraphicStorage(this.application.stage)

        this.pipelineFactory = new RenderingPipelineFactory(renderer)
    }

    public setScreenSize({ width, height }) {
        this.application.renderer.resize(width, height)
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
        const idx = timestamps.length-1

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

            eventTarget: this,
            chartdata,
            plotdata,
        }

        if (context.pool.metaid !== this._context?.pool.metaid) {
            // clear context if metaid changed
            this._context = null
        }

        window.requestAnimationFrame(() => {
            const lastPoint = DataBuilder.getLatest(ctx.plotdata)
            const hasAddedNewPoint = !DataBuilder.isEqual(this.morphAnimation?.to ?? {}, lastPoint)

            if (this._context && ctx && hasAddedNewPoint) {
                this.morphController
                    .forceEnd()
                    .removeListenerAll()
                    .reset()

                const animated = DataBuilder.getLatest(this._context.plotdata)

                const { timeframeNow, timeframeExpected } = this.timeframe
                if (timeframeNow !== timeframeExpected) {
                    new ValueTween(timeframeNow, timeframeExpected)
                        .animateWith(this.morphController)
                        .addListener((timeframe) => this.timeframe.save(timeframe))
                }

                this.morphAnimation = new Tween(animated, lastPoint)
                    .animateWith(this.morphController)
                    .addListener((point) => this.applyLatestPoint(point))

                this.morphController.start()
            }

            if (!this.morphController.isActive) {

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
