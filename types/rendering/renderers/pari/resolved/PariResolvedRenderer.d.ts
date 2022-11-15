import { IGraphicStorage, RenderingContext } from '../../../../rendering';
import { BaseRenderer } from '../../../../rendering';
import { Container } from '../../../../lib/pixi';
export declare class PariResolvedRenderer extends BaseRenderer {
    static readonly PARI_RESOLVED_ID: symbol;
    get rendererId(): symbol;
    private readonly textstyle;
    private readonly subtextstyle;
    private readonly textstylePrecent;
    constructor(renderer: IGraphicStorage);
    private renderedMetaId;
    private unresolvedParis;
    protected update(context: RenderingContext, container: Container): Container;
}
