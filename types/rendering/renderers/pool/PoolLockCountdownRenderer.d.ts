import { IGraphicStorage, RenderingContext } from '../..';
import { BaseRenderer } from '../..';
import { Container } from '../../../lib/pixi';
export declare class PoolLockCountdownRenderer extends BaseRenderer {
    static readonly POOL_LOCK_COUNTDOWN_ID: symbol;
    private readonly style;
    private readonly postextStyle;
    private readonly countdowntextStyle;
    private _context;
    private _countdownTimerID;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    private startCountdownTimer;
    private hideContainer;
    protected update(context: RenderingContext, container: Container): Container;
    protected updateBackground(context: RenderingContext, container: Container): Container;
    protected updateText(context: RenderingContext, container: Container): Container;
    protected updateCountdown(): void;
}
