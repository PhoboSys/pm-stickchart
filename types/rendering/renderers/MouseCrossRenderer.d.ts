import { Graphics } from '../../lib/pixi';
import { IGraphicRenderer, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class MouseCrossRenderer extends BaseRenderer {
    static readonly MOUSE_CROSS_ID: symbol;
    private readonly lineStyle;
    private readonly priceCoverStyle;
    constructor(renderer: IGraphicRenderer);
    get rendererId(): symbol;
    protected create(context: RenderingContext): Graphics;
}
