import { BaseRenderer, RenderingContext } from '@rendering';
import { Container } from '../../../../lib/pixi';
export declare class PricefeedInfoRenderer extends BaseRenderer {
    static readonly PRICEFEED_INFO_ID: symbol;
    get rendererId(): symbol;
    private groupStyle;
    private titleStyle;
    private subtitleContainerStyle;
    private subtitleStyle;
    private logoStyle;
    protected update(context: RenderingContext, layer: Container): Container;
    private createSubtitle;
}
