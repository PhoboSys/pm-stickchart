import { ChartTypes } from '../enums/enum.chartTypes'
import { IStick } from '../interfaces'
import { IPricePoint } from '../interfaces/interface.pricePoint'
import { pricePointToDateMapper, stickToDateMapper } from '../mappers'

type PricePointMapper = (data: IPricePoint) => number
type StickMapper = (data: IStick) => number

export const dataToDateMappersMap: { [key in ChartTypes]: PricePointMapper | StickMapper } = {
    [ChartTypes.lines]: pricePointToDateMapper,
    [ChartTypes.candleSticks]: stickToDateMapper,
}
