import { Container } from '../../lib/pixi';
import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class PoolRenderer extends BaseRenderer {
    static readonly POOL_ID: symbol;
    private readonly openPoolStyle;
    private readonly lockPoolStyle;
    private readonly resolutionPoolStyle;
    private readonly openPricePointStyle;
    private readonly resolutionPricePointStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private createPrice;
    private createLockLine;
    private createPoolBorder;
}
