import { Container } from '../../../../lib/pixi';
import { IGraphicStorage, RenderingContext } from '../../..';
import { BaseRenderer } from '../../..';
export declare class PariResolved extends BaseRenderer {
    static readonly PARI_RESOLVED_ID: symbol;
    get rendererId(): symbol;
    private readonly textstyle;
    private readonly subtextstyle;
    private readonly textstylePrecent;
    constructor(renderer: IGraphicStorage);
    private renderedMetaId;
    private renderedPool;
    private renderedParis;
    protected update(context: RenderingContext, container: Container): Container;
}
