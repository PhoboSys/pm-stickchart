import { IMutator, StickChartState } from '../../interfaces'

export class ZoomStateMutator implements IMutator<StickChartState> {
    constructor(
        readonly state: StickChartState,
    ) { }

    public mutateState(): StickChartState {
        this.moveRenderDateRange()

        return this.state
    }

    private moveRenderDateRange(): void {
        const { zoomEvent, renderDateRange, columnIntervalSize } = this.state
        const { deltaY } = zoomEvent!

        console.log(zoomEvent)

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
