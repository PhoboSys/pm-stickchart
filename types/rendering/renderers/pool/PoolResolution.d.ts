import { RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolResolution extends BasePoolsRenderer {
    static readonly POOL_RESOLUTION_ID: symbol;
    private historicalLineStyle;
    private lineStyle;
    private textStyle;
    private coverStyle;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private clearActualPool;
    private clearHistoricalPool;
    private updateActualPool;
    private createTitle;
    private createLine;
    private updateHistoricalPool;
    private createHistoricalPoolLine;
    private getLevelLineColors;
    private getLevelTextureName;
}
