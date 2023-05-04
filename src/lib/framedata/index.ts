import { DataBuilder, PricePoint } from '@chartdata'

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

    public calculate(chartdata: { timestamps, prices }, timeframe: { since, until }): FrameData {
        return DataBuilder.framedata(chartdata, timeframe)
    }

    public createUpdater(): (animated: PricePoint, timeframe: { since: number, until: number }) => this {
        let index = this.get().timestamps.length

        return (animated, timeframe) => {
            const timestamps = [...this.timestamps]
            const prices = [...this.prices]
            timestamps[index] = animated.timestamp
            prices[index] = animated.value
            const framedata = this.calculate({ timestamps, prices }, timeframe)
            index = framedata.timestamps.length - 1
            this.set(framedata)

            return this
        }
    }

}
