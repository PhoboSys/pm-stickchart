export declare class StateData {
    private onStateChange;
    pinnedRoundid: string | null;
    constructor(onStateChange: () => any);
    setPinnedRoundid(roundid: any): void;
    private update;
}
