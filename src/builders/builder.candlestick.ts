import { Graphics } from '@pixi/graphics'

import { IBuilder, IStick, IStickChartStyle } from '../data/interfaces'
import { ValueRange } from '../utils'
import { DateRange } from '../utils/utils.dateRange'

export class CandleStickBuilder extends Graphics implements IBuilder {

    constructor(
        private data: IStick,
        private style: IStickChartStyle,
        private screenWidth: number,
        private screenHeight: number,
        private stickWidth: number,
        private valueRange: ValueRange,
        private dateRange: DateRange,
    ) {
        super()
    }

    private get color(): number {
        const { increaseColor, decreaseColor } = this.style

        return this.data.open < this.data.close ? increaseColor : decreaseColor
    }

    private get rectHeight(): number {
        const { valueRange, screenHeight, data } = this

        const distance = Math.abs(data.open - data.close)
        const point = valueRange.getPointByValue(distance)

        return point * screenHeight
    }

    private get centerX(): number {
        return this.getPointX(this.data.date) + (this.stickWidth / 2)
    }

    private get rectTopY(): number {
        return this.getPointY(Math.max(this.data.open, this.data.close))
    }

    public build(): Graphics {
        this.buildLine()
        this.buildRectangle()

        return this
    }

    private buildLine(): void {
        const { centerX, data: { high, low } } = this

        const line = new Graphics()

        console.log(this.rectTopY, Math.max(this.data.open, this.data.close))

        line
            .lineStyle({ width: 1, color: this.color })
            .moveTo(centerX, this.getPointY(high))
            .lineTo(centerX, this.getPointY(low))

        super.addChild(line)
    }

    private buildRectangle(): void {
        const { data: { date }, rectTopY, rectHeight, stickWidth, style: { stickRound } } = this
        const rectangle = new Graphics()

        const x = this.getPointX(date), y = rectTopY
        const width = stickWidth, height = rectHeight

        rectangle
            .beginFill(this.color)
            .drawRoundedRect(x, y, width, height, stickRound)
            .endFill()

        super.addChild(rectangle)
    }

    private getPointY(value: number): number {
        const { valueRange, screenHeight } = this

        const point = 1 - valueRange.getPointByValue(value)

        return point * screenHeight
    }

    private getPointX(date: Date): number {
        const { dateRange, screenWidth } = this

        const datePoint = dateRange.getPointByDate(date)

        return datePoint * screenWidth
    }
}
