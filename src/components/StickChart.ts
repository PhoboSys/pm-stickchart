import { Graphics } from '@pixi/graphics'
import { Duration } from 'moment'

import { ICandleStick, IStickChart } from '../interfaces'

import { DateRange, ValueRange } from '../utils'

import { CandleStick } from './CandleStick'
import { Grid } from './Grid'

export class StickChart {
    protected width: number

    protected height: number

    protected dateRange: DateRange

    protected renderDateRange: DateRange

    protected columnIntervalSize: Duration

    protected stickIntervalWidth: Duration

    protected valueRange: ValueRange

    protected rowIntervalSize: number

    protected buildedSticks: Graphics

    protected buildedGrid: Graphics

    protected candleSticks: Array<ICandleStick> = []

    constructor({
        width,
        height,
        dateRange,
        renderDateRange,
        columnIntervalSize,
        stickIntervalWidth,
        valueRange,
        rowIntervalSize,
    }: IStickChart) {
        this.width = width
        this.height = height

        this.dateRange = dateRange
        this.renderDateRange = renderDateRange

        this.columnIntervalSize = columnIntervalSize

        this.stickIntervalWidth = stickIntervalWidth

        this.valueRange = valueRange
        this.rowIntervalSize = rowIntervalSize
    }

    public cacheBuild(): Graphics {
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
        const {
            width,
            height,
            dateRange,
            renderDateRange,
            columnIntervalSize,
            valueRange,
            rowIntervalSize,
        } = this

        const grid = new Grid({
            width,
            height,
            dateRange,
            renderDateRange,
            columnIntervalSize,
            valueRange,
            rowIntervalSize,
        })

        return grid.build()
    }

    private buildSticks(): Graphics {
        const builded = new Graphics()

        for (const iStick of this.candleSticks) {
            const {
                width,
                height,
                renderDateRange,
                stickIntervalWidth,
                valueRange,
            } = this

            const stick = new CandleStick({
                ...iStick,
                width,
                height,
                renderDateRange,
                stickIntervalWidth,
                valueRange,
            })

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
