import { IGraphicStorage, RenderingContext } from '@rendering';
import { BaseRenderer } from '@rendering';
import { Container } from '../../../lib/pixi';
export declare class PoolBackgroundRenderer extends BaseRenderer {
    static readonly POOL_BACKGROUND_ID: symbol;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private updateBackground;
}
