import { DataConverter, ChartData } from './chartdata'
import config from './config'

import { EChartType } from './enums'
import { EventsProducer, ZoomEvent } from './events'
import { Logger } from './infra'

import datamath from './lib/datamath'
import { Application, gsap } from './lib/pixi'
import { nowUnixTS, UNIX_DAY, UNIX_MINUTE } from './lib/date-utils'

import { RenderingPipelineFactory, RenderingContext } from './rendering'
import { TextureStorage, GraphicStorage } from './rendering'

function validate(duration) {
    return duration && !tooBig(duration) && !tooSmall(duration)
}

function tooBig(duration) {
    return duration > UNIX_DAY
}

function tooSmall(duration) {
    return duration < UNIX_MINUTE * 10
}

export class StickChart extends EventTarget {

    private application: Application

    private eventsProducer: EventsProducer

    private pipelineFactory: RenderingPipelineFactory

    private textureStorage: TextureStorage

    private _context: RenderingContext | null

    private animation: any

    private since: number = nowUnixTS() - UNIX_DAY

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

        this.addEventListener('zoom', (e: ZoomEvent) => {

            const zoom = e.zoom
            let timeframe = nowUnixTS() - this.since
            timeframe += Math.round(timeframe * zoom)

            const zoominUp = zoom > 0
            const zoominDown = zoom < 0

            const hitLower = tooSmall(timeframe) && zoominDown
            const hitUpper = tooBig(timeframe) && zoominUp

            if (!hitLower && !hitUpper) {
                this.applyTimeframe(timeframe)
            }

        })

        const renderer = new GraphicStorage(this.application.stage)

        this.pipelineFactory = new RenderingPipelineFactory(renderer)
    }

    public setTimeframe(timeframe: number) {
        if (!validate(timeframe)) timeframe = UNIX_DAY
        this.since = nowUnixTS() - timeframe
    }

    public get canvas(): HTMLCanvasElement {
        return this.application.view
    }

    private applyTimeframe(timeframe: number) {
        this.since = nowUnixTS() - timeframe
        if (!this._context) return

        this._context.plotdata = DataConverter.plotdata(
            this._context.chartdata,
            this.application.screen,
            this.since,
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

        this._context.plotdata = DataConverter.plotdata(
            this._context.chartdata,
            this.application.screen,
            this.since,
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
        const chartdata = DataConverter.chartdata(context.chartdata)
        const plotdata = DataConverter.plotdata(chartdata, this.application.screen, this.since)
        const ctx = {
            pool: context.pool,
            paris: context.paris,
            resolved: context.resolved,
            charttype: context.charttype,
            screen: this.application.screen,
            textures: this.textureStorage,

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

                const aminated = DataConverter.getLatest(this._context.plotdata)
                const target = DataConverter.getLatest(ctx.plotdata)

                if (!DataConverter.isEqual(aminated, target)) {

                    // morph animation
                    this.animation = gsap.to(
                        aminated,
                        {
                            ...target,
                            duration: 1,
                            ease: 'power2.out',
                            onUpdate: () => {
                                if (!DataConverter.isEqual(aminated, target)) {
                                    this.applyLatestPoint(aminated)
                                }
                            },
                            onComplete: () => {
                                // gsap has limited precision
                                // in order to render exactly target
                                // we have to apply taregt in the end
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
    }
}
