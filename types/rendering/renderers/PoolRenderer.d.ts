import { Graphics } from '../../lib/pixi';
import { IGraphicRenderer, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class PoolRenderer extends BaseRenderer {
    static readonly POOL_ID: symbol;
    private readonly openPoolStyle;
    private readonly lockPoolStyle;
    private readonly resolutionPoolStyle;
    private readonly openPricePointStyle;
    private readonly resolutionPricePointStyle;
    constructor(renderer: IGraphicRenderer);
    get rendererId(): symbol;
    protected create(context: RenderingContext): Graphics;
    private createPrice;
    private createLockLine;
    private createPoolBorder;
}
