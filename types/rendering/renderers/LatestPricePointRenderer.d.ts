import { Graphics } from '../../lib/pixi';
import { IGraphicRenderer, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class LatestPricePointRenderer extends BaseRenderer {
    static readonly LATEST_PRICE_POINT_ID: symbol;
    private readonly outerPointStyle;
    private readonly innerPointStyle;
    constructor(renderer: IGraphicRenderer);
    get rendererId(): symbol;
    protected create(context: RenderingContext): Graphics;
}
