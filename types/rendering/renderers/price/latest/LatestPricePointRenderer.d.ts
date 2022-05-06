import { IGraphicStorage, RenderingContext } from '../../..';
import { BaseRenderer } from '../../..';
import { Container } from '../../../../lib/pixi';
export declare class LatestPricePointRenderer extends BaseRenderer {
    static readonly LATEST_PRICE_POINT_ID: symbol;
    private readonly outerPointStyle;
    private readonly innerPointStyle;
    private readonly outerPointAnimation;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
}
