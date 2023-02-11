export declare const UNIX_MINUTE = 60;
export declare const UNIX_HOUR: number;
export declare const UNIX_DAY: number;
export declare const MAX_FRAME_DURATION: number;
export declare const MIN_FRAME_DURATION: number;
export declare function nowUnixTS(): number;
export declare class Timeframe {
    private readonly eventTarget;
    private readonly onUpdate;
    private _until;
    private _timeframe;
    private get timeframe();
    private set timeframe(value);
    private get until();
    private set until(value);
    private untilmax;
    private get since();
    private readonly zoomevent;
    private readonly pointerdown;
    private readonly pointermove;
    private readonly pointerup;
    private shifting;
    constructor(eventTarget: EventTarget, onUpdate: () => any);
    private shiftstart;
    private shiftprogress;
    private shiftend;
    save(timeframe: any): void;
    get(): {
        since: number;
        until: number;
    };
    destroy(): void;
    private shift;
    private zoom;
}
