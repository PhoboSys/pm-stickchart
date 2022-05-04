import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
import { Container } from '../../lib/pixi';
export declare class HorizontalGridRenderer extends BaseRenderer {
    static readonly HORIZONTAL_GRID_ID: symbol;
    private readonly lineStyle;
    private readonly textStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
}
