import { DataBuilder } from '@chartdata'
import { GetSet } from '@lib/utils'

type Prices = string[]
type Timestamps = number[]

export class Framedata {

    private prices: Prices

    private timestamps: Timestamps

    public get(): { prices: Prices, timestamps: Timestamps } {
        return { prices: this.prices, timestamps: this.timestamps }
    }

    public set({
        prices, timestamps }: { prices: Prices, timestamps: Timestamps }
    ): Framedata {
        this.prices = prices
        this.timestamps = timestamps

        return this
    }

    public isInitialized(): boolean {
        return !!(this.prices && this.timestamps)
    }

    public calculate(
        chartdata: { timestamps, prices },
        timeframe: { since, until }
    ): GetSet<{ prices: Prices, timestamps: Timestamps }> {
        const framedata = DataBuilder.framedata(chartdata, timeframe)

        return new GetSet(() => framedata, this.set.bind(this))
    }

}
