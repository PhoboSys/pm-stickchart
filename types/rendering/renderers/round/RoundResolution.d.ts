import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseRoundsRenderer } from './BaseRoundsRenderer';
export declare class RoundResolution extends BaseRoundsRenderer {
    static readonly ROUND_RESOLUTION_ID: symbol;
    private lineStyle;
    get rendererId(): symbol;
    protected updateRound(round: any, context: RenderingContext, container: Container): void;
    private updateActualRound;
    private getLevelLineColor;
}
