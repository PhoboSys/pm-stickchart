import { Graphics } from '../../lib/pixi';
import { IGraphicStorage, RenderingContext } from '..';
import { BaseRenderer } from '..';
export declare class ActualPriceRenderer extends BaseRenderer {
    static readonly ACTUAL_PRICE_ID: symbol;
    private readonly lineStyle;
    private readonly textStyle;
    private readonly textCoverStyle;
    private readonly pointStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected create(context: RenderingContext): Graphics;
}
