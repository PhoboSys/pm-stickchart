import { IGraphicStorage, RenderingContext } from '../..';
import { BaseRenderer } from '../..';
import { Container } from '../../../lib/pixi';
export declare class PoolLockRenderer extends BaseRenderer {
    static readonly POOL_LOCK_ID: symbol;
    private lineStyle;
    private torusStyle;
    private iconStyle;
    private coverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private updatePoolBorder;
    private createPoolIcon;
    private createTorus;
    private createDash;
}
