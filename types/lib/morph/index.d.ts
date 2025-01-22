import { PricePoint } from '@chartdata';
type ChartData = {
    prices: string[];
    timestamps: number[];
};
export default class MorphController {
    #private;
    private _onUpdate;
    constructor(_onUpdate: () => void);
    get isActive(): boolean;
    get next(): PricePoint | null;
    morph(previous?: ChartData, next?: ChartData): void;
}
export {};
