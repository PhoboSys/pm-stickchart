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
        this.logoStyle = {
            size: 24,
            offset: [7, -3.5]
        };
    }
    get rendererId() {
        return PricefeedInfoRenderer.PRICEFEED_INFO_ID;
    }
    update(context, layer) {
        const [group, groupstate] = this.get('group', () => new pixi_1.Container());
        if (groupstate.new) {
            layer.addChild(group);
            group.position.set(...this.groupStyle.offset);
        }
        const [gameBase, gameBaseState] = this.get('gameBase', () => _rendering_1.GraphicUtils.createText(context.game.base, this.gameBaseStyle.offset, this.gameBaseStyle.text));
        if (gameBaseState.new)
            group.addChild(gameBase);
        const [gameQuote, gameQuoteState] = this.get('gameQuote', () => _rendering_1.GraphicUtils.createText(context.game.quote, [gameBase.width + this.gameQuoteStyle.offset[0], this.gameQuoteStyle.offset[1]], this.gameQuoteStyle.text));
        if (gameQuoteState.new)
            group.addChild(gameQuote);
        const [subtitle, subtitleState] = this.get('subtitle', () => this.createSubtitle(context));
        if (subtitleState.new)
            group.addChild(subtitle);
        return layer;
    }
    createSubtitle(context) {
        const container = new pixi_1.Container();
        container.position.set(...this.subtitleContainerStyle.offset);
        const text = _rendering_1.GraphicUtils.createText('Pricefeed by', this.subtitleStyle.offset, this.subtitleStyle.text);
        container.addChild(text);
        const texture = context.textures.get(_rendering_1.CHAINLINK_TEXTURE);
        const logo = new pixi_1.Sprite(texture);
        logo.interactive = true;
        logo.cursor = 'pointer';
        logo.addEventListener('pointertap', () => {
            const link = _constants_1.PRICEFEED.CL_URL[context.game.pricefeed];
            window.open(link, '__blank');
        });
        logo.scale.set(this.logoStyle.size / logo.height);
        logo.position.set(text.width + this.logoStyle.offset[0], this.logoStyle.offset[1]);
        container.addChild(logo);
        return container;
    }
}
exports.PricefeedInfoRenderer = PricefeedInfoRenderer;
PricefeedInfoRenderer.PRICEFEED_INFO_ID = Symbol('PRICEFEED_INFO_ID');
//# sourceMappingURL=PricefeedInfoRenderer.js.map