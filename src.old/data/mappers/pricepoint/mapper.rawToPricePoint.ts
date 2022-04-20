import { IPricePoint, IRawPricePoint } from '../../interfaces'

export const singleRawToPricePointDataMapper = (data: IRawPricePoint): IPricePoint => {
    const {
        blockTimestamp,
        answer,
        aggrigator,
    } = data

    return {
        date: new Date(blockTimestamp * 1000),
        price: answer,
        aggrigator,
    }
}

export const rawToPricePointsDataMapper = (data: IRawPricePoint[]): IPricePoint[] => {
    return data.map(singleRawToPricePointDataMapper)
}
