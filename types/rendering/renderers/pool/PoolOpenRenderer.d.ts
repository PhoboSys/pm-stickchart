import { IGraphicStorage, RenderingContext } from '../..';
import { BaseRenderer } from '../..';
import { Container } from '../../../lib/pixi';
export declare class PoolOpenRenderer extends BaseRenderer {
    static readonly POOL_OPEN_ID: symbol;
    private lineStyle;
    private textStyle;
    private coverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private updatePoolBorder;
    private createPoolName;
    private createDash;
}
