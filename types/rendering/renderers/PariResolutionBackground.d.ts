import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
import { Container } from '../../lib/pixi';
export declare class PariResolutionBackground extends BaseRenderer {
    static readonly PARI_RESOLUTION_ID: symbol;
    get rendererId(): symbol;
    private renderedMetaId;
    constructor(renderer: IGraphicStorage);
    protected update(context: RenderingContext, container: Container): Container;
}
