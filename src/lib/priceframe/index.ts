import datamath from '@lib/datamath'

export class Priceframe {

    private since: number

    private until: number

    public get(): { since: number, until: number } {
        return { since: this.since, until: this.until }
    }

    public set({ since, until }: { since: number, until: number }): Priceframe {
        if (since || since === 0) this.since = since
        if (until || until === 0) this.until = until

        return this
    }

    public isInitialized(): boolean {
        return (!!this.since || this.since === 0) && (!!this.until || this.until === 0)
    }

    public calculate(prices: Array<string | number>): { since: number, until: number } {
        const [since, until] = datamath.minmax(prices.map(Number))

        return { since, until }
    }

}
