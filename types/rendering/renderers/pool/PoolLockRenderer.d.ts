import { IGraphicStorage, RenderingContext } from '@rendering';
import { BaseRenderer } from '@rendering';
import { Container } from '../../../lib/pixi';
export declare class PoolLockRenderer extends BaseRenderer {
    static readonly POOL_LOCK_ID: symbol;
    private lineStyle;
    private iconStyle;
    private coverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private updatePoolBorder;
    private createPoolIcon;
    private createDash;
}
