import { RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolResolutionPriceLine extends BasePoolsRenderer {
    static readonly POOL_RESOLUTION_PRICE_LINE_ID: symbol;
    private lineStyle;
    private torusStyle;
    private textStyle;
    private coverStyle;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateResolveReadyPriceLine;
    private updateResolvedPriceLine;
    private createPriceText;
    private createPricePoint;
}
