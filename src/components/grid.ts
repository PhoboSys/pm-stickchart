import { Graphics } from '@pixi/graphics'

import { IStickChart } from '../types/stick_chart'
import { DateRange } from '../utils/date_range'
import { ValueRange } from '../utils/value_range'
export class Grid extends Graphics {
    gridWidth: number

    gridHeight: number

    dateRange: DateRange

    segmentDateInterval: DateRange

    stickDateInterval: DateRange

    valueRange: ValueRange

    valueInterval: ValueRange

    constructor({ width, height, dateRange, segmentDateInterval, stickDateInterval, valueInterval, valueRange }: IStickChart) {
        super()

        this.gridWidth = width
        this.gridHeight = height

        this.dateRange = dateRange
        this.segmentDateInterval = segmentDateInterval
        this.stickDateInterval = stickDateInterval

        this.valueRange = valueRange
        this.valueInterval = valueInterval
    }

    build(): Grid {
        this.buildVerticalLines()
        this.buildHorizontalLines()

        return this
    }

    private buildVerticalLines(): void {
        const verticalSegmentsCount = this.verticalSegmentsCount()

        for (let i = 0; i < verticalSegmentsCount; i++) {
            const pos = i * this.widthForSegment()

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xFFFF })
                .moveTo(pos, 0)
                .lineTo(pos, this.gridHeight)

            super.addChild(line)
        }
    }

    private buildHorizontalLines(): void {
        const horizontalSegmentsCount = this.horizontalSegmentsCount()

        for (let i = 0; i < horizontalSegmentsCount; i++) {
            const pos = i * this.heightForSegment()

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xFFFF })
                .moveTo(0, pos)
                .lineTo(this.gridWidth, pos)
                .endFill()

            super.addChild(line)
        }
    }

    private widthForSegment(): number {
        return this.gridWidth / this.verticalSegmentsCount()
    }

    private heightForSegment(): number {
        return this.gridHeight / this.horizontalSegmentsCount()
    }

    private verticalSegmentsCount(): number {
        const verticalSegmentsCount =
            this.dateRange.milliseconds / this.segmentDateInterval.milliseconds

        if (verticalSegmentsCount < 1) {
            throw new Error('DateRange could\'t be smaller than the Interval. It should contain 1 or more intervals')
        }

        return verticalSegmentsCount
    }

    private horizontalSegmentsCount(): number {
        const horizontalSegmentsCount =
            this.valueRange.value / this.valueInterval.value

        if (horizontalSegmentsCount < 1) {
            throw new Error('DateRange could\'t be smaller than the Interval. It should contain 1 or more intervals')
        }

        return horizontalSegmentsCount
    }
}
