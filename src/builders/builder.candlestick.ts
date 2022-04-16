import { Graphics } from '@pixi/graphics'

import { IBuilder, IStick, IStickChartStyle } from '../data/interfaces'
import { PriceRange, DateRange } from '../utils'

export class CandleStickBuilder extends Graphics implements IBuilder {

    constructor(
        private stick: IStick,
        private style: IStickChartStyle,
        private screenWidth: number,
        private screenHeight: number,
        private stickWidth: number,
        private priceRange: PriceRange,
        private dateRange: DateRange,
    ) {
        super()
    }

    private get color(): number {
        const { stickIncreaseColor, stickDecreaseColor } = this.style

        return this.stick.open < this.stick.close ? stickIncreaseColor : stickDecreaseColor
    }

    private get centerX(): number {
        return this.getPointX(this.stick.date) + (this.stickWidth / 2)
    }

    private get rectTopY(): number {
        return this.getPointY(Math.max(this.stick.open, this.stick.close))
    }

    private get rectBottomY(): number {
        return this.getPointY(Math.min(this.stick.open, this.stick.close))
    }

    public build(): Graphics {
        this.buildLine()
        this.buildRectangle()

        return this
    }

    private buildLine(): void {
        const { centerX, stick: { high, low }, style: { stickLineWidth } } = this

        const line = new Graphics()
            .lineStyle({ width: stickLineWidth, color: this.color })
            .moveTo(centerX, this.getPointY(high))
            .lineTo(centerX, this.getPointY(low))

        super.addChild(line)
    }

    private buildRectangle(): void {
        const { stick: { date }, stickWidth, rectTopY, rectBottomY, style: { stickRound } } = this

        const x = this.getPointX(date), y = rectTopY
        const width = stickWidth, height = (rectBottomY - rectTopY)

        const rectangle = new Graphics()
            .beginFill(this.color)
            .drawRoundedRect(x, y, width, height, stickRound)
            .endFill()

        super.addChild(rectangle)
    }

    private getPointY(value: number): number {
        const { priceRange, screenHeight } = this

        const point = 1 - priceRange.getPointByValue(value)

        return point * screenHeight
    }

    private getPointX(date: Date): number {
        const { dateRange, screenWidth } = this

        const datePoint = dateRange.getPointByValue(date)

        return datePoint * screenWidth
    }
}
