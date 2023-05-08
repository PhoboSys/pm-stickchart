import { ChartData, DataBuilder, PricePoint } from '@chartdata'
import { GetSet } from '@lib/utils'

type Prices = string[]
type Timestamps = number[]

export class Chartdata {

    public prices: Prices

    public timestamps: Timestamps

    public get(): { prices: Prices, timestamps: Timestamps } {
        return { prices: this.prices, timestamps: this.timestamps }
    }

    public set({
        prices, timestamps }: { prices: Prices, timestamps: Timestamps }
    ): Chartdata {
        this.prices = prices
        this.timestamps = timestamps

        return this
    }

    public isInitialized(): boolean {
        return !!(this.prices && this.timestamps)
    }

    public calculate(
        chartdataOrig: ChartData,
    ): GetSet<{ prices: Prices, timestamps: Timestamps }> {
        const chartdata = DataBuilder.chartdata(chartdataOrig)

        return new GetSet(() => chartdata, this.set.bind(this))

    }

    public updatePoint(
        point: PricePoint,
        index: number
    ): this {
        this.timestamps[index] = point.timestamp
        this.prices[index] = point.value

        return this
    }

}
