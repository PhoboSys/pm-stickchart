import { RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolResolutionLine extends BasePoolsRenderer {
    static readonly POOL_OPEN_PRICE_LINE_ID: symbol;
    private lineStyle;
    private torusStyle;
    private textStyle;
    private coverStyle;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updatePriceLine;
    private createPriceText;
    private createPricePoint;
}
