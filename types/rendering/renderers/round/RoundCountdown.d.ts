import { IGraphicStorage, RenderingContext } from '@rendering';
import { Container, Graphics } from '../../../lib/pixi';
import { BaseRoundsRenderer } from './BaseRoundsRenderer';
export declare class RoundCountdown extends BaseRoundsRenderer {
    static readonly ROUND_LOCK_COUNTDOWN_ID: symbol;
    private readonly lockGradientStyle;
    private readonly shadowGradientStyle;
    private readonly resolutionGradientStyle;
    private readonly winningGradientContainerStyle;
    private readonly phaseStyle;
    private readonly countdownStyle;
    private configAnimations;
    protected get animations(): any;
    private validPredictionPositions;
    private _countdownTick;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    private countdown;
    protected update(context: RenderingContext, layer: Container): Container;
    protected updateRound(round: any, context: RenderingContext, container: Container): void;
    protected updateBackground(round: any, context: RenderingContext, container: Container): void;
    protected createWinningContainer(): Container;
    protected createWinningGradient(context: any, [width, height]: [any, any]): Container;
    protected createWinningGradientTimeline(gradient: any, height: any): gsap.core.Timeline;
    protected createGradientBackground(style: any, [width, height]: [any, any], texture: any): Graphics;
    protected createGradientShadow(context: any, [width, height]: [any, any]): {
        mask: Graphics;
    } & Graphics;
    protected updateGradientMask(rect: any, offset: any, [width, height]: [any, any], style: any): Graphics;
    protected updateText(round: any, context: RenderingContext, container: Container): void;
}
