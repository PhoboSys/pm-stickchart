import { ChartTypes } from '../enums/enum.chartTypes'
import { IStick } from '../interfaces'
import { IPricePoint } from '../interfaces/interface.pricePoint'
import { pricePointsToValuesDataMapper, sticksToValuesDataMapper } from '../mappers/'

type PricePointMapper = (data: IPricePoint) => number[]
type StickMapper = (data: IStick) => number[]

export const dataToValueMappersMap: { [key in ChartTypes]: PricePointMapper | StickMapper } = {
    [ChartTypes.lines]: pricePointsToValuesDataMapper,
    [ChartTypes.candleSticks]: sticksToValuesDataMapper,
}
