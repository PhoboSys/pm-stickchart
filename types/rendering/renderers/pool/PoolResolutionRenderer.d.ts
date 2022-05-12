import { IGraphicStorage, RenderingContext } from '../..';
import { BaseRenderer } from '../..';
import { Container } from '../../../lib/pixi';
export declare class PoolResolutionRenderer extends BaseRenderer {
    static readonly POOL_RESOLUTION_ID: symbol;
    private _lastLevel;
    private lineStyle;
    private torusStyle;
    private textStyle;
    private coverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private getLevelLineColors;
    private updatePoolBorder;
    private createPoolName;
    private createTorus;
    private createDash;
}
