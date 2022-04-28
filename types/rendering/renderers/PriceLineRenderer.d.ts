import { Container } from '../../lib/pixi';
import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class PriceLineRenderer extends BaseRenderer {
    static readonly PRICE_LINE_ID: symbol;
    private readonly lineStyle;
    private readonly textStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
}
