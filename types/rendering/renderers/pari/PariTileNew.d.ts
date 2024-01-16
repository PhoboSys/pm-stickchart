import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseParisRenderer } from './BaseParisRenderer';
export declare class PariTile extends BaseParisRenderer {
    static readonly PARI_TILE_ID: symbol;
    get rendererId(): symbol;
    private nocontestLineStyle;
    private winlineStyle;
    private groupStyle;
    private wagerContainerStyles;
    private profitTextStyle;
    private wagerTextStyle;
    private percentStyle;
    private payoutStyle;
    private profitContainerStyles;
    private profitStyle;
    private claimStyle;
    private claimTextStyle;
    private positionIconStyle;
    private currencyIconStyle;
    private wagerStyle;
    private validPariPositions;
    private configAnimations;
    protected get animations(): any;
    protected updatePari(pool: any, pari: any, context: RenderingContext, container: Container): void;
    private updateGroup;
    private updateLine;
    private updateProfit;
    private updateWager;
    private getPariState;
    private getPositionIconTextureName;
    private getPariCurrencyIconTextureName;
    private createIcon;
    private createContainer;
    private createClaim;
}