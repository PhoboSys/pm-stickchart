import { IReducer, IState, IPricePoint, IStick } from '../../data/interfaces'
import { dataToPriceMappersMap } from '../../data/maps/map.dataToPriceMappers'
import { PriceRange } from '../../utils/utils.range'

export class DataStateReducer implements IReducer<IState> {
    constructor(
        readonly state: IState,
    ) { }

    public reduceState(): IState {
        this.setDataPriceRange()

        return this.state
    }

    private setDataPriceRange(): void {
        this.state.renderConfig.dataPriceRange = this.dataPriceRange
    }

    private get dataPriceRange(): PriceRange {
        const { prices } = this

        const max = Math.max(...prices)
        const min = Math.min(...prices)

        return new PriceRange(min, max)
    }

    private get prices(): number[] {
        const { data } = this.state.dataManager

        return data
            .map(this.priceMapper)
            .reduce((acum, v) => (acum.push(...v), acum), [])
    }

    private get priceMapper(): (data: IPricePoint | IStick) => number[] {
        return dataToPriceMappersMap[this.state.chartType]
    }
}
