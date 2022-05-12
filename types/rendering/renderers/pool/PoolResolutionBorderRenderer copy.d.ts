import { IGraphicStorage, RenderingContext } from '../..';
import { BaseRenderer } from '../..';
import { Container } from '../../../lib/pixi';
export declare class PoolResolutionBorderRenderer extends BaseRenderer {
    static readonly POOL_RESOLUTION_BORDER_ID: symbol;
    private lineStyle;
    private torusStyle;
    private textStyle;
    private coverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private getLevelGradientColors;
    private updatePoolBorder;
    private createPoolName;
    private createTorus;
    private createDash;
}
