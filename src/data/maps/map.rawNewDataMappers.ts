import { Duration } from 'moment'

import { ChartTypes } from '../enums/enum.chartTypes'
import { IStick, IRawPricePoint, IPricePoint } from '../interfaces'
import { rawNewToSticksDataMapper, rawNewToPricePointsDataMapper } from '../mappers'

type Mapper = (data: IStick[] | IPricePoint[], raw: IRawPricePoint, interval: number) => IStick[] | IPricePoint[]

export const newRawDataMappersMap: { [key in ChartTypes]: Mapper } = {
    [ChartTypes.lines]: rawNewToPricePointsDataMapper,
    [ChartTypes.candleSticks]: rawNewToSticksDataMapper,
}
