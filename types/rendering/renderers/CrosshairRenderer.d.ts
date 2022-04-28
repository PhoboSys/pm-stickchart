import { IGraphicRenderer, RenderingContext, BaseRenderer } from '..';
import { Graphics } from '../../lib/pixi';
export declare class CrosshairRenderer extends BaseRenderer {
    static readonly CROSSHAIR_ID: symbol;
    private readonly lineStyle;
    private readonly priceCoverStyle;
    constructor(renderer: IGraphicRenderer);
    get rendererId(): symbol;
    protected create(context: RenderingContext): Graphics;
}
