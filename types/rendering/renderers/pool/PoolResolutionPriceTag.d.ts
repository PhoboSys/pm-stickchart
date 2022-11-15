import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolResolutionPriceTag extends BasePoolsRenderer {
    static readonly POOL_RESOLUTION_PRICE_TAG_ID: symbol;
    private coverStyle;
    private configAnimations;
    protected get animations(): any;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateResolutionPriceTag;
}
