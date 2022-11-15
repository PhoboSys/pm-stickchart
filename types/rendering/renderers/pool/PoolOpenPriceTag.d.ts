import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolOpenPriceTag extends BasePoolsRenderer {
    static readonly POOL_OPEN_PRICE_TAG_ID: symbol;
    private coverStyle;
    private configAnimations;
    get rendererId(): symbol;
    protected get animations(): any;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateOpenPriceTag;
}
