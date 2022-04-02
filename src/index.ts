import 'module-alias/register'

import { Graphics } from '@pixi/graphics'

import { Duration } from 'moment'

import { Grid } from './components'
import { CandleStick } from './components/CandleStick'
import { IStickChart } from './interfaces'
import { ICandleStick } from './interfaces/candleStick'
import { IRenderStickChart } from './interfaces/stickChart'

import { DateRange } from '@utils/DateRange'
import { ValueRange } from '@utils/ValueRange'

export { Grid, CandleStick } from './components'
export { Application } from '@pixi/app'

export class StickChart {
    protected readonly width: number

    protected readonly height: number

    protected dateRange: DateRange

    protected renderDateRange: DateRange

    protected segmentDateInterval: Duration

    protected stickDateInterval: Duration

    protected valueRange: ValueRange

    protected valueInterval: number

    protected buildedSticks: Graphics

    protected buildedGrid: Graphics

    protected renderStickChart: IRenderStickChart

    protected candleSticks: Array<ICandleStick> = []

    constructor({
        width,
        height,
        dateRange,
        renderDateRange,
        segmentDateInterval,
        stickDateInterval,
        valueRange,
        valueInterval,
    }: IStickChart) {
        this.width = width
        this.height = height

        this.dateRange = dateRange
        this.renderDateRange = renderDateRange
        this.segmentDateInterval = segmentDateInterval
        this.stickDateInterval = stickDateInterval

        this.valueRange = valueRange
        this.valueInterval = valueInterval
    }

    private get segmentWidth(): number {
        return this.width / this.verticalSegmentsCount
    }

    private get segmentHeight(): number {
        return this.height / this.horizontalSegmentsCount
    }

    protected get horizontalSegmentsCount(): number {
        const horizontalSegmentsCount = this.valueRange.value / this.valueInterval

        if (horizontalSegmentsCount < 1) {
            throw new Error(
                'ValueRange could\'t be smaller than the ValueInterval. It should contain at least 1 Interval',
            )
        }

        return horizontalSegmentsCount
    }

    protected get verticalSegmentsCount(): number {
        const { renderDateRange, segmentDateInterval } = this

        const verticalSegmentsCount =
            renderDateRange.milliseconds / segmentDateInterval.asMilliseconds()

        if (verticalSegmentsCount < 1) {
            throw new Error(
                'DateRange could\'t be smaller than the Interval. It should contain at least 1 Interval',
            )
        }

        return verticalSegmentsCount
    }

    private get firstVerticalSegmentX(): number {
        const { renderDateRange, dateRange, segmentDateInterval } = this

        const distance = renderDateRange.from.valueOf() - dateRange.from.valueOf()
        const segment = segmentDateInterval.asMilliseconds()
        const point = 1 - (distance / segment % 1)

        return point * this.segmentWidth
    }

    private get firstHorizontalSegmentY(): number {
        return 0
    }

    private appendRenderStickChart(): void {
        const renderStickChart: IRenderStickChart = {
            width: this.width,
            height: this.height,
            verticalSegmentsCount: this.verticalSegmentsCount,
            horizontalSegmentsCount: this.horizontalSegmentsCount,
            segmentWidth: this.segmentWidth,
            segmentHeight: this.segmentHeight,
            firstVerticalSegmentX: this.firstVerticalSegmentX,
            firstHorizontalSegmentY: this.firstHorizontalSegmentY,
            dateRange: this.dateRange,
            renderDateRange: this.renderDateRange,
            segmentDateInterval: this.segmentDateInterval,
            stickDateInterval: this.stickDateInterval,
            valueRange: this.valueRange,
            valueInterval: this.valueInterval,
        }

        this.renderStickChart = renderStickChart
    }

    public cacheBuild(): Graphics {
        this.appendRenderStickChart()

        const grid = this.buildGrid()
        const sticks = this.buildSticks()

        this.buildedGrid = grid
        this.buildedSticks = sticks

        const chart = new Graphics()

        chart
            .addChild(grid)
            .addChild(sticks)

        return chart
    }

    private buildGrid(): Graphics {
        const grid = new Grid(this.renderStickChart)

        return grid.build()
    }

    private buildSticks(): Graphics {
        const builded = new Graphics()

        for (const iStick of this.candleSticks) {
            const stick = new CandleStick(iStick, this.renderStickChart)

            builded.addChild(stick.build())
        }

        return builded
    }

    public rebuild(): Graphics {
        if (this.buildedGrid === undefined || this.buildedSticks === undefined) {
            throw Error('Expected to call this.cacheBuild() before')
        }

        const chart = new Graphics()

        chart
            .addChild(this.buildedSticks)
            .addChild(this.buildedGrid)

        return chart
    }

    public addCandleStick(candleStick: ICandleStick): void {
        this.candleSticks.push(candleStick)
    }
}
