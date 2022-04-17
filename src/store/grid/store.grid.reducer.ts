import { IReducer, IState } from '../../data/interfaces'
import { DateRange } from '../../utils'

export class GridStateReducer implements IReducer<IState> {
    private beginColumnWhitespace: number

    private columnWhitespace: number

    private rowWhitespace: number

    private columnsCount: number

    private rowsCount: number

    constructor(
        readonly state: IState,
    ) { }

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

    public reduceState(): IState {

        return this.state
    }

}
