import { Graphics } from '@pixi/graphics'

import { Viewport } from '../../core/core.viewport'
import { IState, IPricePoint, IView } from '../../data/interfaces'

export class LinesView implements IView<IState> {
    static readonly renderKey: string = 'chart_data_graphics'

    private readonly builded: Graphics = new Graphics()

    constructor(
        public readonly state: IState,
        public readonly viewport: Viewport,
    ) { }

    public render(): void {
        this.buildLines()

        this.viewport.render(this.builded, LinesView.renderKey)
    }

    private buildLines(): void {
        const { dataManager } = this.state

        const line = this.createLine()

        for (let i = 1; i < dataManager.length; i++) {
            const pricePoint = dataManager.at<IPricePoint>(i)!

            this.lineToPricePoint(line, pricePoint)
        }

        this.builded.addChild(line)
    }

    private createLine(): Graphics {
        const { dataManager, basicConfig: { style: { lineColor, lineWidth } } } = this.state
        const firstPricePoint = dataManager.at<IPricePoint>(0)!

        const line = new Graphics()
            .lineStyle({ width: lineWidth, color: lineColor })
            .moveTo(...this.getPointByPricePoint(firstPricePoint))

        return line
    }

    private lineToPricePoint(line: Graphics, pricePoint: IPricePoint): void {
        const point = this.getPointByPricePoint(pricePoint)

        line.lineTo(...point)
    }

    private getPointByPricePoint(pricePoint: IPricePoint): [number, number] {
        return [this.getPointX(pricePoint.date), this.getPointY(pricePoint.price)]
    }

    private getPointY(value: number): number {
        const { renderConfig: { priceRange: valueRange }, basicConfig: { height } } = this.state

        const point = 1 - valueRange.getPointByValue(value)

        return point * height
    }

    private getPointX(date: Date): number {
        const { renderConfig: { dateRange }, basicConfig: { width } } = this.state

        const datePoint = dateRange.getPointByValue(date)

        return datePoint * width
    }
}
