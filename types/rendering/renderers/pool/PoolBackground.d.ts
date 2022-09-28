import { RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolBackground extends BasePoolsRenderer {
    static readonly POOL_BACKGROUND_ID: symbol;
    get rendererId(): symbol;
    private configAnimations;
    protected get animations(): any;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateBackground;
}
