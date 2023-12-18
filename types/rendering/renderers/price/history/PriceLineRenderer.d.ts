import { RenderingContext } from '@rendering';
import { BaseRenderer } from '@rendering';
import { Container } from '../../../../lib/pixi';
export declare class PriceLineRenderer extends BaseRenderer {
    static readonly PRICE_LINE_ID: symbol;
    private readonly lineStyle;
    get rendererId(): symbol;
    protected update(context: RenderingContext, container: Container): Container;
    private drawLine;
    private drawGradient;
}
