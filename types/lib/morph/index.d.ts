import { PricePoint, PlotData } from '../../chartdata/types';
export default class MorphController {
    private _onUpdate;
    private anim;
    private _lastTarget;
    constructor(_onUpdate: (point: PricePoint) => void);
    get isActive(): boolean;
    perform(lastplot?: PlotData, currentplot?: PlotData): this;
    private _performNew;
    private _perform;
    private _create;
    private _clear;
    private _kill;
}
