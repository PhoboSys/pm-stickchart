import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolActualPriceLine extends BasePoolsRenderer {
    static readonly POOL_ACTUAL_PRICE_LINE: symbol;
    private readonly baseLineStyle;
    private torusStyle;
    private lineStyle;
    get rendererId(): symbol;
    private drawActualLine;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private drawResolutionLine;
    private createPricePoint;
}
