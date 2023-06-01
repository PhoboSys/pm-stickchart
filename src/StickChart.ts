import { DataBuilder, ChartData } from '@chartdata'
import config from '@config'

import { EChartType } from '@enums'
import { Logger } from '@infra'
import { EventsProducer } from '@events'

import MorphController from '@lib/morph'
import { Application, EventSystem } from '@lib/pixi'
import { Timeframe } from '@lib/timeframe'

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
        this.morphController = new MorphController(() => this.applyMorph())

        const renderer = new GraphicStorage(this.application.stage)

        this.pipelineFactory = new RenderingPipelineFactory(renderer)
    }

    public setScreenSize({ width, height }): void {
        this.application.renderer.resize(width, height)

        if (!this._context) return

        this._context.plotdata = DataBuilder.plotdata(
            this._context.chartdata,
            this.application.screen,
            this.timeframe.now(DataBuilder.getLatestTS(this._context.chartdata)).get(),
        )
        this.rerender('resize')
    }

    public setTimeframe(timeframe: number): void {
        this.timeframe.save(timeframe)
    }

    public get canvas(): HTMLCanvasElement {
        return this.application.view
    }

    private applyTimeframe(): void {
        if (!this._context) return

        this._context.plotdata = DataBuilder.plotdata(
            this._context.chartdata,
            this.application.screen,
            this.timeframe.now(DataBuilder.getLatestTS(this._context.chartdata)).get(),
        )
        this.rerender('timeframe')
    }

    private applyMorph(): void {
        if (!this._context) return

        this._context.plotdata = DataBuilder.plotdata(
            this._context.chartdata,
            this.application.screen,
            this.timeframe.now(DataBuilder.getLatestTS(this._context.chartdata)).get(),
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
        const chartdata = DataBuilder.chartdata(context.chartdata)
        const plotdata = DataBuilder.plotdata(
            chartdata,
            this.application.screen,
            this.timeframe.now(DataBuilder.getLatestTS(chartdata)).get()
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
            chartdata,
            plotdata,
        }

        if (context.metapool.metapoolid !== this._context?.metapool.metapoolid) {
            // clear context if metapoolid changed
            this._context = null
        }

        window.requestAnimationFrame(() => {
            if (!this._context || !config.morph) {

                pipeline.render(
                    ctx,
                    () => Logger.info('render')
                )

            } else {

                this.morphController.morph(this._context.chartdata, ctx.chartdata)

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
