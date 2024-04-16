export declare class StateData {
    private onStateChange;
    pinnedPoolid: string | null;
    constructor(onStateChange: () => any);
    setPinnedPoolid(poolid: any): void;
    private update;
}
