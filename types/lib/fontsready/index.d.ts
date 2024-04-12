export declare class FontsReady {
    inprogress: boolean;
    succeed: boolean;
    failed: boolean;
    load(): Promise<any>;
    private isFontUsed;
}
