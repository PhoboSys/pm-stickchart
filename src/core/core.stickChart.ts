import { Duration } from 'moment'

import { EmittedEvent } from '../data/aliases/aliases.emittedEvent'
import { ChartTypes, InputEventTypes } from '../data/enums'
import { IStickChartState, IStickChartStyle, IStickChartViewConfig, IRawPricePoint, IPricePoint, IStick } from '../data/interfaces'
import { dataToPriceMappersMap, rawDataMappersMap, newRawDataMappersMap } from '../data/maps'
import {
    defaultStickChartStyle,
    defaultInputEvent,
    defaultStickChartData,
    defaultChartDateRange,
    defaultChartPriceRange,
    defaultColumnIntervalSize,
    defaultIntervalRowSize,
} from '../defaults'

import { Application } from '../libs/pixi'
import { CandleStickMiddleware } from '../store/candlestick/store.candlestick.middleware'
import { DataMiddleware } from '../store/data/store.data.middleware'
import { GridViewMiddleware } from '../store/grid/store.grid.middleware'
import { IntervalsHandlerMiddleware } from '../store/intervals/store.intervals.middleware'
import { LinesViewMiddleware } from '../store/lines/store.lines.middleware'
import { ScrollHandleMiddleware } from '../store/scroll/store.scroll.middleware'
import { ZoomHandleMiddleware } from '../store/zoom/store.zoom.middleware'

import { DataManager } from '../utils'
import { ChartInputEvent } from '../utils/utils.inputEvent'

import { DateRange } from '../utils/utils.range'

import { MiddlewareRunner } from './core.middlewareRunner'
import { Viewport } from './core.viewport'

export class StickChart {
    private middlewareRunner = new MiddlewareRunner<IStickChartState>()

    private viewport: Viewport

    private state: IStickChartState

    private viewConfig: IStickChartViewConfig

    private application: Application

    constructor(
        private width: number,
        private height: number,

        private chartType: ChartTypes,
        private stickIntervalSize: number,

        private columnIntervalSize: number = defaultColumnIntervalSize,

        private style: IStickChartStyle = defaultStickChartStyle,

        private dateRange: DateRange = defaultChartDateRange(),

        private data: IRawPricePoint[] = defaultStickChartData,
    ) {
        this.application = new Application({ width, height, ...style, antialias: true })
        this.application.start()

        this.middlewareRunner.add(new DataMiddleware())
        this.middlewareRunner.add(new ZoomHandleMiddleware())
        this.middlewareRunner.add(new ScrollHandleMiddleware())
        this.middlewareRunner.add(new IntervalsHandlerMiddleware())
        this.middlewareRunner.add(new GridViewMiddleware())
        this.middlewareRunner.add(new LinesViewMiddleware())
        this.middlewareRunner.add(new CandleStickMiddleware())
    }

    public get view(): HTMLCanvasElement {
        return this.application.view
    }

    private createViewConfig(): IStickChartViewConfig {
        return {
            width: this.width,
            height: this.height,

            stickIntervalSize: this.stickIntervalSize,

            columnIntervalSize: this.columnIntervalSize,
            dateRange: this.dateRange,
        }
    }

    private createDataManager(): DataManager<IPricePoint | IStick, IRawPricePoint> {
        const chartType = this.state?.chartType ?? this.chartType

        const rawDataMapper = rawDataMappersMap[chartType]
        const newRawDataMapper = newRawDataMappersMap[chartType]

        return new DataManager<IPricePoint | IStick, IRawPricePoint>(
            this.data,
            (raw) => rawDataMapper(raw, this.viewConfig.stickIntervalSize),
            (data, raw) => newRawDataMapper(<IPricePoint[] | IStick[]>data, raw, this.viewConfig.stickIntervalSize),
        )
    }

    private createState(): IStickChartState {
        return {
            viewConfig: this.viewConfig,
            chartType: this.chartType,
            style: this.style,
            dataManager: this.createDataManager(),
            renderConfig: {
                priceRange: defaultChartPriceRange,
                rowIntervalSize: defaultIntervalRowSize,
                ...this.viewConfig,
                dateRange: this.viewConfig.dateRange.clone(),
            },
        }
    }

    private createViewport(): Viewport {
        return new Viewport(this.application.stage)
    }

    public create(): void {
        this.viewport = this.createViewport()

        this.viewConfig = this.createViewConfig()

        this.state = this.createState()
    }

    public render(): StickChart {
        this.throwIfNotCreatedState()

        this.middlewareRunner.run(this.viewport, this.state)

        return this
    }

    public setChartType(type: ChartTypes): StickChart {
        this.state.chartType = type
        this.state.dataManager = this.createDataManager()

        return this
    }

    public addData(rawPricePoint: IRawPricePoint): StickChart {
        this.data.push(rawPricePoint)
        this.state.dataManager.addData(rawPricePoint)

        return this
    }

    public addInputEventHandler(event: EmittedEvent, type: InputEventTypes): void {
        this.state.inputEvent = new ChartInputEvent(event, type)

        this.render()
    }

    private throwIfNotCreatedState(): void {
        if (this.state === undefined) {
            throw new Error('Expected to call this.create() before')
        }
    }
}
