import { Graphics } from '@pixi/graphics'

import { Moment } from 'moment'

import { ICandleStick } from '@interfaces/candleStick'
import { IRenderStickChart, IStickChart } from '@interfaces/stickChart'

export class CandleStick extends Graphics {
    private readonly low: number

    private readonly high: number

    private readonly open: number

    private readonly close: number

    private readonly time: Moment

    private stickChart: IStickChart

    constructor({ low, high, open, close, time }: ICandleStick, stickChart: IRenderStickChart) {
        super()

        this.low = low
        this.high = high
        this.open = open
        this.close = close
        this.time = time

        this.stickChart = stickChart
    }

    private get color(): number {
        return this.open < this.close ? 0x00FF00 : 0xFF0000
    }

    private get stickWidth(): number {
        const { renderDateRange, stickDateInterval: stickInterval, width: chartWidth } = this.stickChart

        return chartWidth * (stickInterval.asMilliseconds() / renderDateRange.milliseconds)
    }

    private get rectHeight(): number {
        return this.valueIntoHeight(Math.abs(this.open - this.close))
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
        const { valueRange, height } = this.stickChart

        const valuePoint = 1 - valueRange.findValuePoint(value)

        return valuePoint * height
    }

    private valueIntoHeight(value: number): number {
        const { valueRange, height } = this.stickChart

        const valuePoint = valueRange.findValuePoint(value)

        return valuePoint * height
    }

    private timeIntoX(time: Moment): number {
        const { renderDateRange, width } = this.stickChart

        const timePoint = renderDateRange.findTimePoint(time)

        return timePoint * width
    }
}
