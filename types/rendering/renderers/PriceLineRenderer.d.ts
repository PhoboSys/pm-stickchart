import { IGraphicRenderer, RenderingContext } from '..';
import { BaseRenderer } from '..';
import { Graphics } from '../../lib/pixi';
export declare class PriceLineRenderer extends BaseRenderer {
    static readonly PRICE_LINE_ID: symbol;
    private readonly lineStyle;
    private readonly textStyle;
    constructor(renderer: IGraphicRenderer);
    get rendererId(): symbol;
    protected create(context: RenderingContext): Graphics;
}
