import { IGraphicStorage, RenderingContext, BaseRenderer } from '@rendering';
import { Container } from '../../../../lib/pixi';
export declare class LatestPriceTagRenderer extends BaseRenderer {
    static readonly LATEST_PRICE_TAG_ID: symbol;
    private readonly lineStyle;
    private readonly textCoverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
}
