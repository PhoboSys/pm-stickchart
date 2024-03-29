import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolResolution extends BasePoolsRenderer {
    static readonly POOL_RESOLUTION_ID: symbol;
    private lineStyle;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateActualPool;
    private getLevelLineColor;
}
