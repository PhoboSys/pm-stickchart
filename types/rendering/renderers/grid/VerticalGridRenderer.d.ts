import { Container } from '../../../lib/pixi';
import { RenderingContext } from '@rendering';
import { BaseRenderer } from '@rendering';
export declare class VerticalGridRenderer extends BaseRenderer {
    static readonly VERTICAL_GRID_ID: symbol;
    private readonly lineStyle;
    private readonly textStyle;
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
}
