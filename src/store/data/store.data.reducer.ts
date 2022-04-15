import { IReducer, IStickChartState } from '../../data/interfaces'
import { HandledEvent } from '../../utils/utils.handledEvent'
import { PriceRange } from '../../utils/utils.range'
import { ScrollEvent } from '../../utils/utils.scrollEvent'

export class DataStateReducer implements IReducer<IStickChartState> {
    constructor(
        readonly state: IStickChartState,
        private readonly previousEvent: ScrollEvent | null,
    ) { }

    public reduceState(): IStickChartState {
        console.log(this.dataPriceRange)

        return this.state
    }

    private get dataPriceRange(): PriceRange {

    }
}
