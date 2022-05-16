import { IGraphicStorage, RenderingContext } from '../..';
import { BaseRenderer } from '../..';
import { Container } from '../../../lib/pixi';
export declare class PoolLeftOpenTimeRenderer extends BaseRenderer {
    static readonly POOL_LEFT_OPEN_TIME_ID: symbol;
    private readonly style;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    private hideContainer;
    protected update(context: RenderingContext, container: Container): Container;
}
