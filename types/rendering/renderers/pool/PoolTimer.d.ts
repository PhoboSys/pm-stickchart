import { IGraphicStorage, RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolCountdown extends BasePoolsRenderer {
    static readonly POOL_TIMER_ID: symbol;
    private readonly phaseStyle;
    private readonly countdownStyle;
    private configAnimations;
    protected get animations(): any;
    private _countdownTick;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    private countdown;
    protected update(context: RenderingContext, layer: Container): Container;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    protected updateText(pool: any, context: RenderingContext, container: Container): void;
}
