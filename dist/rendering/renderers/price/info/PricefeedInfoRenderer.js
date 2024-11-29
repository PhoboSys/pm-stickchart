"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricefeedInfoRenderer = void 0;
const merge_1 = __importDefault(require("lodash/merge"));
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
        this.baseGameBaseStyle = {
            text: {
                fontWeight: 700,
                fontFamily: 'Gilroy',
                fontSize: 50,
                trim: true,
            },
            offset: [0, 0]
        };
        this.gameBaseStyle = {
            [_constants_1.DEFAULT_THEME]: (0, merge_1.default)({}, this.baseGameBaseStyle, { text: { fill: 0x455077 } }),
            [_constants_1.TOURNAMENT_THEME]: (0, merge_1.default)({}, this.baseGameBaseStyle, { text: { fill: 0xFED486 } })
        };
        this.baseGameQuoteStyle = {
            text: {
                fill: 0xFFFFFF00,
                fontWeight: 700,
                fontFamily: 'Gilroy',
                fontSize: 48,
                strokeThickness: 1,
                trim: true,
            },
            offset: [6, 0]
        };
        this.gameQuoteStyle = {
            [_constants_1.DEFAULT_THEME]: (0, merge_1.default)({}, this.baseGameQuoteStyle, { text: { stroke: 0x455077 } }),
            [_constants_1.TOURNAMENT_THEME]: (0, merge_1.default)({}, this.baseGameQuoteStyle, { text: { stroke: 0xFED486 } })
        };
        this.baseMobileGameBaseStyle = {
            text: {
                fontWeight: 700,
                fontFamily: 'Gilroy',
                fontSize: 30,
                trim: true,
            },
            offset: [0, 0]
        };
        this.mobileGameBaseStyle = {
            [_constants_1.DEFAULT_THEME]: (0, merge_1.default)({}, this.baseMobileGameBaseStyle, { text: { fill: 0x455077 } }),
            [_constants_1.TOURNAMENT_THEME]: (0, merge_1.default)({}, this.baseMobileGameBaseStyle, { text: { fill: 0xFED486 } })
        };
        this.baseMobileGameQuoteStyle = {
            text: {
                fill: 0xFFFFFF00,
                fontWeight: 700,
                fontFamily: 'Gilroy',
                fontSize: 28,
                strokeThickness: 1,
                trim: true,
            },
            offset: [6, 0]
        };
        this.mobileGameQuoteStyle = {
            [_constants_1.DEFAULT_THEME]: (0, merge_1.default)({}, this.baseMobileGameQuoteStyle, { text: { stroke: 0x455077 } }),
            [_constants_1.TOURNAMENT_THEME]: (0, merge_1.default)({}, this.baseMobileGameQuoteStyle, { text: { stroke: 0xFED486 } })
        };
        this.subtitleContainerStyle = {
            offset: [0, 49]
        };
        this.baseSubtitleStyle = {
            text: {
                fill: 0x455077,
                fontWeight: 500,
                fontFamily: 'Proxima Nova',
                fontSize: 15,
            },
            offset: [0, 0]
        };
        this.subtitleStyle = {
            [_constants_1.DEFAULT_THEME]: this.baseSubtitleStyle,
            [_constants_1.TOURNAMENT_THEME]: (0, merge_1.default)({}, this.baseSubtitleStyle, { text: { fill: 0xFED486 } })
        };
        this.mobileSubtitleContainerStyle = {
            offset: [0, 29]
        };
        this.baseMobileSubtitleStyle = {
            text: {
                fill: 0x455077,
                fontWeight: 500,
                fontFamily: 'Proxima Nova',
                fontSize: 8,
            },
            offset: [0, 0]
        };
        this.mobileSubtitleStyle = {
            [_constants_1.DEFAULT_THEME]: this.baseMobileSubtitleStyle,
            [_constants_1.TOURNAMENT_THEME]: (0, merge_1.default)({}, this.baseMobileSubtitleStyle, { text: { fill: 0xFED486 } })
        };
        this.baseStyle = {
            size: 24,
            offset: [7, -3.5],
            tint: 0xFFFFFF,
        };
        this.logoStyle = {
            [_constants_1.DEFAULT_THEME]: (0, merge_1.default)({}, this.baseStyle, { tint: 0x3B67FB }),
            [_constants_1.TOURNAMENT_THEME]: this.baseStyle,
        };
        this.baseMobileLogoStyle = {
            size: 15,
            offset: [4, -2],
            tint: 0xFFFFFF,
        };
        this.mobileLogoStyle = {
            [_constants_1.DEFAULT_THEME]: (0, merge_1.default)({}, this.baseMobileLogoStyle, { tint: 0x3B67FB }),
            [_constants_1.TOURNAMENT_THEME]: this.baseMobileLogoStyle,
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
        const gamebaseStyle = context.options.isMobile ?
            this.mobileGameBaseStyle[context.charttheme] :
            this.gameBaseStyle[context.charttheme];
        const [gameBase, gameBaseState] = this.get('gameBase', () => _rendering_1.GraphicUtils.createText(context.game.base, gamebaseStyle.offset, gamebaseStyle.text), [context.charttheme]);
        if (gameBaseState.new)
            group.addChild(gameBase);
        const gameQuoteStyle = context.options.isMobile ?
            this.mobileGameQuoteStyle[context.charttheme] :
            this.gameQuoteStyle[context.charttheme];
        const [gameQuote, gameQuoteState] = this.get('gameQuote', () => _rendering_1.GraphicUtils.createText(context.game.quote, [gameBase.width + gameQuoteStyle.offset[0], gameQuoteStyle.offset[1]], gameQuoteStyle.text), [context.charttheme]);
        if (gameQuoteState.new)
            group.addChild(gameQuote);
        const [subtitle, subtitleState] = this.get('subtitle', () => this.createSubtitle(context), [context.charttheme]);
        if (subtitleState.new)
            group.addChild(subtitle);
        return layer;
    }
    createSubtitle(context) {
        const container = new pixi_1.Container();
        container.position.set(...(context.options.isMobile ? this.mobileSubtitleContainerStyle : this.subtitleContainerStyle).offset);
        const textStyles = context.options.isMobile ? this.mobileSubtitleStyle[context.charttheme] : this.subtitleStyle[context.charttheme];
        const text = _rendering_1.GraphicUtils.createText('Pricefeed by', textStyles.offset, textStyles.text);
        container.addChild(text);
        const texture = context.textures.get(_rendering_1.CHAINLINK_TEXTURE);
        const logo = new pixi_1.Sprite(texture);
        const logoStyle = context.options.isMobile ? this.mobileLogoStyle[context.charttheme] : this.logoStyle[context.charttheme];
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
        logo.tint = logoStyle.tint;
        container.addChild(logo);
        return container;
    }
}
exports.PricefeedInfoRenderer = PricefeedInfoRenderer;
PricefeedInfoRenderer.PRICEFEED_INFO_ID = Symbol('PRICEFEED_INFO_ID');
//# sourceMappingURL=PricefeedInfoRenderer.js.map