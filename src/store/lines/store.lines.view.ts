import { Graphics } from '@pixi/graphics'

import { Viewport } from '../../core/core.viewport'
import { IStickChartState, IPricePoint, IView } from '../../data/interfaces'

export class LinesView implements IView<IStickChartState> {
    static readonly renderKey: string = 'chart_data_graphics'

    private readonly builded: Graphics = new Graphics()

    constructor(
        public readonly state: IStickChartState,
        public readonly viewport: Viewport,
    ) { }

    public render(): void {
        this.buildLines()

        this.viewport.render(this.builded, LinesView.renderKey)
    }

    private buildLines(): void {
        const { dataManager, style: { lineColor } } = this.state
        const firstPricePointPoint = this.getPricePointPoint(<IPricePoint>dataManager!.data.at(0)!)

        const line = new Graphics()

        line
            .lineStyle({ width: 1, color: lineColor })
            .moveTo(...firstPricePointPoint)

        for (let i = 1; i < dataManager!.data.length; i++) {
            const pricePoint = <IPricePoint>dataManager!.data[i]

            this.moveByPricePoint(line, pricePoint)
        }

        this.builded.addChild(line)
    }

    private moveByPricePoint(line: Graphics, pricePoint: IPricePoint): void {
        const point = this.getPricePointPoint(pricePoint)

        line.lineTo(...point)
    }

    private getPricePointPoint(pricePoint: IPricePoint): [number, number] {
        return [this.getPointX(pricePoint.date), this.getPointY(pricePoint.price)]
    }

    private getPointY(value: number): number {
        const { renderConfig: { priceRange: valueRange }, viewConfig: { height } } = this.state

        const point = 1 - valueRange.getPointByValue(value)

        return point * height
    }

    private getPointX(date: Date): number {
        const { renderConfig: { dateRange }, viewConfig: { width } } = this.state

        const datePoint = dateRange.getPointByValue(date)

        return datePoint * width
    }
}
