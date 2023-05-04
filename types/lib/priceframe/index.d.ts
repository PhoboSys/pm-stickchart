export declare class Priceframe {
    private since;
    private until;
    get(): {
        since: number;
        until: number;
    };
    set({ since, until }: {
        since: number;
        until: number;
    }): Priceframe;
    isInitialized(): boolean;
    calculate(prices: Array<string | number>): {
        since: number;
        until: number;
    };
}
