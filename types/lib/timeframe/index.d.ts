export declare const MILLISECONDS_IN_DAY: number;
export declare const INVALID_DATE: Date;
export declare const UNIX_MINUTE = 60;
export declare const UNIX_HOUR: number;
export declare const UNIX_DAY: number;
export declare const UNIX_WEEK: number;
export declare function nowUnixTS(): number;
export declare class Timeframe {
    private readonly zoomTarget;
    private readonly onZoom;
    private since;
    private readonly zoomevent;
    constructor(zoomTarget: EventTarget, onZoom: () => any);
    save(timeframe: any): void;
    get(): {
        since: number;
        until: number;
    };
    destroy(): void;
    private validate;
    private tooBig;
    private tooSmall;
    private zoom;
}
