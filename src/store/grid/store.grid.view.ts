import { Graphics } from '@pixi/graphics'
import { Text } from '@pixi/text'
import moment from 'moment'

import { Viewport } from '../../core/core.viewport'
import { IState, IView } from '../../data/interfaces'
import { DateRange } from '../../utils'
import { formatDateMarkText } from '../../utils/utils.formatDateMarkText'

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

    private get realHeight(): number {
        const { basicConfig } = this.state

        return basicConfig.height - basicConfig.style.gridBottomPadding
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
        return this.realHeight / this.rowsCount
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

        this.buildPriceMarks()
        this.buildDateMarks()
    }

    private buildVerticalLines(): void {
        const { columnsCount, columnWhitespace, beginColumnWhitespace, realHeight } = this

        const coords: Array<number> = [beginColumnWhitespace]

        for (let i = 0; i < columnsCount; i++) {
            const x = coords[i]

            coords[i + 1] = x + columnWhitespace

            this.buildLine([x, 0], [x, realHeight])
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

    private buildPriceMarks(): void {
        const {
            rowsCount,
            rowWhitespace,
            state: {
                basicConfig: { width, style },
                renderConfig: { priceRange, rowIntervalSize },
            },
        } = this

        const topPrice = priceRange.range.to

        const textGraphics = (text: string): Text => new Text(text, style.markStyle)

        for (let i = 0; i < rowsCount; i++) {
            const bottomPadding = style.markStyle?.horizontalBottomPadding ?? 0
            const rightPadding = style.markStyle.horizontalRightPadding ?? 0

            const text = (topPrice - i * rowIntervalSize).toFixed(3)
            const graphics = textGraphics(text)

            graphics.resolution = 2
            graphics.y = i * rowWhitespace - graphics.height - bottomPadding
            graphics.x = width - graphics.width - rightPadding
            graphics.alpha = style.markStyle.alpha ?? 1

            this.buildedGrid.addChild(graphics)
        }
    }

    private buildDateMarks(): void {
        const {
            columnsCount,
            columnWhitespace,
            beginColumnWhitespace,
            state: {
                basicConfig: { width, style, height },
                renderConfig: { dateRange, columnIntervalSize },
            },
        } = this

        const coords: Array<number> = [beginColumnWhitespace]

        const leftDate = dateRange.range.from.valueOf()

        const textGraphics = (text: string): Text => new Text(text, style.markStyle)

        for (let i = 0; i < columnsCount; i++) {
            const x = coords[i]

            coords[i + 1] = x + columnWhitespace

            const bottomPadding = style.markStyle?.verticalBottomPadding ?? 0

            const text = formatDateMarkText(new Date(leftDate + x / width * dateRange.length), columnIntervalSize)
            const graphics = textGraphics(text)

            graphics.resolution = 2
            graphics.x = x - graphics.width / 2
            graphics.y = height - bottomPadding - graphics.height
            graphics.alpha = style.markStyle.alpha ?? 1

            this.buildedGrid.addChild(graphics)
        }
    }
}
