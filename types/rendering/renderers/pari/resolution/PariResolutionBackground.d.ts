import { Container } from '../../../../lib/pixi';
import { IGraphicStorage, RenderingContext } from '../../../../rendering';
import { BaseRenderer } from '../../../../rendering';
export declare class PariResolutionBackground extends BaseRenderer {
    static readonly PARI_RESOLUTION_ID: symbol;
    get rendererId(): symbol;
    private renderedMetapoolid;
    constructor(renderer: IGraphicStorage);
    protected update(context: RenderingContext, container: Container): Container;
}
