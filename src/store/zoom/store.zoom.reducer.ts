import { duration } from 'moment'

import { IReducer, IStickChartState } from '../../data/interfaces'

export class ZoomStateReducer implements IReducer<IStickChartState> {
    constructor(
        readonly state: IStickChartState,
    ) { }

    public reduceState(): IStickChartState {
        this.moveRenderDateRange()

        this.state.inputEvent?.preventDefault()
        this.state.inputEvent?.markAsHandled()

        return this.state
    }

    private moveRenderDateRange(): void {
        const {
            inputEvent,
            renderConfig: { dateRange },
        } = this.state

        const { deltaY } = <WheelEvent>inputEvent?.event

        const zoomValue = deltaY * (dateRange.length * 0.001)

        dateRange.moveInMilliseconds(-zoomValue, zoomValue)
    }
}
