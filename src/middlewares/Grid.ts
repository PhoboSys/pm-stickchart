import { Graphics } from '@pixi/graphics'
import { Duration } from 'moment'

import { DateRange, ValueRange } from '..'
import { IMiddleware, IRenderStickChart } from '../interfaces'

import { MiddlewareHandler } from './Handler'

export class GridBuilderMiddleware implements IMiddleware<IRenderStickChart>, IRenderStickChart {
    viewport: Graphics

    width: number

    height: number

    dateRange: DateRange

    renderDateRange: DateRange

    columnIntervalSize: Duration

    stickIntervalWidth: Duration

    valueRange: ValueRange

    rowIntervalSize: number

    handle(options: IRenderStickChart, handler: MiddlewareHandler<IRenderStickChart>): MiddlewareHandler<IRenderStickChart> {
        Object.assign(this, options)

        this.build()

        return handler.next(options)
    }

    private get beginColumnWhitespace(): number {
        const { renderDateRange, dateRange, columnIntervalSize } = this

        const distance = DateRange.getBeginDistance(dateRange, renderDateRange)
        const segment = columnIntervalSize.asMilliseconds()
        const point = 1 - (distance / segment % 1)

        return point * this.columnWhitespace
    }

    private get columnWhitespace(): number {
        const { width, renderDateRange, columnIntervalSize } = this

        return width / renderDateRange.getIntervalsCount(columnIntervalSize)
    }

    private get rowWhitespace(): number {
        const { height, valueRange, rowIntervalSize } = this

        return height / valueRange.getIntervalsCount(rowIntervalSize)
    }

    private get columnsCount(): number {
        return this.renderDateRange.getIntervalsCount(this.columnIntervalSize)
    }

    private get rowsCount(): number {
        return this.valueRange.getIntervalsCount(this.rowIntervalSize)
    }

    public build(): void {
        this.buildVerticalLines()
        this.buildHorizontalLines()
    }

    private buildVerticalLines(): void {
        const { columnsCount, columnWhitespace, height, beginColumnWhitespace, viewport } = this

        const coords: Array<number> = [beginColumnWhitespace]

        for (let i = 0; i < columnsCount; i++) {
            const pos = coords[i]

            coords[i + 1] = pos + columnWhitespace

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(pos, 0)
                .lineTo(pos, height)

            viewport.addChild(line)
        }
    }

    private buildHorizontalLines(): void {
        const { rowsCount, rowWhitespace, width, viewport } = this

        for (let i = 0; i < rowsCount; i++) {
            const pos = i * rowWhitespace

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(0, pos)
                .lineTo(width, pos)
                .endFill()

            viewport.addChild(line)
        }
    }
}
