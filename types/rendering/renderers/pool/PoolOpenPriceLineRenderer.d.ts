import { IGraphicStorage, RenderingContext } from '@rendering';
import { BaseRenderer } from '@rendering';
import { Container } from '../../../lib/pixi';
export declare class PoolOpenPriceLineRenderer extends BaseRenderer {
    static readonly POOL_OPEN_PRICE_LINE_ID: symbol;
    private lineStyle;
    private torusStyle;
    private textStyle;
    private coverStyle;
    constructor(renderer: IGraphicStorage);
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private updatePriceLine;
    private createPriceText;
    private createPricePoint;
}
