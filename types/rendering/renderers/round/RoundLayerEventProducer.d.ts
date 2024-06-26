import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseRoundsRenderer } from './BaseRoundsRenderer';
export declare class RoundLayerEventProducer extends BaseRoundsRenderer {
    static readonly ROUND_LAYER_EVENT_PRODUCER_ID: symbol;
    get rendererId(): symbol;
    private readonly isHover;
    protected updateRound(round: any, context: RenderingContext, container: Container): void;
    private updateEvent;
}
