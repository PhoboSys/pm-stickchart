import { IReducer, IStickChartState } from '../../data/interfaces'
import { HandledEvent } from '../../utils/utils.handledEvent'
import { ScrollEvent } from '../../utils/utils.scrollEvent'

export class ScrollStateReducer implements IReducer<IStickChartState> {
    constructor(
        readonly state: IStickChartState,
        private readonly previousEvent: ScrollEvent | null,
    ) { }

    public reduceState(): IStickChartState {
        this.moveRenderDateRange()

        this.state.inputEvent?.preventDefault()

        return this.state
    }

    private moveRenderDateRange(): void {
        const { xShift, state: { renderConfig: { dateRange }, viewConfig: { width } } } = this

        const scrollValue = (xShift / width * dateRange.length)

        dateRange.moveInMilliseconds(scrollValue, scrollValue)
    }

    private get xShift(): number {
        const { previousEvent, state } = this
        const event = <ScrollEvent>state.inputEvent?.event

        if (previousEvent === null || previousEvent.mouseX !== event.mouseX) {
            return event.mouseX - event.dragX
        }

        return previousEvent.dragX - event.dragX
    }
}
