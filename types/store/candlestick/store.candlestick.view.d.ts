import { Viewport } from '../../core';
import { IView, IState } from '../../data/interfaces';
export declare class CandleStickView implements IView<IState> {
    readonly state: IState;
    readonly viewport: Viewport;
    static readonly renderKey: string;
    private readonly builded;
    constructor(state: IState, viewport: Viewport);
    private get stickWidth();
    render(): void;
    private buildSticks;
}
