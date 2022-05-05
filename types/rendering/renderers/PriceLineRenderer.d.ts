import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
import { Container } from '../../lib/pixi';
export declare class PriceLineRenderer extends BaseRenderer {
    static readonly PRICE_LINE_ID: symbol;
    private readonly lineStyle;
    private readonly textStyle;
    private context;
    private anim;
    private tween;
    constructor(storage: IGraphicStorage);
    private performContainer;
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private animateLatestLine;
    private performTween;
    private performTicker;
    protected updateLatest(context: RenderingContext): void;
    protected updatePriceline(context: RenderingContext): void;
}
