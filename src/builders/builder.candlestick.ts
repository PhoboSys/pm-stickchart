import { Graphics } from '@pixi/graphics'

import { IBuilder, IStick } from '../interfaces'
import { ValueRange } from '../utils'
import { DateRange } from '../utils/DateRange'

export class CandleStickBuilder extends Graphics implements IBuilder {

    constructor(
        private stick: IStick,
        private screenWidth: number,
        private screenHeight: number,
        private stickWidth: number,
        private renderValueRange: ValueRange,
        private renderDateRange: DateRange,
    ) {
        super()
    }

    private get color(): number {
        return this.stick.open < this.stick.close ? 0x00FF00 : 0xFF0000
    }

    private get rectHeight(): number {
        const { renderValueRange, screenHeight, stick } = this

        const distance = Math.abs(stick.open - stick.close)
        const point = renderValueRange.getPointByValue(distance)

        return point * screenHeight
    }

    private get centerX(): number {
        return this.getPointX(this.stick.date) + (this.stickWidth / 2)
    }

    private get rectTopY(): number {
        return this.getPointY(Math.max(this.stick.open, this.stick.close))
    }

    public build(): Graphics {
        this.buildLine()
        this.buildRectangle()

        return this
    }

    private buildLine(): void {
        const { centerX, stick: { high, low } } = this

        const line = new Graphics()

        line
            .lineStyle({ width: 1, color: this.color })
            .moveTo(centerX, this.getPointY(high))
            .lineTo(centerX, this.getPointY(low))

        super.addChild(line)
    }

    private buildRectangle(): void {
        const { stick: { date }, rectTopY, rectHeight, stickWidth } = this
        const rectangle = new Graphics()

        const x = this.getPointX(date), y = rectTopY
        const width = stickWidth, height = rectHeight

        rectangle
            .beginFill(this.color)
            .drawRect(x, y, width, height)
            .endFill()

        super.addChild(rectangle)
    }

    private getPointY(value: number): number {
        const { renderValueRange, screenHeight } = this

        const point = 1 - renderValueRange.getPointByValue(value)

        return point * screenHeight
    }

    private getPointX(date: Date): number {
        const { renderDateRange, screenWidth } = this

        const datePoint = renderDateRange.getPointByDate(date)

        return datePoint * screenWidth
    }
}
