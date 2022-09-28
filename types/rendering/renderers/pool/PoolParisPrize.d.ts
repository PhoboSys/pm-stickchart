import { RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolParisPrize extends BasePoolsRenderer {
    static readonly POOL_PARIS_PRIZE_ID: symbol;
    private readonly textstyle;
    private readonly subtextstyle;
    private readonly textstylePrecent;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updatePrize;
}
