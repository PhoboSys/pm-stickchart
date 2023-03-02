import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolLayerEventProducer extends BasePoolsRenderer {
    static readonly POOL_HOVER_EVENT_PRODUCER_ID: symbol;
    get rendererId(): symbol;
    private readonly isHover;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateEvent;
}
