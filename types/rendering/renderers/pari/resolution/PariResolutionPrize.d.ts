import { Container } from '../../../../lib/pixi';
import { IGraphicStorage, RenderingContext } from '../../../../rendering';
import { BaseRenderer } from '../../../../rendering';
export declare class PariResolutionPrize extends BaseRenderer {
    static readonly PARI_RESOLUTION_PRIZE_ID: symbol;
    get rendererId(): symbol;
    private readonly textstyle;
    private readonly subtextstyle;
    private readonly textstylePrecent;
    constructor(renderer: IGraphicStorage);
    private renderedMetaId;
    protected update(context: RenderingContext, container: Container): Container;
}
