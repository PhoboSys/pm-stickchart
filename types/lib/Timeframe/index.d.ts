export declare const MILLISECONDS_IN_DAY: number;
export declare const INVALID_DATE: Date;
export declare const UNIX_MINUTE = 60;
export declare const UNIX_HOUR: number;
export declare const UNIX_DAY: number;
export declare const UNIX_WEEK: number;
export declare const MAX_FRAME_DURATION: number;
export declare const MIN_FRAME_DURATION: number;
export declare const SHRINK_RATE = 3;
export declare function nowUnixTS(): number;
export declare class Timeframe {
    private readonly zoomTarget;
    private readonly _update;
    private _morphController;
    private lastDuration;
    private since;
    private readonly zoomevent;
    constructor(zoomTarget: EventTarget, _update: () => any);
    save(timeframe: any): this;
    get(): {
        since: number;
        until: number;
    };
    destroy(): void;
    actualize(): this;
    private getValid;
    private tooBig;
    private tooSmall;
    private zoom;
}
