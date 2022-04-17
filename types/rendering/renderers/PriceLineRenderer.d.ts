import { Graphics } from '../../lib/pixi';
import { IGraphicRenderer, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class PriceLineRenderer extends BaseRenderer {
    static readonly PRICE_LINE_ID: string;
    private readonly lineStyle;
    constructor(renderer: IGraphicRenderer);
    get rendererId(): string;
    private convert;
    protected create(context: RenderingContext): Graphics;
}
