import { Container } from '../../lib/pixi';
import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class PariResolutionRenderer extends BaseRenderer {
    static readonly PARI_RESOLUTION_ID: symbol;
    get rendererId(): symbol;
    private readonly wagerUp;
    private readonly wagerDown;
    constructor(renderer: IGraphicStorage);
    protected update(context: RenderingContext, container: Container): Container;
}
