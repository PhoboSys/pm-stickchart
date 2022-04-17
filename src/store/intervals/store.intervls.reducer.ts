import { IReducer, IState } from '../../data/interfaces'
import { PriceRange } from '../../utils/utils.range'

export class IntervalsStateReducer implements IReducer<IState> {
    constructor(
        readonly state: IState,
    ) { }

    public reduceState(): IState {
        this.setPriceRange()

        this.roundColumnIntervalSize()
        this.roundRowIntervalSize()

        return this.state
    }

    private setPriceRange(): void {
        const { renderConfig: { dataPriceRange: range } } = this.state

        if (!range?.length) return
        const valueRange = new PriceRange(range.range.from - range.length * .2, range.range.to + range.length * .2)

        this.state.renderConfig.priceRange = valueRange
    }

    private roundRowIntervalSize(): void {
        const {
            renderConfig: { priceRange: valueRange, rowIntervalSize },
        } = this.state

        if (valueRange.length <= 0) return

        const minInterval = rowIntervalSize * 3

        if (valueRange.length < minInterval) {
            this.state.renderConfig.rowIntervalSize /= 2

            return this.roundRowIntervalSize()
        }

        if (valueRange.getIntervalsCount(minInterval) < 2) return

        this.state.renderConfig.rowIntervalSize *= 2

        this.roundRowIntervalSize()
    }

    private roundColumnIntervalSize(): void {
        const {
            renderConfig: { dateRange, columnIntervalSize },
        } = this.state

        const intervalsDuration = columnIntervalSize * 7

        if (dateRange.length < intervalsDuration) {
            this.state.renderConfig.columnIntervalSize /= 2

            return this.roundColumnIntervalSize()
        }

        if (dateRange.getIntervalsCount(intervalsDuration) < 2) return

        this.state.renderConfig.columnIntervalSize *= 2
        this.roundColumnIntervalSize()
    }
}
