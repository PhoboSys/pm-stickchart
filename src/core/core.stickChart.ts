import { Container } from '@pixi/display'
import { Duration } from 'moment'

import { StickChartState } from '../interfaces'
import { IStick } from '../interfaces/interface.stick'
import { CandleStickMiddleware } from '../store/candlestick/store.candlestick.middleware'
import { GridViewMiddleware } from '../store/grid/store.grid.middleware'
import { ZoomHandleMiddleware } from '../store/zoom/store.zoom.middleware'
import { DateRange, ValueRange } from '../utils'

import { MiddlewareRunner } from './core.middlewareRunner'
import { Viewport } from './core.viewport'

export class StickChart {
    private middlewareRunner: MiddlewareRunner<StickChartState> = new MiddlewareRunner<StickChartState>()

    private viewport: Viewport

    private state: StickChartState

    constructor(
        private width: number,
        private height: number,

        private dateRange: DateRange,
        private renderDateRange: DateRange,

        private columnIntervalSize: Duration,
        private stickIntervalWidth: Duration,

        private valueRange: ValueRange,
        private rowIntervalSize: number,

        private renderSticks: IStick[] = [],
    ) {
        this.middlewareRunner.add(new ZoomHandleMiddleware())
        this.middlewareRunner.add(new GridViewMiddleware())
        this.middlewareRunner.add(new CandleStickMiddleware())
    }

    private set setZoomEvent(event: WheelEvent) {
        this.state.zoomEvent = event
    }

    private createState(): void {
        const state: StickChartState = {
            width: this.width,
            height: this.height,
            dateRange: this.dateRange,
            renderDateRange: this.renderDateRange,
            columnIntervalSize: this.columnIntervalSize,
            stickIntervalWidth: this.stickIntervalWidth,
            valueRange: this.valueRange,
            rowIntervalSize: this.rowIntervalSize,
            renderSticks: this.renderSticks,
            zoomEvent: undefined,
        }

        this.state = state
    }

    private createViewport(container: Container): void {
        this.viewport = new Viewport(container)
    }

    public create(container: Container): void {
        this.createViewport(container)

        this.createState()
    }

    public render(): void {
        this.throwIfNotCreatedState()

        this.middlewareRunner.run(this.viewport, this.state)
    }

    public addStick(...stick: IStick[]): void {
        this.renderSticks.unshift(...stick)
    }

    public zoomHandler(event: WheelEvent): void {
        this.setZoomEvent = event

        this.render()
    }

    private throwIfNotCreatedState(): void {
        if (this.state === undefined) {
            throw new Error('Expected to call this.create() before')
        }
    }
}
