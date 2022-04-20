import { DataManager } from '../../core/core.dataManager'
import { IReducer, IStickChartState, IPricePoint, IStick } from '../../data/interfaces'
import { dataToValueMappersMap } from '../../data/maps/map.dataToValueMappers'
import { rawDataMappersMap } from '../../data/maps/map.rawDataMappers'
import { ValueRange } from '../../utils/utils.valueRange'

export class IntervalsStateReducer implements IReducer<IStickChartState> {
    constructor(
        readonly state: IStickChartState,
    ) { }

    public reduceState(): IStickChartState {
        this.setValueRange()

        this.roundColumnIntervalSize()
        // this.roundRowIntervalSize()

        return this.state
    }

    private setValueRange(): void {
        const rawDataMapper = rawDataMappersMap[this.state.viewConfig.chartType]
        const columnIntervalSize = this.state.renderConfig.columnIntervalSize
        const data = rawDataMapper(this.state.data, columnIntervalSize)

        const dataManager = new DataManager<IPricePoint | IStick>(
            data,
            dataToValueMappersMap[this.state.viewConfig.chartType],
        )
        const valuePeek = dataManager.valuePeek

        if (valuePeek === undefined) return
        const dist = valuePeek.max - valuePeek.min
        const valueRange = new ValueRange(valuePeek.min - dist * .2, valuePeek.max + dist * .2)

        this.state.renderConfig.valueRange = valueRange
        console.log(valueRange)
    }

    private roundRowIntervalSize(): void {
        const {
            renderConfig: { valueRange, rowIntervalSize },
        } = this.state

        const minInterval = rowIntervalSize * 3

        if (valueRange.value < minInterval) {
            this.state.renderConfig.rowIntervalSize = rowIntervalSize / 2

            return
        }

        if (valueRange.getIntervalsCount(minInterval) < 2) return

        this.state.renderConfig.rowIntervalSize += rowIntervalSize
    }

    private roundColumnIntervalSize(): void {
        const {
            renderConfig: { dateRange, columnIntervalSize },
        } = this.state

        const duration = columnIntervalSize.asMilliseconds() * 3

        if (dateRange.duration < duration) {
            columnIntervalSize.subtract(columnIntervalSize.asMilliseconds() / 2, 'milliseconds')

            return
        }

        if (dateRange.getIntervalsCount(duration) < 2) return

        columnIntervalSize.add(columnIntervalSize.asMilliseconds(), 'milliseconds')
    }
}
