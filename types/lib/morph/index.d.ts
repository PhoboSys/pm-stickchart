declare type ChartData = {
    prices: number[];
    timestamps: number[];
};
export default class MorphController {
    #private;
    private _onUpdate;
    constructor(_onUpdate: () => void);
    get isActive(): boolean;
    morph(previous?: ChartData, current?: ChartData): void;
}
export {};
