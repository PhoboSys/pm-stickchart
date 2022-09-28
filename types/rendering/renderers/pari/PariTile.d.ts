import { RenderingContext } from '../..';
import { Container } from '../../../lib/pixi';
import { BaseParisRenderer } from './BaseParisRenderer';
export declare class PariTile extends BaseParisRenderer {
    static readonly PARI_TILE_ID: symbol;
    get rendererId(): symbol;
    private backgroundStyle;
    private iconStyle;
    private wagerStyle;
    private titlewagerStyle;
    private prizeStyle;
    private profitStyle;
    private titleprofitStyle;
    protected updatePari(pool: any, pari: any, context: RenderingContext, container: Container): void;
    private updateTile;
    private getPositionIconTextureName;
    private createIcon;
    private createBackground;
}
