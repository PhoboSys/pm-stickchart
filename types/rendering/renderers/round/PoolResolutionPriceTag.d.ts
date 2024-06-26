import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseRoundsRenderer } from './BaseRoundsRenderer';
export declare class RoundResolutionPriceTag extends BaseRoundsRenderer {
    static readonly ROUND_RESOLUTION_PRICE_TAG_ID: symbol;
    private baseCoverStyle;
    private coverStyle;
    private configAnimations;
    protected get animations(): any;
    get rendererId(): symbol;
    protected updateRound(round: any, context: RenderingContext, container: Container): void;
    private updateResolutionPriceTag;
}
