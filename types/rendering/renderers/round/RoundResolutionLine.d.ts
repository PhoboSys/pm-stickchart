import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseRoundsRenderer } from './BaseRoundsRenderer';
export declare class RoundResolutionLine extends BaseRoundsRenderer {
    static readonly ROUND_RESOLUTION_LINE_ID: symbol;
    private baseTorusStyle;
    private torusStyle;
    private baseLineStyle;
    private lineStyle;
    private configAnimations;
    protected get animations(): any;
    get rendererId(): symbol;
    protected updateRound(round: any, context: RenderingContext, container: Container): void;
    private updateGroup;
    private updateOpenPoint;
    private updateResPoint;
    private updateResolutionLine;
    private createPricePoint;
}
