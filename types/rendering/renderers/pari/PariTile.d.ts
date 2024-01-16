import { RenderingContext } from '@rendering';
import { Container } from '../../../lib/pixi';
import { BaseParisRenderer } from './BaseParisRenderer';
export declare class PariTile extends BaseParisRenderer {
    static readonly PARI_TILE_ID: symbol;
    get rendererId(): symbol;
    private groupStyle;
    private contentStyle;
    private wagerContainerStyles;
    private wagerTextStyle;
    private wagerStyle;
    private profitContainerStyle;
    private profitTextStyle;
    private percentStyle;
    private payoutStyle;
    private claimStyle;
    private claimTextStyle;
    private positionIconStyle;
    private iconStyle;
    private validPariPositions;
    private configAnimations;
    protected get animations(): any;
    protected updatePari(pool: any, pari: any, context: RenderingContext, container: Container): void;
    private updateGroup;
    private updateProfit;
    private updateClaim;
    private updateWager;
    private getPositionIconTextureName;
    private getPariCurrencyIconTextureName;
    private createIcon;
    private createContainer;
    private createClaim;
    private createPropagatingBackground;
}
