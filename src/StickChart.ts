import { DataBuilder, ChartData } from '@chartdata'
import config from '@config'

import { EChartType } from '@enums'
import { Logger } from '@infra'
import { EventsProducer } from '@events'

import MorphController from '@lib/morph'
import { Application, EventSystem } from '@lib/pixi'
import { Timeframe } from '@lib/timeframe'
import { Priceframe } from '@lib/priceframe'
import { Framedata } from '@lib/framedata'
import { Chartdata } from '@lib/chartdata'

import { RenderingPipelineFactory, RenderingContext } from '@rendering'
import { TextureStorage, GraphicStorage } from '@rendering'

export class StickChart extends EventTarget {

    private application: Application

    private eventsProducer: EventsProducer

    private pipelineFactory: RenderingPipelineFactory

    private textureStorage: TextureStorage

    private morphController: MorphController

    private _context: RenderingContext | null

    private timeframe: Timeframe

    private priceframe: Priceframe

    private framedata: Framedata

    private chartdata: Chartdata

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
        this.application.renderer.addSystem(EventSystem, 'events')

        this.eventsProducer = new EventsProducer(this, this.canvas, stageElement)
        this.textureStorage = new TextureStorage(this.application)
        this.timeframe = new Timeframe(this, () => this.applyTimeframe())
        this.framedata = new Framedata()
        this.priceframe = new Priceframe()
        this.chartdata = new Chartdata()
        this.morphController = new MorphController(
            this.chartdata,
            this.priceframe,
            () => this.applyMorph()
        )

        const renderer = new GraphicStorage(this.application.stage)

        this.pipelineFactory = new RenderingPipelineFactory(renderer)
    }

    public setScreenSize({ width, height }): void {
        this.application.renderer.resize(width, height)
    }

    public setTimeframe(timeframe: number): void {
        this.timeframe.save(timeframe)
    }

    public get canvas(): HTMLCanvasElement {
        return this.application.view
    }

    private applyTimeframe(): void {
        if (!this._context) return

        this.morphController.terminatePriceframeTimeline()
        this.morphController.terminatePointsTimeline()

        const chartdata = this._context.chartdata

        const timeframe = this.timeframe.calculate(chartdata).set().get()
        const framedata = this.framedata.calculate(chartdata, timeframe).set().get()
        const priceframe = this.priceframe.calculate(framedata.prices).set().get()

        this._context.plotdata = DataBuilder.plotdata(
            framedata,
            timeframe,
            priceframe,
            this.application.screen,
        )

        this.rerender('timeframe')
    }

    private applyMorph(): void {
        if (!this._context) return

        const chartdata = this.chartdata.get()
        const timeframe = this.timeframe.calculate(chartdata).set().get()
        const framedata = this.framedata.calculate(chartdata, timeframe).set().get()

        this._context.plotdata = DataBuilder.plotdata(
            framedata,
            timeframe,
            this.priceframe.get(),
            this.application.screen,
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
        metapool: any,
        pools: any[],
        paris: any[],
        resolved: any[],
        settlements: any,
        blocksLatest: any,
        transactions: any,
        blocksEntities: any,
        transactionsEntities: any,
    }): void {
        if (!context.metapool) {
            Logger.error('Cannot initiate chart "metapool" is not provided!')

            return
        }

        const pipeline = this.pipelineFactory.get(context.charttype)

        const chartdata = this.chartdata.calculate(context.chartdata).get()
        const timeframe = this.timeframe.calculate(chartdata).get()
        const framedata = this.framedata.calculate(chartdata, timeframe).get()
        const priceframe = this.priceframe.calculate(framedata.prices).get()

        if (context.metapool.metapoolid !== this._context?.metapool.metapoolid) {
            // clear context if metapoolid changed
            this._context = null
            this.morphController.terminatePriceframeTimeline()
            this.morphController.terminatePointsTimeline()
            this.chartdata.set(chartdata)
            this.timeframe.calculate(chartdata).set()
            this.framedata.set(framedata)
            this.priceframe.set(priceframe)
        }

        if (!this.chartdata.isInitialized()) this.chartdata.set(chartdata)
        if (!this.framedata.isInitialized()) this.framedata.set(framedata)
        if (!this.priceframe.isInitialized()) this.priceframe.set(priceframe)

        const plotdata = DataBuilder.plotdata(
            framedata,
            timeframe,
            priceframe,
            this.application.screen,
        )

        const ctx: RenderingContext = {
            metapool: context.metapool,
            pools: context.pools,
            paris: context.paris,
            settlements: context.settlements,
            blocksLatest: context.blocksLatest,
            transactions: context.transactions,
            blocksEntities: context.blocksEntities,
            transactionsEntities: context.transactionsEntities,
            resolved: context.resolved,
            charttype: context.charttype,
            screen: this.application.screen,
            textures: this.textureStorage,

            eventTarget: this,
            chartdata: this.chartdata,
            plotdata,
        }

        window.requestAnimationFrame(() => {
            if (!this._context || !config.morph) {

                pipeline.render(
                    ctx,
                    () => Logger.info('render')
                )

            } else {

                this.morphController.morph(chartdata, priceframe, () => {
                    this.chartdata.set(chartdata)
                    this.timeframe.calculate(chartdata).set()
                    this.framedata.set(framedata)
                    this.priceframe.set(priceframe)
                    this.applyMorph()
                })

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
