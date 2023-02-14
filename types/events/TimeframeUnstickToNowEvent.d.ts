export declare class TimeframeUnstickToNowEvent extends Event {
    static readonly NAME: string;
    readonly timeframe: {
        since: number;
        until: number;
    };
    constructor(timeframe: {
        since: number;
        until: number;
    });
}
