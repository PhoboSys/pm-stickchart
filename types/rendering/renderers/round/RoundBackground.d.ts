import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseRoundsRenderer } from './BaseRoundsRenderer';
export declare class RoundBackground extends BaseRoundsRenderer {
    static readonly ROUND_BACKGROUND_ID: symbol;
    get rendererId(): symbol;
    private bgAnimOffset;
    private borderStyle;
    private backgroundStyle;
    private coinStyle;
    private coinShineStyle;
    private coinCurrencyStyle;
    private configAnimations;
    protected get animations(): any;
    protected updateRound(round: any, context: RenderingContext, container: Container): void;
    private udateDefaultBackground;
    private updateClaimableBorder;
    private udateClaimableBackground;
    updateCoinIcon(context: RenderingContext, container: Container, [x1, x2]: [any, any], round: any, win: boolean, shouldRender: boolean): void;
    private createBorder;
    private createCoin;
    private createCoinShine;
    private getCointAnimationName;
}
