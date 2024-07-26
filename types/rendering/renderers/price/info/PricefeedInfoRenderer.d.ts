import { BaseRenderer, RenderingContext } from '@rendering';
import { Container } from '../../../../lib/pixi';
export declare class PricefeedInfoRenderer extends BaseRenderer {
    static readonly PRICEFEED_INFO_ID: symbol;
    get rendererId(): symbol;
    private groupStyle;
    private mobileGroupStyle;
    private gameBaseStyle;
    private gameQuoteStyle;
    private mobileGameBaseStyle;
    private mobileGameQuoteStyle;
    private subtitleContainerStyle;
    private subtitleStyle;
    private mobileSubtitleContainerStyle;
    private mobileSubtitleStyle;
    private logoStyle;
    private mobileLogoStyle;
    protected update(context: RenderingContext, layer: Container): Container;
    private createSubtitle;
}
