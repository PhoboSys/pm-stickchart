import { GetSet } from '../utils';
export declare const UNIX_MINUTE = 60;
export declare const UNIX_HOUR: number;
export declare const UNIX_DAY: number;
export declare const MAX_FRAME_DURATION: number;
export declare const MIN_FRAME_DURATION: number;
export declare class Timeframe {
    private readonly eventTarget;
    private readonly onUpdate;
    private _until;
    private _now;
    private _timeframe;
    private get nowTS();
    private set nowTS(value);
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
    save(timeframe: any): this;
    now(now: number): this;
    get(): {
        since: number;
        until: number;
    };
    calculate(chartdata: {
        timestamps: any;
        prices: any;
    }): GetSet<{
        since: number;
        until: number;
    }>;
    destroy(): this;
    private shiftend;
    private shiftstart;
    private shiftprogress;
    private shift;
    private zoom;
}
