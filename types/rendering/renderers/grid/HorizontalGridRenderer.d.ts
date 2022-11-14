import { Container } from '../../../lib/pixi';
import { RenderingContext } from '../..';
import { BaseRenderer } from '../..';
export declare class HorizontalGridRenderer extends BaseRenderer {
    static readonly HORIZONTAL_GRID_ID: symbol;
    private readonly lineStyle;
    private readonly textStyle;
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
}
