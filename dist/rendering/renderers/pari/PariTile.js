"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariTile = void 0;
const infra_1 = require("../../../infra");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const calc_utils_1 = require("../../../lib/calc-utils");
const __1 = require("../..");
const enums_1 = require("../../../enums");
const symbols_1 = require("../../textures/symbols");
const BaseParisRenderer_1 = require("./BaseParisRenderer");
class PariTile extends BaseParisRenderer_1.BaseParisRenderer {
    constructor() {
        super(...arguments);
        this.backgroundStyle = {
            [enums_1.EPosition.Undefined]: {
                anchor: [0, 1],
                offset: [8, -10],
                radiuses: [20, 20, 20, 20],
                color: 0x22273F,
                width: 300,
                height: 62,
                lineStyle: {
                    color: 0xB7BDD7,
                    width: 2,
                    alpha: 1,
                }
            },
            [enums_1.EPosition.Up]: {
                anchor: [0, 1],
                offset: [8, -10],
                radiuses: [20, 20, 20, 20],
                color: 0x22273F,
                width: 300,
                height: 62,
                lineStyle: {
                    color: 0xB7BDD7,
                    width: 2,
                    alpha: 1,
                }
            },
            [enums_1.EPosition.Down]: {
                anchor: [0, -1],
                offset: [8, -10],
                radiuses: [20, 20, 20, 20],
                color: 0x22273F,
                width: 300,
                height: 62,
                lineStyle: {
                    color: 0xB7BDD7,
                    width: 2,
                    alpha: 1,
                }
            },
            [enums_1.EPosition.Zero]: {
                anchor: [0, 0],
                offset: [8, -10],
                radiuses: [20, 20, 20, 20],
                color: 0x22273F,
                width: 300,
                height: 62,
                lineStyle: {
                    color: 0xB7BDD7,
                    width: 2,
                    alpha: 1,
                }
            }
        };
        this.iconStyle = {
            size: 30,
            offset: [16, 16]
        };
        this.wagerStyle = {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 16,
            },
            offset: [60, 22]
        };
        this.titlewagerStyle = {
            text: {
                fill: 0xB7BDD7,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
            offset: [60, 10]
        };
        this.prizeStyle = {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 16,
            },
            offset: [-22, 22],
            anchor: [1, 0]
        };
        this.profitStyle = {
            text: {
                fill: 0xB7BDD7,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
            offset: [-22, 10],
            anchor: [1, 0]
        };
        this.titleprofitStyle = {
            text: {
                fill: 0xB7BDD7,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
            offset: [-28, 10],
            anchor: [1, 0]
        };
    }
    get rendererId() {
        return PariTile.PARI_TILE_ID;
    }
    updatePari(pool, pari, context, container) {
        this.updateTile(pool, pari, context, container);
    }
    updateTile(pool, pari, context, container) {
        const position = pari.position in enums_1.EPosition ? pari.position : enums_1.EPosition.Undefined;
        const { width, height, } = context.screen;
        const { timerange, paddingY: [top, bottom] } = context.plotdata;
        const { openPriceTimestamp } = pool;
        const [ox] = datamath_1.default.scale([openPriceTimestamp], timerange, width);
        const bgStyle = this.backgroundStyle[position];
        const [background, backgroundState] = this.get('background', () => this.createBackground(pari.position));
        if (backgroundState.new)
            container.addChild(background);
        const [ax, ay] = bgStyle.anchor;
        const [ofx, ofy] = bgStyle.offset;
        const bgwidth = background.width;
        const bgheight = background.height;
        const bgx = ox + bgwidth * ax + ofx;
        const bgy = top - bgheight * ay + ofy;
        background.position.set(bgx, bgy);
        const [icon, iconState] = this.get('icon', () => this.createIcon(context, pari.position));
        if (iconState.new)
            background.addChild(icon);
        const [wager, wagerState] = this.get('wager', () => __1.GraphicUtils.createText(pari.wager, this.wagerStyle.offset, this.wagerStyle.text));
        if (wagerState.new)
            background.addChild(wager);
        wager.text = pari.wager;
        const [titlewager, titlewagerState] = this.get('titlewager', () => __1.GraphicUtils.createText('Wager', this.titlewagerStyle.offset, this.titlewagerStyle.text));
        if (titlewagerState.new)
            background.addChild(titlewager);
        const [prizeAmount] = this.get('prizeAmount', () => (0, calc_utils_1.actualReturn)(pool.prizefunds, pari.wager, pari.position), [pari.wager, pool.prizefunds]);
        const [pzox, pzoy] = this.prizeStyle.offset;
        const [prize, prizeState] = this.get('prize', () => __1.GraphicUtils.createText(prizeAmount, [
            bgwidth + pzox,
            pzoy,
        ], this.prizeStyle.text, this.prizeStyle.anchor));
        if (prizeState.new)
            background.addChild(prize);
        prize.text = prizeAmount;
        const [profitPercent] = this.get('profitPercent', () => (0, calc_utils_1.actualProfitPercent)(pool.prizefunds, pari.wager, pari.position), [pari.wager, pool.prizefunds]);
        const [ptox, ptoy] = this.profitStyle.offset;
        const [profit, profitState] = this.get('profit', () => __1.GraphicUtils.createText(profitPercent + '%', [
            bgwidth + ptox,
            ptoy,
        ], this.profitStyle.text, this.profitStyle.anchor));
        if (profitState.new)
            background.addChild(profit);
        profit.text = profitPercent + '%';
        const [tptox, tptoy] = this.titleprofitStyle.offset;
        const [titleprofit, titleprofitState] = this.get('titleprofit', () => __1.GraphicUtils.createText('Profit', [
            bgwidth + tptox - profit.width,
            tptoy,
        ], this.titleprofitStyle.text, this.titleprofitStyle.anchor));
        if (titleprofitState.new)
            background.addChild(titleprofit);
        titleprofit.position.set(bgwidth + tptox - profit.width, tptoy);
    }
    getPositionIconTextureName(position) {
        switch (position) {
            case enums_1.EPosition.Up:
                return symbols_1.UP_ICON_TEXTURE;
            case enums_1.EPosition.Down:
                return symbols_1.DOWN_ICON_TEXTURE;
            case enums_1.EPosition.Zero:
                return symbols_1.ZERO_ICON_TEXTURE;
            default:
                infra_1.Logger.error(`pari position "${position}" is not supported, fallback to Undeliden`);
                return symbols_1.UNDEFINED_ICON_TEXTURE;
        }
    }
    createIcon(context, position) {
        const textureName = this.getPositionIconTextureName(position);
        const texture = context.textures.get(textureName);
        const icon = new pixi_1.Sprite(texture);
        icon.scale.set(this.iconStyle.size / icon.height);
        icon.position.set(...this.iconStyle.offset);
        return icon;
    }
    createBackground(position) {
        const { radiuses, color, width, height, lineStyle, anchor } = this.backgroundStyle[position];
        const background = __1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { color, lineStyle });
        return background;
    }
}
exports.PariTile = PariTile;
PariTile.PARI_TILE_ID = Symbol('PARI_TILE_ID');
//# sourceMappingURL=PariTile.js.map