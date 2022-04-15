import { IRawPricePoint, IPricePoint } from '../interfaces'

export const pricePointsToValuesDataMapper = (pricePoints: IPricePoint): number[] => {
    return [pricePoints.price]
}

export const singleRawToPricePointDataMapper = (data: IRawPricePoint): IPricePoint => {
    const {
        blockTimestamp,
        answer,
    } = data

    return {
        date: new Date(blockTimestamp * 1000),
        price: answer,
    }
}

export const rawNewToPricePointsDataMapper = (pricePoints: IPricePoint[], raw: IRawPricePoint): IPricePoint[] => {
    const pricePoint = singleRawToPricePointDataMapper(raw)

    return [...pricePoints, pricePoint]
}

export const rawToPricePointsDataMapper = (data: IRawPricePoint[]): IPricePoint[] => {
    return data.map(singleRawToPricePointDataMapper)
}
