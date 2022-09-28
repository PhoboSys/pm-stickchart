import { IGraphicStorage, RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolLockCountdown extends BasePoolsRenderer {
    static readonly POOL_LOCK_COUNTDOWN_ID: symbol;
    private readonly style;
    private readonly postextStyle;
    private readonly countdowntextStyle;
    private _countdownTick;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    private countdown;
    protected update(context: RenderingContext, layer: Container): Container;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    protected updateBackground(pool: any, context: RenderingContext, container: Container): void;
    protected updateText(pool: any, context: RenderingContext, container: Container): void;
}
