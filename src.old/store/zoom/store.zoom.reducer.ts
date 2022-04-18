import { IReducer, IStickChartState } from '../../data/interfaces'

export class ZoomStateReducer implements IReducer<IStickChartState> {
    constructor(
        readonly state: IStickChartState,
    ) { }

    public reduceState(): IStickChartState {
        this.moveRenderDateRange()
        this.roundColumnIntervalSize()

        this.state.inputEvent.preventDefault()
        this.state.inputEvent.markAsHandled()

        return this.state
    }

    private moveRenderDateRange(): void {
        const {
            inputEvent: { event },
            renderConfig: { dateRange },
        } = this.state

        const { deltaY } = <WheelEvent>event

        const zoomValue = deltaY * (dateRange.duration * 0.001)

        dateRange.moveRangeInMilliseconds(-zoomValue, zoomValue)
    }

    private roundColumnIntervalSize(): void {
        const {
            renderConfig: { dateRange, columnIntervalSize },
        } = this.state

        const duration = columnIntervalSize.asMilliseconds() * 7

        if (dateRange.duration < duration) {
            columnIntervalSize.subtract(columnIntervalSize.asMilliseconds() / 2, 'milliseconds')

            return
        }

        if (dateRange.getIntervalsCount(duration) < 2) return

        columnIntervalSize.add(columnIntervalSize.asMilliseconds(), 'milliseconds')
    }
}
