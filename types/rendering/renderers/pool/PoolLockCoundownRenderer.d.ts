import { IGraphicStorage, RenderingContext } from '../..';
import { BaseRenderer } from '../..';
import { Container } from '../../../lib/pixi';
export declare class PoolLockCountdown extends BaseRenderer {
    static readonly POOL_LOCK_COUNTDOWN_ID: symbol;
    private readonly style;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    private hideContainer;
    protected update(context: RenderingContext, container: Container): Container;
}
