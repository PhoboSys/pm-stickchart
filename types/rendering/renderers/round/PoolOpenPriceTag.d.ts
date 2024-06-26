import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseRoundsRenderer } from './BaseRoundsRenderer';
export declare class RoundOpenPriceTag extends BaseRoundsRenderer {
    static readonly ROUND_OPEN_PRICE_TAG_ID: symbol;
    private baseCoverStyle;
    private coverStyle;
    private configAnimations;
    get rendererId(): symbol;
    protected get animations(): any;
    protected updateRound(round: any, context: RenderingContext, container: Container): void;
    private updateOpenPriceTag;
}
