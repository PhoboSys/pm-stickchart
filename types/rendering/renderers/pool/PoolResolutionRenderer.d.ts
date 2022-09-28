import { IGraphicStorage, RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolResolution extends BasePoolsRenderer {
    static readonly POOL_RESOLUTION_ID: symbol;
    private lineStyle;
    private textStyle;
    private coverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updatePoolBorder;
    private createName;
    private getLevelTextureName;
    private createDash;
    private getLevelLineColors;
}
