"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricefeedInfoRenderer = void 0;
const _rendering_1 = require("../../../index.js");
const pixi_1 = require("../../../../lib/pixi");
const _constants_1 = require("../../../../constants/index.js");
class PricefeedInfoRenderer extends _rendering_1.BaseRenderer {
    constructor() {
        super(...arguments);
        this.groupStyle = {
            offset: [70, 55]
        };
        this.mobileGroupStyle = {
            offset: [15, 15]
        };
        this.gameBaseStyle = {
            text: {
                fill: 0x455077,
                fontWeight: 700,
                fontFamily: 'Gilroy',
                fontSize: 50,
                trim: true,
            },
            offset: [0, 0]
        };
        this.gameQuoteStyle = {
            text: {
                fill: 0xFFFFFF00,
                fontWeight: 700,
                fontFamily: 'Gilroy',
                fontSize: 48,
                stroke: 0x455077,
                strokeThickness: 1,
                trim: true,
            },
            offset: [6, 0]
        };
        this.mobileGameBaseStyle = {
            text: {
                fill: 0x455077,
                fontWeight: 700,
                fontFamily: 'Gilroy',
                fontSize: 30,
                trim: true,
            },
            offset: [0, 0]
        };
        this.mobileGameQuoteStyle = {
            text: {
                fill: 0xFFFFFF00,
                fontWeight: 700,
                fontFamily: 'Gilroy',
                fontSize: 28,
                stroke: 0x455077,
                strokeThickness: 1,
                trim: true,
            },
            offset: [6, 0]
        };
        this.subtitleContainerStyle = {
            offset: [0, 49]
        };
        this.subtitleStyle = {
            text: {
                fill: 0x455077,
                fontWeight: 500,
                fontFamily: 'Proxima Nova',
                fontSize: 15,
            },
            offset: [0, 0]
        };
        this.mobileSubtitleContainerStyle = {
            offset: [0, 29]
        };
        this.mobileSubtitleStyle = {
            text: {
                fill: 0x455077,
                fontWeight: 500,
                fontFamily: 'Proxima Nova',
                fontSize: 8,
            },
            offset: [0, 0]
        };
        this.logoStyle = {
            size: 24,
            offset: [7, -3.5]
        };
        this.mobileLogoStyle = {
            size: 15,
            offset: [4, -2]
        };
    }
    get rendererId() {
        return PricefeedInfoRenderer.PRICEFEED_INFO_ID;
    }
    update(context, layer) {
        const [group, groupstate] = this.get('group', () => new pixi_1.Container());
        if (groupstate.new) {
            layer.addChild(group);
            group.position.set(...(context.options.isMobile ? this.mobileGroupStyle : this.groupStyle).offset);
        }
        const gamebaseStyle = context.options.isMobile ? this.mobileGameBaseStyle : this.gameBaseStyle;
        const [gameBase, gameBaseState] = this.get('gameBase', () => _rendering_1.GraphicUtils.createText(context.game.base, gamebaseStyle.offset, gamebaseStyle.text));
        if (gameBaseState.new)
            group.addChild(gameBase);
        const gameQuoteStyle = context.options.isMobile ? this.mobileGameQuoteStyle : this.gameQuoteStyle;
        const [gameQuote, gameQuoteState] = this.get('gameQuote', () => _rendering_1.GraphicUtils.createText(context.game.quote, [gameBase.width + gameQuoteStyle.offset[0], gameQuoteStyle.offset[1]], gameQuoteStyle.text));
        if (gameQuoteState.new)
            group.addChild(gameQuote);
        const [subtitle, subtitleState] = this.get('subtitle', () => this.createSubtitle(context));
        if (subtitleState.new)
            group.addChild(subtitle);
        return layer;
    }
    createSubtitle(context) {
        const container = new pixi_1.Container();
        container.position.set(...(context.options.isMobile ? this.mobileSubtitleContainerStyle : this.subtitleContainerStyle).offset);
        const text = _rendering_1.GraphicUtils.createText('Pricefeed by', (context.options.isMobile ? this.mobileSubtitleStyle : this.subtitleStyle).offset, (context.options.isMobile ? this.mobileSubtitleStyle : this.subtitleStyle).text);
        container.addChild(text);
        const texture = context.textures.get(_rendering_1.CHAINLINK_TEXTURE);
        const logo = new pixi_1.Sprite(texture);
        const logoStyle = context.options.isMobile ? this.mobileLogoStyle : this.logoStyle;
        const pointertap = () => {
            const link = _constants_1.PRICEFEED.CL_URL[context.game.pricefeed];
            window.open(link, '__blank');
        };
        if (context.options.isMobile) {
            context.eventTarget.addEventListener('touchstart', (e) => {
                if (e.multitouch) {
                    logo.removeEventListener('pointertap', pointertap);
                }
                else {
                    logo.addEventListener('pointertap', pointertap);
                }
            });
        }
        logo.interactive = true;
        logo.cursor = 'pointer';
        logo.addEventListener('pointertap', pointertap);
        logo.scale.set(logoStyle.size / logo.height);
        logo.position.set(text.width + logoStyle.offset[0], logoStyle.offset[1]);
        container.addChild(logo);
        return container;
    }
}
exports.PricefeedInfoRenderer = PricefeedInfoRenderer;
PricefeedInfoRenderer.PRICEFEED_INFO_ID = Symbol('PRICEFEED_INFO_ID');
//# sourceMappingURL=PricefeedInfoRenderer.js.map