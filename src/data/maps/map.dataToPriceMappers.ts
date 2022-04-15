import { ChartTypes } from '../enums/enum.chartTypes'
import { IStick } from '../interfaces'
import { IPricePoint } from '../interfaces/interface.pricePoint'
import { pricePointsToPricesDataMapper, sticksToPricesDataMapper } from '../mappers'

type PricePointMapper = (data: IPricePoint) => number[]
type StickMapper = (data: IStick) => number[]

export const dataToPriceMappersMap: { [key in ChartTypes]: PricePointMapper | StickMapper } = {
    [ChartTypes.lines]: pricePointsToPricesDataMapper,
    [ChartTypes.candleSticks]: sticksToPricesDataMapper,
}
