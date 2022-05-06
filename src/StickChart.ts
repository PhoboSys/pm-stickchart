import { DataConverter, ChartData } from './chartdata'
import config from './config'


import { EChartType } from './enums'
import { EventsProducer, ZoomEvent } from './events'
import { Logger } from './infra'

import datamath from './lib/datamath'
import { Application, gsap } from './lib/pixi'
import { UNIX_DAY, UNIX_MINUTE } from './lib/date-utils'

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

    private _context: RenderingContext

    private timeline: any

    private timeframe: number = UNIX_DAY

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
            const offset = Math.round(this.timeframe * zoom)
            const timeframe = this.timeframe + offset

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
        if (validate(timeframe)) {
            this.applyTimeframe(timeframe)
        } else {
            this.applyTimeframe(UNIX_DAY)
        }
    }

    public get canvas(): HTMLCanvasElement {
        return this.application.view
    }

    private applyTimeframe(timeframe: number) {
        this.timeframe = timeframe
        if (!this._context) return

        this._context.plotdata = DataConverter.plotdata(
            this._context.chartdata,
            this.application.screen,
            this.timeframe,
        )
        this.rerender('timeframe')
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
            this.timeframe,
        )
        this.rerender('latestpoint')
    }

    public rerender(reason: string): void {

        if (!this._context) return

        window.requestAnimationFrame(() => {
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
        const plotdata = DataConverter.plotdata(chartdata, this.application.screen, this.timeframe)
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

        window.requestAnimationFrame(() => {

            // Morph
            if (config.morph && this._context) {

                const aminatedPoint = DataConverter.getLatest(this._context.plotdata)

                this.timeline?.kill()
                this.timeline = gsap.to(
                    aminatedPoint,
                    {
                        ...DataConverter.getLatest(ctx.plotdata),
                        duration: 1,
                        ease: 'power2',
                        onUpdate: () => this.applyLatestPoint(aminatedPoint)
                    }
                )
            } else {
                Logger.info('render')
                pipeline.render(
                    ctx,
                    () => this.application.render()
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
