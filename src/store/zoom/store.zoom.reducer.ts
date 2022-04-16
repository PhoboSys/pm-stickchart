import { IReducer, IState } from '../../data/interfaces'

export class ZoomStateReducer implements IReducer<IState> {
    constructor(
        readonly state: IState,
    ) { }

    public reduceState(): IState {
        this.moveRenderDateRange()

        this.state.inputEvent?.preventDefault()
        this.state.inputEvent?.markAsHandled()

        return this.state
    }

    private moveRenderDateRange(): void {
        const {
            inputEvent,
            basicConfig: { width, style: { zoomVelocity } },
            renderConfig: { dateRange },
        } = this.state

        const { deltaY } = <WheelEvent>inputEvent?.event

        const zoomValue = deltaY / width * dateRange.length * zoomVelocity

        dateRange.moveInMilliseconds(-zoomValue, zoomValue)
    }
}
