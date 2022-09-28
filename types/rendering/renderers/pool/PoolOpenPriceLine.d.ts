import { RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolOpenPriceLine extends BasePoolsRenderer {
    static readonly POOL_OPEN_PRICE_LINE_ID: symbol;
    private lineStyle;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateOpenLine;
    private createOpenPoolLine;
}
