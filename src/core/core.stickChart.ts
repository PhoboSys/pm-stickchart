import { EmittedEvent } from '../data/aliases/aliases.emittedEvent'
import { ChartTypes, InputEventTypes } from '../data/enums'
import { IState, IRawPricePoint, IPricePoint, IStick } from '../data/interfaces'
import { IStickChartOptions, IRenderConfig, IBasicConfig } from '../data/interfaces/interface.stickChart'
import { rawDataMappersMap, newRawDataMappersMap } from '../data/maps'
import { dataToDateMappersMap } from '../data/maps/map.dataToDateMappers'
import {
    defaultChartPriceRange,
    defaultRowIntervalSize,
    defaultStickChartOptions,
} from '../defaults'
import { Application } from '../libs/pixi'
import { CandleStickViewMiddleware } from '../store/candlestick/store.candlestick.middleware'
import { DataMiddleware } from '../store/data/store.data.middleware'
import { GridViewMiddleware } from '../store/grid/store.grid.middleware'
import { IntervalsHandlerMiddleware } from '../store/intervals/store.intervals.middleware'
import { LinesViewMiddleware } from '../store/lines/store.lines.middleware'
import { ScrollHandleMiddleware } from '../store/scroll/store.scroll.middleware'
import { ZoomHandleMiddleware } from '../store/zoom/store.zoom.middleware'

import { DataManager } from '../utils'
import { ChartInputEvent } from '../utils/utils.inputEvent'

import { MiddlewareRunner } from './core.middlewareRunner'
import { Viewport } from './core.viewport'

export class StickChart {
    private middlewareRunner = new MiddlewareRunner<IState>()

    private viewport: Viewport

    private application: Application

    private state: IState

    private options: IStickChartOptions

    constructor(
        options: Partial<IStickChartOptions>,
    ) {
        this.options = Object.assign(defaultStickChartOptions(), options)

        this.application = this.createApplication()
        this.application.start()

        this.middlewareRunner.add(new DataMiddleware())
        this.middlewareRunner.add(new ZoomHandleMiddleware())
        this.middlewareRunner.add(new ScrollHandleMiddleware())
        this.middlewareRunner.add(new IntervalsHandlerMiddleware())
        this.middlewareRunner.add(new LinesViewMiddleware())
        this.middlewareRunner.add(new CandleStickViewMiddleware())
        this.middlewareRunner.add(new GridViewMiddleware())
    }

    public get view(): HTMLCanvasElement {
        return this.application.view
    }

    private createApplication(): Application {
        const { options } = this

        return new Application({ ...options, ...options.style, antialias: true })
    }

    private createState(): IState {
        const state: IState = {
            chartType: this.options.chartType,
            basicConfig: this.createBasicConfig(),
            renderConfig: this.createRenderConfig(),
            dataManager: this.createDataManager(),
        }

        return state
    }

    private createBasicConfig(): IBasicConfig {
        const { width, height, style, stickIntervalSize, dateRange } = this.options

        const basicConfig: IBasicConfig = {
            width,
            height,
            style,
            stickIntervalSize,
            dateRange: dateRange.clone(),
        }

        return basicConfig
    }

    private createRenderConfig(): IRenderConfig {
        const { dateRange, columnIntervalSize } = this.options

        const renderConfig: IRenderConfig = {
            columnIntervalSize,
            dateRange: dateRange.clone(),
            priceRange: defaultChartPriceRange,
            rowIntervalSize: defaultRowIntervalSize,
        }

        return renderConfig
    }

    private createDataManager(): DataManager<IPricePoint | IStick, IRawPricePoint> {
        const { stickIntervalSize, data } = this.options
        const chartType = this.state?.chartType ?? this.options.chartType

        const rawDataMapper = rawDataMappersMap[chartType]
        const newRawDataMapper = newRawDataMappersMap[chartType]
        const dateMapper = dataToDateMappersMap[chartType]

        return new DataManager<IPricePoint | IStick, IRawPricePoint>(
            data,
            (raw) => rawDataMapper(raw, stickIntervalSize),
            (prevData, raw) => newRawDataMapper(<IPricePoint[] | IStick[]>prevData, raw, stickIntervalSize),
            dateMapper,
        )
    }

    private createViewport(): Viewport {
        return new Viewport(this.application.stage)
    }

    public create(): StickChart {
        this.viewport = this.createViewport()

        this.state = this.createState()

        return this
    }

    public render(): StickChart {
        this.throwIfStateNotCreated()

        this.middlewareRunner.run(this.viewport, this.state)

        return this
    }

    public setChartType(type: ChartTypes): StickChart {
        this.state.chartType = type
        this.state.dataManager = this.createDataManager()

        return this
    }

    public addData(rawPricePoint: IRawPricePoint): StickChart {
        this.options.data.push(rawPricePoint)
        this.state.dataManager.addData(rawPricePoint)

        return this
    }

    public addInputEventHandler(event: EmittedEvent, type: InputEventTypes): void {
        this.state.inputEvent = new ChartInputEvent(event, type)

        this.render()
    }

    private throwIfStateNotCreated(): void {
        if (this.state !== undefined) return

        throw new Error('Expected to call this.create() before')
    }
}
