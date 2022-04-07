import { IReducer, StickChartState } from '../../interfaces'
import { HandledEvent } from '../../utils/utils.handledEvent'

export class ZoomStateReducer implements IReducer<StickChartState> {
    constructor(
        readonly state: StickChartState,
    ) { }

    public reduceState(): StickChartState {
        this.moveRenderDateRange()

        this.state.emittedEvent = new HandledEvent()

        return this.state
    }

    private moveRenderDateRange(): void {
        const { emittedEvent: zoomEvent, renderDateRange, columnIntervalSize } = this.state
        const { deltaY } = <WheelEvent>zoomEvent

        const zoomValue = deltaY * (renderDateRange.duration * 0.001)

        renderDateRange.moveRangeInMilliseconds(-zoomValue, zoomValue)

        // const intervalCount = renderDateRange.getIntervalsCount(columnIntervalSize)
        // if (intervalCount > 15) {
        //     columnIntervalSize.add(columnIntervalSize.asMilliseconds(), 'milliseconds')
        // }

        // if (intervalCount < 7) {
        //     columnIntervalSize.subtract(columnIntervalSize.asMilliseconds() / 2, 'milliseconds')
        // }
    }
}
