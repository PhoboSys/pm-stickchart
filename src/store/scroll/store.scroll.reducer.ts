import { IReducer, StickChartState } from '../../interfaces'
import { HandledEvent } from '../../utils/utils.handledEvent'
import { ScrollEvent } from '../../utils/utils.scrollEvent'

export class ScrollStateReducer implements IReducer<StickChartState> {
    constructor(
        readonly state: StickChartState,
        private readonly previousEvent: ScrollEvent | null,
    ) { }

    public reduceState(): StickChartState {
        this.moveRenderDateRange()

        return this.state
    }

    private moveRenderDateRange(): void {
        const { xShift, state: { renderDateRange } } = this

        const scrollValue = xShift * (renderDateRange.duration * 0.001)

        renderDateRange.moveRangeInMilliseconds(scrollValue, scrollValue)
    }

    private get xShift(): number {
        const { previousEvent, state } = this
        const event = <ScrollEvent>state.emittedEvent

        if (previousEvent === null || previousEvent.mouseX !== event.mouseX) {
            return event.mouseX - event.dragX
        }

        return previousEvent.dragX - event.dragX
    }
}
