import { isEmpty } from 'lodash'

import { Duration } from 'moment'

import { EmittedEvent } from '../data/aliases/aliases.emittedEvent'
import { ChartTypes, InputEventTypes } from '../data/enums'
import { IStickChartState, IStickChartStyle, IStickChartViewConfig, IRawPricePoint, IPricePoint, IStick } from '../data/interfaces'
import { dataToValueMappersMap } from '../data/maps/map.dataToValueMappers'
import { rawDataMappersMap } from '../data/maps/map.rawDataMappers'
import {
    defaultStickChartStyle,
    defaultInputEvent,
    defaultStickChartData,
    defaultChartDateRange,
    defaultChartValueRange,
    defaultColumnIntervalSize,
    defaultIntervalRowSize,
    defaultStickIntervalSize,
} from '../defaults'
import { Application } from '../libs/pixi'
import { CandleStickMiddleware } from '../store/candlestick/store.candlestick.middleware'
import { GridViewMiddleware } from '../store/grid/store.grid.middleware'
import { IntervalsHandlerMiddleware } from '../store/intervals/store.intervals.middleware'
import { LinesViewMiddleware } from '../store/lines/store.lines.middleware'
import { ScrollHandleMiddleware } from '../store/scroll/store.scroll.middleware'
import { ZoomHandleMiddleware } from '../store/zoom/store.zoom.middleware'

import { DateRange } from '../utils'

import { DataManager } from './core.dataManager'
import { ChartInputEvent } from './core.inputEvent'
import { MiddlewareRunner } from './core.middlewareRunner'
import { Viewport } from './core.viewport'

import { Logger } from '../infra'

export class StickChart {

    private middlewareRunner = new MiddlewareRunner<IStickChartState>()

    private logger = new Logger('pm')

    private viewport: Viewport

    private state: IStickChartState

    private viewConfig: IStickChartViewConfig

    private application: Application

    constructor(
        private width: number,
        private height: number,

        private chartType: ChartTypes,
        private stickIntervalSize: Duration,

        private columnIntervalSize: Duration = defaultColumnIntervalSize,
        private dateRange: DateRange = defaultChartDateRange(),

        private style: IStickChartStyle = defaultStickChartStyle,
        private data: IRawPricePoint[] = defaultStickChartData,
    ) {
        this.application = new Application({ width, height, ...style, antialias: true })
        this.application.start()

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

            chartType: this.chartType,
            stickIntervalSize: this.stickIntervalSize,

            columnIntervalSize: this.columnIntervalSize,
            dateRange: this.dateRange,
        }
    }

    private createDataManager(): DataManager<IPricePoint | IStick> {
        const rawDataMapper = rawDataMappersMap[this.viewConfig.chartType]
        const data = rawDataMapper(this.data, this.viewConfig.stickIntervalSize)

        return new DataManager<IPricePoint | IStick>(
            data,
            dataToValueMappersMap[this.viewConfig.chartType],
        )
    }

    private createState(): IStickChartState {
        return {
            viewConfig: this.viewConfig,
            style: this.style,
            data: this.data,
            renderConfig: {
                valueRange: defaultChartValueRange,
                rowIntervalSize: defaultIntervalRowSize,
                dataManager: this.createDataManager(),
                ...this.viewConfig,
                columnIntervalSize: this.viewConfig.columnIntervalSize.clone(),
                dateRange: this.viewConfig.dateRange.clone(),
                backgroundAlpha: 0,
            },
            inputEvent: defaultInputEvent,
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

    public render(state?: any): void {
        if (isEmpty(state)) this.logger.error('state object is not provided to render')

        this.middlewareRunner.run(this.viewport, this.state)
    }

    public setChartType(type: ChartTypes): void {
        this.state.viewConfig.chartType = type

        this.state.renderConfig.dataManager = this.createDataManager()

        this.render()
    }

    public inputData(rawPricePoint: IRawPricePoint): void {
        this.state.data.push(rawPricePoint)

        this.state.renderConfig.dataManager = this.createDataManager()
    }

    public addInputEventHandler(event: EmittedEvent, type: InputEventTypes): void {
        this.state.inputEvent = new ChartInputEvent(event, type)

        this.render()
    }
}
