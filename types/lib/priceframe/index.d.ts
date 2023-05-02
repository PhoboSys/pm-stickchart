export declare class Priceframe {
    private since;
    private until;
    get(): {
        since: number;
        until: number;
    };
    set({ since, until }: {
        since?: number;
        until?: number;
    }): Priceframe;
    isInitialized(): boolean;
    initialize(prices: Array<string | number>): Priceframe;
    getByPrices(prices: Array<string | number>): {
        since: number;
        until: number;
    };
    setByPrices(prices: Array<string | number>): Priceframe;
}
