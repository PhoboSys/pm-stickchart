import { IGraphicStorage, RenderingContext, BaseRenderer } from '@rendering';
import { Container } from '../../../../lib/pixi';
export declare class LatestPriceLineRenderer extends BaseRenderer {
    static readonly LATEST_PRICE_LINE_ID: symbol;
    private readonly lineStyle;
    private readonly textCoverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
}
