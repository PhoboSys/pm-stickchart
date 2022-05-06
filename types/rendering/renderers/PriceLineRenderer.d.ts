import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
import { Container } from '../../lib/pixi';
export declare class PriceLineRenderer extends BaseRenderer {
    static readonly PRICE_LINE_ID: symbol;
    private readonly lineStyle;
    private readonly slideAnimation;
    private context;
    constructor(storage: IGraphicStorage);
    private initContainer;
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private createAnimationTicker;
    protected updateLatestPriceline(context: RenderingContext): void;
    protected updatePriceline(context: RenderingContext): void;
}
