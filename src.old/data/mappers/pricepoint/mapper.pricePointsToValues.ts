import { IPricePoint } from '../../interfaces'

export const pricePointsToValuesDataMapper = (pricePoints: IPricePoint): number[] => {
    return [pricePoints.price]
}
