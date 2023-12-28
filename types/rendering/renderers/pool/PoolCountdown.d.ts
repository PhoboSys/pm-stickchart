import { IGraphicStorage, RenderingContext } from '@rendering';
import { Container, Graphics } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolCountdown extends BasePoolsRenderer {
    static readonly POOL_LOCK_COUNTDOWN_ID: symbol;
    private readonly lockGradientStyle;
    private readonly resolutionGradientStyle;
    private readonly phaseStyle;
    private readonly countdownStyle;
    private configAnimations;
    protected get animations(): any;
    private _countdownTick;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    private countdown;
    protected update(context: RenderingContext, layer: Container): Container;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    protected updateBackground(pool: any, context: RenderingContext, container: Container): void;
    protected createGradient(style: any, [width, height]: [any, any], texture: any): {
        mask: Graphics;
    } & Container;
    protected updateText(pool: any, context: RenderingContext, container: Container): void;
}
