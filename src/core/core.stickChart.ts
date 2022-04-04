import { Container } from '@pixi/display'
import { Duration } from 'moment'

import { StickChartState } from '../interfaces/interface.stickChart'
import { GridViewMiddleware } from '../store/grid/store.grid.middleware'
import { DateRange, ValueRange } from '../utils'

import { MiddlewareHandler } from './core.middlewareHandler'
import { Viewport } from './core.viewport'

export class StickChart {
    private handler: MiddlewareHandler<StickChartState> = new MiddlewareHandler<StickChartState>()

    private viewport: Viewport

    constructor(
        private width: number,
        private height: number,

        private dateRange: DateRange,
        private renderDateRange: DateRange,

        private columnIntervalSize: Duration,
        private stickIntervalWidth: Duration,

        private valueRange: ValueRange,
        private rowIntervalSize: number,
    ) {
        this.handler.add(new GridViewMiddleware())

    }

    public set setViewport(container: Container) {
        this.viewport = new Viewport(container)
    }

    public render(): void {
        const state: StickChartState = {
            v: 0,
            width: this.width,
            height: this.height,
            dateRange: this.dateRange,
            renderDateRange: this.renderDateRange,
            columnIntervalSize: this.columnIntervalSize,
            stickIntervalWidth: this.stickIntervalWidth,
            valueRange: this.valueRange,
            rowIntervalSize: this.rowIntervalSize,
        }

        this.handler.next(this.viewport, state)
    }
}
