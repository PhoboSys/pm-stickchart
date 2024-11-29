import { BaseRenderer, RenderingContext } from '@rendering';
import { Container } from '../../../../lib/pixi';
export declare class PricefeedInfoRenderer extends BaseRenderer {
    static readonly PRICEFEED_INFO_ID: symbol;
    get rendererId(): symbol;
    private groupStyle;
    private mobileGroupStyle;
    private baseGameBaseStyle;
    private gameBaseStyle;
    private baseGameQuoteStyle;
    private gameQuoteStyle;
    private baseMobileGameBaseStyle;
    private mobileGameBaseStyle;
    private baseMobileGameQuoteStyle;
    private mobileGameQuoteStyle;
    private subtitleContainerStyle;
    private baseSubtitleStyle;
    private subtitleStyle;
    private mobileSubtitleContainerStyle;
    private baseMobileSubtitleStyle;
    private mobileSubtitleStyle;
    private baseStyle;
    private logoStyle;
    private baseMobileLogoStyle;
    private mobileLogoStyle;
    protected update(context: RenderingContext, layer: Container): Container;
    private createSubtitle;
}
