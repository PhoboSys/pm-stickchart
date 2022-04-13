import { Graphics } from '@pixi/graphics'

import { Viewport } from '../../core/core.viewport'
import { IStickChartState, IView } from '../../data/interfaces'
import { DateRange } from '../../utils'

export class GridView implements IView<IStickChartState> {
    static readonly renderKey: string = 'grid_graphics'

    private readonly buildedGrid: Graphics = new Graphics()

    constructor(
        public readonly state: IStickChartState,
        public readonly viewport: Viewport,
    ) { }

    render(): void {
        this.build()

        this.viewport.render(this.buildedGrid, GridView.renderKey)
    }

    private get beginColumnWhitespace(): number {
        const {
            viewConfig: { dateRange },
            renderConfig: { dateRange: renderDateRange, columnIntervalSize },
        } = this.state

        const distance = DateRange.getBeginDistance(dateRange, renderDateRange)

        const segment = columnIntervalSize.asMilliseconds()
        const point = (Math.abs(distance) / segment % 1)
        const absolutePoint = distance < 0 ? point : 1 - point

        return absolutePoint * this.columnWhitespace
    }

    private get columnWhitespace(): number {
        const {
            viewConfig: { width },
            renderConfig: { dateRange, columnIntervalSize },
        } = this.state

        return width / dateRange.getIntervalsCount(columnIntervalSize.asMilliseconds())
    }

    private get rowWhitespace(): number {
        const {
            viewConfig: { height },
            renderConfig: { valueRange, rowIntervalSize },
        } = this.state

        return height / valueRange.getIntervalsCount(rowIntervalSize)
    }

    private get columnsCount(): number {
        const { dateRange, columnIntervalSize } = this.state.renderConfig

        return dateRange.getIntervalsCount(columnIntervalSize.asMilliseconds())
    }

    private get rowsCount(): number {
        const { valueRange, rowIntervalSize } = this.state.renderConfig

        return valueRange.getIntervalsCount(rowIntervalSize)
    }

    private build(): void {
        this.buildVerticalLines()
        this.buildHorizontalLines()
    }

    private buildVerticalLines(): void {
        const { columnsCount, columnWhitespace, beginColumnWhitespace, state: { viewConfig: { height } } } = this

        const coords: Array<number> = [beginColumnWhitespace]

        for (let i = 0; i < columnsCount; i++) {
            const x = coords[i]

            coords[i + 1] = x + columnWhitespace

            this.buildLine([x, 0], [x, height])
        }
    }

    private buildHorizontalLines(): void {
        const { rowsCount, rowWhitespace, state: { viewConfig: { width } } } = this

        for (let i = 0; i < rowsCount; i++) {
            const y = i * rowWhitespace

            this.buildLine([0, y], [width, y])
        }
    }

    private buildLine([x1, y1], [x2, y2]): void {
        const { gridColor, gridOpacity, gridWidth } = this.state.style

        const line = (new Graphics())
            .lineStyle({ width: gridWidth, color: gridColor, alpha: gridOpacity })
            .moveTo(x1, y1)
            .lineTo(x2, y2)

        this.buildedGrid.addChild(line)
    }
}
