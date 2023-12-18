import { IGraphicStorage, RenderingContext } from '@rendering';
import { BaseRenderer } from '@rendering';
import { Container } from '../../../../lib/pixi';
export declare class LatestPricePointRenderer extends BaseRenderer {
    static readonly LATEST_PRICE_POINT_ID: symbol;
    private readonly outerPointStyle;
    private readonly innerPointStyle;
    private readonly pulspointStyle;
    private readonly pulspointAnimation;
    private readonly innerPointAnimation;
    private readonly outerPointAnimation;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
}
