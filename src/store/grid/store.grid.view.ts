import { Graphics } from '@pixi/graphics'

import { Viewport } from '../../core/core.viewport'
import { StickChartState, IView } from '../../interfaces'
import { DateRange } from '../../utils'

export class GridView implements IView<StickChartState> {
    static readonly renderKey: string = 'grid_graphics'

    private readonly buildedGrid: Graphics = new Graphics()

    constructor(
        public readonly state: StickChartState,
        public readonly viewport: Viewport,
    ) { }

    render(): void {
        this.build()

        this.viewport.keyRender(this.buildedGrid, GridView.renderKey)
    }

    private get beginColumnWhitespace(): number {
        const { renderDateRange, dateRange, columnIntervalSize } = this.state

        const distance = DateRange.getBeginDistance(dateRange, renderDateRange)
        const segment = columnIntervalSize.asMilliseconds()
        const point = 1 - (distance / segment % 1)

        return point * this.columnWhitespace
    }

    private get columnWhitespace(): number {
        const { width, renderDateRange, columnIntervalSize } = this.state

        return width / renderDateRange.getIntervalsCount(columnIntervalSize)
    }

    private get rowWhitespace(): number {
        const { height, valueRange, rowIntervalSize } = this.state

        return height / valueRange.getIntervalsCount(rowIntervalSize)
    }

    private get columnsCount(): number {
        const { renderDateRange, columnIntervalSize } = this.state

        return renderDateRange.getIntervalsCount(columnIntervalSize)
    }

    private get rowsCount(): number {
        const { valueRange, rowIntervalSize } = this.state

        return valueRange.getIntervalsCount(rowIntervalSize)
    }

    private build(): void {
        this.buildVerticalLines()
        this.buildHorizontalLines()
    }

    private buildVerticalLines(): void {
        const { columnsCount, columnWhitespace, beginColumnWhitespace } = this

        const coords: Array<number> = [beginColumnWhitespace]

        for (let i = 0; i < columnsCount; i++) {
            const pos = coords[i]

            coords[i + 1] = pos + columnWhitespace

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(pos, 0)
                .lineTo(pos, this.state.height)

            this.buildedGrid.addChild(line)
        }
    }

    private buildHorizontalLines(): void {
        const { rowsCount, rowWhitespace } = this

        for (let i = 0; i < rowsCount; i++) {
            const pos = i * rowWhitespace

            const line = new Graphics()

            line
                .lineStyle({ width: 1, color: 0xffff })
                .moveTo(0, pos)
                .lineTo(this.state.width, pos)
                .endFill()

            this.buildedGrid.addChild(line)
        }
    }
}
