import { Graphics } from '../../lib/pixi';
import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class MouseCrossRenderer extends BaseRenderer {
    static readonly MOUSE_CROSS_ID: symbol;
    private readonly lineStyle;
    private readonly priceCoverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected create(context: RenderingContext): Graphics;
}
