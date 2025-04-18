import { DataBuilder, ChartData, ChartTheme, Bettor } from '@chartdata'
import config from '@config'
import { DEFAULT_THEME } from '@constants'

import { EChartType } from '@enums'
import { Logger } from '@infra'
import { EventsProducer } from '@events'

import { createFeatures } from '@features'
import { Features } from '@features'

import MorphController from '@lib/morph'
import { Application, EventSystem } from '@lib/pixi'
import { Timeframe } from '@lib/timeframe'
import { FontsReady } from '@lib/fontsready'

import { RenderingPipelineFactory, RenderingContext } from '@rendering'
import { TextureStorage, GraphicStorage } from '@rendering'
import { createOptions, Options } from '@options'

export class StickChart extends EventTarget {

    private application: Application

    private eventsProducer: EventsProducer

    private pipelineFactory: RenderingPipelineFactory

    private textureStorage: TextureStorage

    private morphController: MorphController

    private _context: RenderingContext | null

    private timeframe: Timeframe

    private fontsready: FontsReady

    constructor(
        private stageElement: HTMLElement,
        private options? : Options,
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

        this.fontsready = new FontsReady()
        this.eventsProducer = new EventsProducer(this, this.canvas, stageElement, !!options?.isMobile)
        this.textureStorage = new TextureStorage(this.application)
        this.timeframe = new Timeframe(this, () => this.applyTimeframe(), !!options?.isMobile)
        this.morphController = new MorphController(() => this.applyMorph())

        const renderer = new GraphicStorage(this.application.stage)

        this.pipelineFactory = new RenderingPipelineFactory(renderer)
    }

    public setScreenSize({ width, height }): void {
        if (width === 0) return
        if (height === 0) return

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

    public resetTimeframe(): void {
        this.timeframe.reset()
        this.applyTimeframe()
    }

    public get canvas(): HTMLCanvasElement {
        return this.application.view
    }

    private applyTimeframe(): void {
        if (!this._context) return
        if (this._context.screen?.width === 0) return
        if (this._context.screen?.height === 0) return

        this._context.plotdata = DataBuilder.plotdata(
            this._context.chartdata,
            this.application.screen,
            this.timeframe.now(DataBuilder.getLatestTS(this._context.chartdata)).get(),
        )
        this.rerender('timeframe')
    }

    private applyMorph(): void {
        if (!this._context) return
        if (this._context.screen?.width === 0) return
        if (this._context.screen?.height === 0) return

        this._context.plotdata = DataBuilder.plotdata(
            this._context.chartdata,
            this.application.screen,
            this.timeframe.now(DataBuilder.getLatestTS(this._context.chartdata)).get(),
        )
        this.rerender('morph')
    }

    public rerender(reason: string): void { // eslint-disable-line
        window.requestAnimationFrame(() => {
            if (!this._context) return
            if (this._context.screen?.width === 0) return
            if (this._context.screen?.height === 0) return

            const pipeline = this.pipelineFactory.get(this._context.charttype)

            pipeline.render(
                {
                    ...this._context,
                    rerender: true
                },
                () => {}
            )
        })
    }

    public render(context: {
        chartdata: ChartData,
        charttype: EChartType,
        game: any,
        rounds: any[],
        predictions: any[],
        resolved: any[],
        settlments: any,
        focusroundid: any,
        blocksLatest: any,
        transactions: any,
        blocksEntities: any,
        transactionsEntities: any,
        bettor: Bettor,
        features: Features,
        charttheme: ChartTheme,
    }): void {
        if (!context.game) {
            return Logger.error('Cannot initiate chart "game" is not provided!')
        }
        if (!this.application.screen) return
        if (this.application.screen.width === 0) return
        if (this.application.screen.height === 0) return

        const pipeline = this.pipelineFactory.get(context.charttype)
        const chartdata = DataBuilder.chartdata(context.chartdata)
        const plotdata = DataBuilder.plotdata(
            chartdata,
            this.application.screen,
            this.timeframe.now(DataBuilder.getLatestTS(chartdata)).get()
        )
        const features = createFeatures(context.features)
        const options = createOptions(this.options)

        const ctx: RenderingContext = {
            game: context.game,
            rounds: context.rounds,
            predictions: context.predictions,
            settlments: context.settlments,
            focusroundid: context.focusroundid,
            blocksLatest: context.blocksLatest,
            transactions: context.transactions,
            blocksEntities: context.blocksEntities,
            transactionsEntities: context.transactionsEntities,
            bettor: context.bettor,
            resolved: context.resolved,
            charttype: context.charttype,
            charttheme: context.charttheme || DEFAULT_THEME,
            screen: this.application.screen,
            textures: this.textureStorage,
            timeframe: this.timeframe,
            morph: this.morphController,

            eventTarget: this,
            chartdata,
            plotdata,
            features,

            options,
        }

        if (context.game.gameid !== this._context?.game.gameid) {
            // clear context if gameid changed
            this._context = null
            this.timeframe.reset()
        }

        if (!this.fontsready.succeed && !this.fontsready.inprogress) {
            this.fontsready.load().then(() => {
                window.requestAnimationFrame(() => {
                    pipeline.render(
                        ctx,
                        () => Logger.info('render', ctx.plotdata.latest.timestamp)
                    )
                    this._context = ctx
                })
            })
        }

        if (this.fontsready.succeed) {
            window.requestAnimationFrame(() => {
                if (!this._context || !config.morph) {
                    pipeline.render(
                        ctx,
                        () => Logger.info('render', ctx.plotdata.latest.timestamp)
                    )

                } else {

                    this.morphController.morph(this._context.chartdata, ctx.chartdata)

                }

                // save latest rendered context
                this._context = ctx
            })
        }
    }

    public destroy(): void {
        this.application.destroy()
        this.eventsProducer.destroy()
        this.timeframe.destroy()
    }
}
