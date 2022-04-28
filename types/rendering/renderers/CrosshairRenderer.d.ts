import { Container } from '../../lib/pixi';
import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class CrosshairRenderer extends BaseRenderer {
    static readonly CROSSHAIR_ID: symbol;
    private readonly lineStyle;
    private readonly priceCoverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
}
