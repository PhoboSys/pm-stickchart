import { IReducer, IState } from '../../data/interfaces'
import { ScrollEvent } from '../../utils/utils.scrollEvent'

export class ScrollStateReducer implements IReducer<IState> {
    constructor(
        readonly state: IState,
        private readonly previousEvent?: ScrollEvent,
    ) { }

    public reduceState(): IState {
        this.moveRenderDateRange()

        this.state.inputEvent?.preventDefault()
        this.state.inputEvent?.markAsHandled()

        return this.state
    }

    private moveRenderDateRange(): void {
        const {
            xShift,
            state: {
                renderConfig: { dateRange },
                basicConfig: { width, style: { scrollVelocity } },
            },
        } = this

        const scrollValue = xShift / width * dateRange.length * scrollVelocity

        dateRange.moveInMilliseconds(scrollValue, scrollValue)
    }

    private get xShift(): number {
        const { previousEvent, state } = this
        const event = <ScrollEvent>state.inputEvent?.event

        if (!previousEvent || previousEvent.mouseX !== event.mouseX) {
            return event.mouseX - event.dragX
        }

        return previousEvent.dragX - event.dragX
    }
}
