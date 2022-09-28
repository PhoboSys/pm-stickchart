import { IGraphicStorage, RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolLock extends BasePoolsRenderer {
    static readonly POOL_LOCK_ID: symbol;
    private lineStyle;
    private iconStyle;
    private coverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updatePoolBorder;
    private createIcon;
    private createDash;
}
