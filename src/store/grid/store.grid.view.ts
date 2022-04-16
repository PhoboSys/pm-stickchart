import { Graphics } from '@pixi/graphics'

import { Viewport } from '../../core/core.viewport'
import { IState, IView } from '../../data/interfaces'
import { DateRange } from '../../utils'

export class GridView implements IView<IState> {
    static readonly renderKey: string = 'grid_graphics'

    private readonly buildedGrid: Graphics = new Graphics()

    private beginColumnWhitespace: number

    private columnWhitespace: number

    private rowWhitespace: number

    private columnsCount: number

    private rowsCount: number

    constructor(
        public readonly state: IState,
        public readonly viewport: Viewport,
    ) {
        this.columnsCount = this.getColumnsCount()
        this.rowsCount = this.getRowsCount()

        this.columnWhitespace = this.getColumnWhitespace()
        this.rowWhitespace = this.getRowWhitespace()

        this.beginColumnWhitespace = this.getBeginColumnWhitespace()
    }

    private getBeginColumnWhitespace(): number {
        const {
            basicConfig: { dateRange },
            renderConfig: { dateRange: renderDateRange, columnIntervalSize },
        } = this.state

        const distance = DateRange.getBeginDistance(dateRange, renderDateRange)

        const point = Math.abs(distance) / columnIntervalSize % 1
        const absolutePoint = distance < 0 ? point : 1 - point

        return absolutePoint * this.columnWhitespace
    }

    private getColumnWhitespace(): number {
        return this.state.basicConfig.width / this.columnsCount
    }

    private getRowWhitespace(): number {
        return this.state.basicConfig.height / this.rowsCount
    }

    private getColumnsCount(): number {
        const { dateRange, columnIntervalSize } = this.state.renderConfig

        return dateRange.getIntervalsCount(columnIntervalSize)
    }

    private getRowsCount(): number {
        const { priceRange: valueRange, rowIntervalSize } = this.state.renderConfig

        return valueRange.getIntervalsCount(rowIntervalSize)
    }

    public render(): void {
        this.build()

        this.viewport.render(this.buildedGrid, GridView.renderKey)
    }

    private build(): void {
        this.buildVerticalLines()
        this.buildHorizontalLines()
    }

    private buildVerticalLines(): void {
        const { columnsCount, columnWhitespace, beginColumnWhitespace, state: { basicConfig: { height } } } = this

        const coords: Array<number> = [beginColumnWhitespace]

        for (let i = 0; i < columnsCount; i++) {
            const x = coords[i]

            coords[i + 1] = x + columnWhitespace

            this.buildLine([x, 0], [x, height])
        }
    }

    private buildHorizontalLines(): void {
        const { rowsCount, rowWhitespace, state: { basicConfig: { width } } } = this

        for (let i = 0; i < rowsCount; i++) {
            const y = i * rowWhitespace

            this.buildLine([0, y], [width, y])
        }
    }

    private buildLine([x1, y1], [x2, y2]): void {
        const { gridColor, gridOpacity, gridWidth } = this.state.basicConfig.style

        const line = new Graphics()
            .lineStyle({ width: gridWidth, color: gridColor, alpha: gridOpacity })
            .moveTo(x1, y1)
            .lineTo(x2, y2)

        this.buildedGrid.addChild(line)
    }
}
