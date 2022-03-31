import { Graphics } from '@pixi/graphics'
import { Moment } from 'moment'

import { ChartOptions } from './chart'

type CandleStickOptions = {
    low: number,
    high: number,
    open: number,
    close: number,
    time: Moment,

    chartOptions: ChartOptions
}

export class CandleStick extends Graphics {
    low: number

    high: number

    open: number

    close: number

    time: Moment

    chartOptions: ChartOptions

    constructor({ low, high, open, close, time, chartOptions }: CandleStickOptions) {
        super()

        this.low = low
        this.high = high
        this.open = open
        this.close = close
        this.time = time

        this.chartOptions = chartOptions
    }

    private get color(): number {
        return this.open < this.close ? 0x00FF00 : 0xFF0000
    }

    private get stickWidth(): number {
        const { dateRange, stickDateInterval: stickInterval, width: chartWidth } = this.chartOptions

        return chartWidth * (stickInterval.milliseconds / dateRange.milliseconds)
    }

    private get rectHeight(): number {
        return this.valueIntoY(Math.abs(this.open - this.close))
    }

    private get centerX(): number {
        return this.timeIntoX(this.time) + (this.stickWidth / 2)
    }

    private get rectTopY(): number {
        return this.valueIntoY(Math.max(this.open, this.close))
    }

    build(): CandleStick {
        this.buildLine()
        this.buildRectangle()

        return this
    }

    private buildLine(): void {
        const line = new Graphics()

        line
            .lineStyle({ width: 1, color: this.color })
            .moveTo(this.centerX, this.valueIntoY(this.high))
            .lineTo(this.centerX, this.valueIntoY(this.low))

        super.addChild(line)
    }

    private buildRectangle(): void {
        const rectangle = new Graphics()

        const x = this.timeIntoX(this.time), y = this.rectTopY
        const width = this.stickWidth, height = this.rectHeight

        rectangle
            .beginFill(this.color)
            .drawRect(x, y, width, height)
            .endFill()

        super.addChild(rectangle)
    }

    private valueIntoY(value: number): number {
        const { valueRange, height } = this.chartOptions

        const valuePoint = 1 - valueRange.findValuePoint(value)

        return valuePoint * height
    }

    private valueIntoSize(value: number): number {
        const { valueRange, height } = this.chartOptions

        const valuePoint = valueRange.findValuePoint(value)

        return valuePoint * height
    }

    private timeIntoX(time: Moment): number {
        const { dateRange, width } = this.chartOptions

        const timePoint = dateRange.findTimePoint(time)

        return timePoint * width
    }

}
