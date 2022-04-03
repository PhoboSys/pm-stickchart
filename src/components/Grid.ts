import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'
import { Duration } from 'moment'

import { IRenderGrid } from '../interfaces/'
import { ValueRange, DateRange } from '../utils/'

export class Grid extends Graphics {
    protected readonly screenWidth: number

    protected readonly screenHeight: number

    protected readonly dateRange: DateRange

    protected readonly renderDateRange: DateRange

    protected readonly columnIntervalSize: Duration

    protected readonly valueRange: ValueRange

    protected readonly rowIntervalSize: number

    constructor({ width, height, dateRange, renderDateRange, columnIntervalSize, valueRange, rowIntervalSize }: IRenderGrid) {
        super()

        this.screenWidth = width
        this.screenHeight = height

        this.dateRange = dateRange
        this.renderDateRange = renderDateRange

        this.columnIntervalSize = columnIntervalSize

        this.valueRange = valueRange

        this.rowIntervalSize = rowIntervalSize
    }

    private get beginColumnWhitespace(): number {
        const { renderDateRange, dateRange, columnIntervalSize } = this

        const distance = DateRange.getBeginDistance(dateRange, renderDateRange)
        const segment = columnIntervalSize.asMilliseconds()
        const point = 1 - (distance / segment % 1)

        return point * this.columnWhitespace
    }

    private get columnWhitespace(): number {
        const { screenWidth, renderDateRange, columnIntervalSize } = this

        return screenWidth / renderDateRange.getIntervalsCount(columnIntervalSize)
    }

    private get rowWhitespace(): number {
        const { screenHeight, valueRange, rowIntervalSize } = this

        return screenHeight / valueRange.getIntervalsCount(rowIntervalSize)
    }

    private get columnsCount(): number {
        return this.renderDateRange.getIntervalsCount(this.columnIntervalSize)
    }

    private get rowsCount(): number {
        return this.valueRange.getIntervalsCount(this.rowIntervalSize)
    }

    public build(): Grid {
        this.buildVerticalLines()
        this.buildHorizontalLines()

        return this
    }

    private buildVerticalLines(): void {
        const { columnsCount, columnWhitespace, screenHeight, beginColumnWhitespace } = this

        const coords: Array<number> = [beginColumnWhitespace]

        for (let i = 0; i < columnsCount; i++) {
            const pos = coords[i]

            coords[i + 1] = pos + columnWhitespace

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(pos, 0)
                .lineTo(pos, screenHeight)

            super.addChild(line)
        }
    }

    private buildHorizontalLines(): void {
        const { rowsCount, rowWhitespace, screenWidth } = this

        for (let i = 0; i < rowsCount; i++) {
            const pos = i * rowWhitespace

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(0, pos)
                .lineTo(screenWidth, pos)
                .endFill()

            super.addChild(line)
        }
    }
}
