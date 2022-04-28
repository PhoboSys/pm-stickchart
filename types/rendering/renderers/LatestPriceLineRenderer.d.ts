import { Container } from '../../lib/pixi';
import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class LatestPriceLineRenderer extends BaseRenderer {
    static readonly LATEST_PRICE_LINE_ID: symbol;
    private readonly lineStyle;
    private readonly textCoverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
}
