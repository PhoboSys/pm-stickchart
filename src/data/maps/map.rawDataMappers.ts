import { Duration } from 'moment'

import { ChartTypes } from '../enums/enum.chartTypes'
import { IStick } from '../interfaces'
import { IPricePoint } from '../interfaces/interface.pricePoint'
import { IRawPricePoint } from '../interfaces/interface.rawPricePoint'
import { rawToPricePointsDataMapper, rawToSticksDataMapper } from '../mappers'

type PricePointMapper = (data: IRawPricePoint[]) => IPricePoint[]
type StickMapper = (data: IRawPricePoint[], interval: Duration) => IStick[]

export const rawDataMappersMap: { [key in ChartTypes]: PricePointMapper | StickMapper } = {
    [ChartTypes.lines]: rawToPricePointsDataMapper,
    [ChartTypes.candleSticks]: rawToSticksDataMapper,
}
