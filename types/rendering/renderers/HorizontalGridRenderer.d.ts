import { Graphics } from '../../lib/pixi';
import { IGraphicRenderer, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class HorizontalGridRenderer extends BaseRenderer {
    static readonly HORIZONTAL_GRID_ID: string;
    private readonly lineStyle;
    private readonly textStyle;
    constructor(renderer: IGraphicRenderer);
    get rendererId(): string;
    protected create(context: RenderingContext): Graphics;
}
