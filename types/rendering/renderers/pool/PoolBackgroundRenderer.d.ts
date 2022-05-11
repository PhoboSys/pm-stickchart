import { IGraphicStorage, RenderingContext } from '../..';
import { BaseRenderer } from '../..';
import { Container } from '../../../lib/pixi';
export declare class PoolBackgroundRenderer extends BaseRenderer {
    static readonly POOL_BACKGROUND_ID: symbol;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private updateBackground;
}
