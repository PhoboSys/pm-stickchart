import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolActualBackground extends BasePoolsRenderer {
    static readonly POOL_ACTUAL_BACKGROUND_ID: symbol;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateBackground;
}
