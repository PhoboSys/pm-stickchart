import { Graphics } from '@pixi/graphics'
import { Duration } from 'moment'

import { IStickChart } from '../types'
import { DateRange, ValueRange } from '../utils'

export class Grid extends Graphics {
    private readonly gridWidth: number

    private readonly gridHeight: number

    private dateRange: DateRange

    private renderDateRange: DateRange

    private segmentDateInterval: Duration

    private stickDateInterval: Duration

    private valueRange: ValueRange

    private readonly valueInterval: number

    constructor({
        width,
        height,
        renderDateRange,
        dateRange,
        segmentDateInterval,
        stickDateInterval,
        valueInterval,
        valueRange,
    }: IStickChart) {
        super()

        this.gridWidth = width
        this.gridHeight = height

        this.dateRange = dateRange
        this.renderDateRange = renderDateRange

        this.segmentDateInterval = segmentDateInterval
        this.stickDateInterval = stickDateInterval

        this.valueRange = valueRange
        this.valueInterval = valueInterval
    }

    private get segmentWidth(): number {
        return this.gridWidth / this.verticalSegmentsCount()
    }

    private get segmentHeight(): number {
        return this.gridHeight / this.horizontalSegmentsCount()
    }

    private get firstSegmentX(): number {
        const point =
      ((this.renderDateRange.from.valueOf() - this.dateRange.from.valueOf()) /
        this.segmentDateInterval.asMilliseconds()) %
      1

        return point * this.segmentWidth
    }

    public build(): Grid {
        this.buildVerticalLines()
        this.buildHorizontalLines()

        return this
    }

    private buildVerticalLines(): void {
        const coords: Array<number> = [this.firstSegmentX]

        const verticalSegmentsCount = this.verticalSegmentsCount()
        const widthForSegment = this.segmentWidth

        for (let i = 0; i < verticalSegmentsCount; i++) {
            const pos = coords[i]

            coords[i + 1] = pos + widthForSegment

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(pos, 0)
                .lineTo(pos, this.gridHeight)

            super.addChild(line)
        }
    }

    private buildHorizontalLines(): void {
        const horizontalSegmentsCount = this.horizontalSegmentsCount()

        for (let i = 0; i < horizontalSegmentsCount; i++) {
            const pos = i * this.segmentHeight

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(0, pos)
                .lineTo(this.gridWidth, pos)
                .endFill()

            super.addChild(line)
        }
    }

    private verticalSegmentsCount(): number {
        const verticalSegmentsCount =
      this.renderDateRange.milliseconds /
      this.segmentDateInterval.asMilliseconds()

        if (verticalSegmentsCount < 1) {
            throw new Error(
                'DateRange could\'t be smaller than the Interval. It should contain 1 or more intervals',
            )
        }

        return verticalSegmentsCount
    }

    private horizontalSegmentsCount(): number {
        const horizontalSegmentsCount = this.valueRange.value / this.valueInterval

        if (horizontalSegmentsCount < 1) {
            throw new Error(
                'DateRange could\'t be smaller than the Interval. It should contain 1 or more intervals',
            )
        }

        return horizontalSegmentsCount
    }
}
