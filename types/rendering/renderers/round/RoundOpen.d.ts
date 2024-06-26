import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseRoundsRenderer } from './BaseRoundsRenderer';
export declare class RoundOpen extends BaseRoundsRenderer {
    static readonly ROUND_OPEN_ID: symbol;
    private dashLineStyle;
    get rendererId(): symbol;
    protected updateRound(round: any, context: RenderingContext, container: Container): void;
    private updateOpenLine;
}
