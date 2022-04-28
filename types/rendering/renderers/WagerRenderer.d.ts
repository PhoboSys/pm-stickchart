import { Graphics } from '../../lib/pixi';
import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class PariResolutionRenderer extends BaseRenderer {
    static readonly WAGER_GRID_ID: symbol;
    get rendererId(): symbol;
    private readonly wagerUp;
    private readonly wagerDown;
    constructor(renderer: IGraphicStorage);
    protected create(context: RenderingContext): Graphics;
}
