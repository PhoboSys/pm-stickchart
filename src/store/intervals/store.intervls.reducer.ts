import { duration } from 'moment'

import { IReducer, IStickChartState } from '../../data/interfaces'
import { ValueRange } from '../../utils/utils.range'

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

        if (range === undefined) return
        const valueRange = new ValueRange(range.range.from - range.width * .2, range.range.to + range.width * .2)

        this.state.renderConfig.valueRange = valueRange
    }

    private roundRowIntervalSize(): void {
        const {
            renderConfig: { valueRange, rowIntervalSize },
        } = this.state

        const minInterval = rowIntervalSize * 6

        if (valueRange.width < minInterval) {
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

        if (dateRange.width < intervalsDuration.asMilliseconds()) {
            columnIntervalSize.subtract(columnIntervalSize.asMilliseconds() / 2, 'milliseconds')

            return
        }

        if (dateRange.getIntervalsCount(intervalsDuration) < 2) return

        columnIntervalSize.add(columnIntervalSize.asMilliseconds(), 'milliseconds')
    }
}
