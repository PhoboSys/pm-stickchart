import { DataBuilder, PricePoint } from '@chartdata'
import { GetSet } from '@lib/utils'

type Prices = string[]
type Timestamps = number[]
type FrameData = { prices: Prices, timestamps: Timestamps }

export class Framedata {

    private prices: Prices

    private timestamps: Timestamps

    public get(): FrameData {
        return { prices: this.prices, timestamps: this.timestamps }
    }

    public set({ prices, timestamps }: FrameData): Framedata {
        this.prices = prices
        this.timestamps = timestamps

        return this
    }

    public isInitialized(): boolean {
        return !!(this.prices && this.timestamps)
    }

    public calculate(chartdata: { timestamps, prices }, timeframe: { since, until }): GetSet {
        const framedata = DataBuilder.framedata(chartdata, timeframe)

        return new GetSet(() => framedata, this.set.bind(this))
    }

    private updatePoint(point: PricePoint, timeframe: { since: number, until: number }, index: number): this {
        this.timestamps[index] = point.timestamp
        this.prices[index] = point.value
        this.calculate({ timestamps: this.timestamps, prices: this.prices }, timeframe).set().get()

        return this
    }

    public createUpdater(): (animated: PricePoint, timeframe: { since: number, until: number }) => this {
        let index = this.get().timestamps.length

        return (animated, timeframe) => {
            const framedata = this.updatePoint(animated, timeframe, index).get()
            index = framedata.timestamps.length - 1

            return this
        }
    }

}
