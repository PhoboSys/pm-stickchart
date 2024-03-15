import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BasePoolsRenderer } from './BasePoolsRenderer';
export declare class PoolBackground extends BasePoolsRenderer {
    static readonly POOL_BACKGROUND_ID: symbol;
    get rendererId(): symbol;
    private bgAnimOffset;
    private borderStyle;
    private backgroundStyle;
    private coinStyle;
    private coinShineStyle;
    private coinCurrencyStyle;
    private configAnimations;
    protected get animations(): any;
    protected updatePool(pool: any, context: RenderingContext, container: Container): void;
    private udateDefaultBackground;
    private updateClaimableBorder;
    private udateClaimableBackground;
    updateCoinIcon(context: RenderingContext, container: Container, [x1, x2]: [any, any], pool: any, win: boolean, shouldRender: boolean): void;
    private createBorder;
    private createCoin;
    private createCoinCurrency;
    private createCoinShine;
    private getCoinCurrencyTextureName;
}
