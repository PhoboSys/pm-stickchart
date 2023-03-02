import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolTapEventProducer extends BasePoolsRenderer {
    static readonly POOL_TAP_EVENT_PRODUCER_ID: symbol;
    get rendererId(): symbol;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private updateEvent;
}
