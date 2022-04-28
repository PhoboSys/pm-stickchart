import { IGraphicRenderer, RenderingContext, BaseRenderer } from '..';
import { Graphics } from '../../lib/pixi';
export declare class LatestPriceLineRenderer extends BaseRenderer {
    static readonly LATEST_PRICE_LINE_ID: symbol;
    private readonly lineStyle;
    private readonly textCoverStyle;
    constructor(renderer: IGraphicRenderer);
    get rendererId(): symbol;
    protected create(context: RenderingContext): Graphics;
}
