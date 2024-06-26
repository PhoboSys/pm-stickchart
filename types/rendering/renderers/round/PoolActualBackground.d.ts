import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseRoundsRenderer } from './BaseRoundsRenderer';
export declare class RoundActualBackground extends BaseRoundsRenderer {
    static readonly ROUND_ACTUAL_BACKGROUND_ID: symbol;
    get rendererId(): symbol;
    protected updateRound(round: any, context: RenderingContext, container: Container): void;
    private updateBackground;
}
