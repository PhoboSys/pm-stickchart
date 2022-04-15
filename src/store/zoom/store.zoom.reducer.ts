import { duration } from 'moment'

import { IReducer, IStickChartState } from '../../data/interfaces'

export class ZoomStateReducer implements IReducer<IStickChartState> {
    constructor(
        readonly state: IStickChartState,
    ) { }

    public reduceState(): IStickChartState {
        this.moveRenderDateRange()

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

        const zoomValue = deltaY * (dateRange.length * 0.001)

        dateRange.expandInMilliseconds(-zoomValue, zoomValue)
    }
}
