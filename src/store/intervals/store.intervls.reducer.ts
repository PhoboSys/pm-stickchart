import { duration } from 'moment'

import { IReducer, IStickChartState } from '../../data/interfaces'
import { PriceRange } from '../../utils/utils.range'

export class IntervalsStateReducer implements IReducer<IStickChartState> {
    constructor(
        readonly state: IStickChartState,
    ) { }

    public reduceState(): IStickChartState {
        this.setValueRange()

        this.roundColumnIntervalSize()
        this.roundRowIntervalSize()

        return this.state
    }

    private setValueRange(): void {
        const { dataManager } = this.state

        const range = dataManager.valueRange

        if (range.isNull()) return
        const valueRange = new PriceRange(range.range.from - range.length * .2, range.range.to + range.length * .2)

        this.state.renderConfig.priceRange = valueRange
    }

    private roundRowIntervalSize(): void {
        const {
            renderConfig: { priceRange: valueRange, rowIntervalSize },
        } = this.state

        if (valueRange.length <= 0) return

        const minInterval = rowIntervalSize * 7

        if (valueRange.length < minInterval) {
            this.state.renderConfig.rowIntervalSize = rowIntervalSize / 2

            return this.roundRowIntervalSize()
        }

        if (valueRange.getIntervalsCount(minInterval) < 2) return

        this.state.renderConfig.rowIntervalSize += rowIntervalSize

        this.roundRowIntervalSize()
    }

    private roundColumnIntervalSize(): void {
        const {
            renderConfig: { dateRange, columnIntervalSize },
        } = this.state

        const intervalsDuration = duration(columnIntervalSize.asMilliseconds() * 7, 'milliseconds')

        if (dateRange.length < intervalsDuration.asMilliseconds()) {
            columnIntervalSize.subtract(columnIntervalSize.asMilliseconds() / 2, 'milliseconds')

            return
        }

        if (dateRange.getIntervalsCount(intervalsDuration) < 2) return

        columnIntervalSize.add(columnIntervalSize.asMilliseconds(), 'milliseconds')
    }
}
