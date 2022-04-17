import { Graphics } from '../../lib/pixi';
import { IGraphicRenderer, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class VerticalGridRenderer extends BaseRenderer {
    static readonly VERTICAL_GRID_ID: string;
    private readonly lineStyle;
    constructor(renderer: IGraphicRenderer);
    get rendererId(): string;
    protected create(context: RenderingContext): Graphics;
}
