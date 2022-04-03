import { Graphics } from '@pixi/graphics'

import { Duration } from 'moment'

import { ValueRange, DateRange } from '../utils/'

import { IRenderCandleStick } from '@interfaces/candleStick'

export class CandleStick extends Graphics {
    private readonly low: number

    private readonly high: number

    private readonly open: number

    private readonly close: number

    private readonly date: Date

    private screenWidth: number

    private screenHeight: number

    private readonly renderDateRange: DateRange

    private readonly stickIntervalWidth: Duration

    private readonly valueRange: ValueRange

    public set width(width) {
        this.screenWidth = width
    }

    public set height(height) {
        this.screenHeight = height
    }

    constructor(init: IRenderCandleStick) {
        super()
        Object.assign(this, init)
    }

    private get color(): number {
        return this.open < this.close ? 0x00FF00 : 0xFF0000
    }

    private get rectWidth(): number {
        const { screenWidth, stickIntervalWidth, renderDateRange } = this

        return screenWidth * (stickIntervalWidth.asMilliseconds() / renderDateRange.duration)
    }

    private get rectHeight(): number {
        const { valueRange, screenHeight } = this

        const valuePoint = valueRange.findValuePoint(Math.abs(this.open - this.close))

        return valuePoint * screenHeight
    }

    private get centerX(): number {
        return this.getPointX(this.date) + (this.rectWidth / 2)
    }

    private get rectTopY(): number {
        return this.getPointY(Math.max(this.open, this.close))
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
            .moveTo(this.centerX, this.getPointY(this.high))
            .lineTo(this.centerX, this.getPointY(this.low))

        super.addChild(line)
    }

    private buildRectangle(): void {
        const rectangle = new Graphics()

        const x = this.getPointX(this.date), y = this.rectTopY
        const width = this.rectWidth, height = this.rectHeight

        rectangle
            .beginFill(this.color)
            .drawRect(x, y, width, height)
            .endFill()

        super.addChild(rectangle)
    }

    private getPointY(value: number): number {
        const { valueRange, screenHeight } = this

        const valuePoint = 1 - valueRange.findValuePoint(value)

        return valuePoint * screenHeight
    }

    private getPointX(date: Date): number {
        const { renderDateRange, screenWidth } = this

        const datePoint = renderDateRange.getPointByDate(date)

        return datePoint * screenWidth
    }
}
