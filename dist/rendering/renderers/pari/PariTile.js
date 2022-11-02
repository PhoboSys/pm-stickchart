"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariTile = void 0;
const infra_1 = require("../../../infra");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const ui_1 = __importDefault(require("../../../lib/ui"));
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
                offset: [3, -10],
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
                offset: [3, -10],
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
                offset: [3, -10],
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
                offset: [3, -10],
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
            offset: [60, 28]
        };
        this.titlewagerStyle = {
            text: {
                fill: 0xB7BDD7,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
            offset: [60, 16]
        };
        this.prizeStyle = {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 16,
            },
            offset: [-22, 28],
            anchor: [1, 0]
        };
        this.profitStyle = {
            text: {
                fill: 0xB7BDD7,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
            offset: [-22, 16],
            anchor: [1, 0]
        };
        this.titleprofitStyle = {
            text: {
                fill: 0xB7BDD7,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
            offset: [-22, 16],
            anchor: [1, 0]
        };
        this.configAnimations = {
            winning: {
                pixi: {
                    alpha: 1.1,
                    lineColor: 0xFFFFFF,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
            loseing: {
                pixi: {
                    alpha: 1,
                    lineColor: 0xB7BDD7,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
            won: {
                pixi: {
                    alpha: 1,
                    lineColor: 0xFFA000,
                },
                duration: 0.5,
                ease: 'power2.out',
                new: 'set'
            },
            lost: {
                pixi: {
                    alpha: 1,
                    lineColor: 0xB7BDD7,
                },
                duration: 0.5,
                ease: 'power2.out',
                new: 'set'
            },
            cntlost: {
                pixi: {
                    alpha: 0.6,
                },
                duration: 0.5,
                ease: 'power2.out',
                new: 'set'
            },
            fadeinwin: {
                pixi: {
                    alpha: 1.3,
                    zIndex: 3,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            fadeinlose: {
                pixi: {
                    alpha: 1,
                    zIndex: 3,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            hoverwin: {
                pixi: {
                    alpha: 1.3,
                    zIndex: 4,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            unhoverwin: {
                pixi: {
                    alpha: 1,
                    zIndex: 1,
                },
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.5,
                new: 'set'
            },
            hoverlose: {
                pixi: {
                    alpha: 1,
                    zIndex: 4,
                },
                duration: 0.3,
                ease: 'back.out(2)',
                clear: true,
                new: 'set'
            },
            unhoverlose: {
                pixi: {
                    alpha: 0,
                    zIndex: 0,
                },
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.5,
                new: 'set'
            }
        };
    }
    get rendererId() {
        return PariTile.PARI_TILE_ID;
    }
    get animations() {
        return this.configAnimations;
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
        const [group, groupstate] = this.get('group', () => new pixi_1.Container());
        if (groupstate.new) {
            group.alpha = 0;
            container.sortableChildren = true;
            container.addChild(group);
        }
        const [background, backgroundState] = this.get('background', () => this.createBackground(pari.position));
        if (backgroundState.new)
            group.addChild(background);
        const bgStyle = this.backgroundStyle[position];
        const [ax, ay] = bgStyle.anchor;
        const [ofx, ofy] = bgStyle.offset;
        const bgwidth = background.width;
        const bgheight = background.height;
        const bgx = ox + bgwidth * ax + ofx;
        const bgy = top - bgheight * ay + ofy;
        background.position.set(bgx, bgy);
        const [content, contentState] = this.get('content', () => new pixi_1.Container());
        if (contentState.new) {
            content.width = bgwidth;
            content.height = bgheight;
            group.addChild(content);
        }
        content.position.set(bgx, bgy);
        const [icon, iconState] = this.get('icon', () => this.createIcon(context, pari.position));
        if (iconState.new)
            content.addChild(icon);
        const [wager, wagerState] = this.get('wager', () => __1.GraphicUtils.createText(ui_1.default.erc20(pari.wager), this.wagerStyle.offset, this.wagerStyle.text));
        if (wagerState.new)
            content.addChild(wager);
        wager.text = ui_1.default.erc20(pari.wager);
        const [titlewager, titlewagerState] = this.get('titlewager', () => __1.GraphicUtils.createText('Wager', this.titlewagerStyle.offset, this.titlewagerStyle.text));
        if (titlewagerState.new)
            content.addChild(titlewager);
        const rprice = this.getResolutionPricePoint(pool, context);
        const resolution = this.getPoolResolutionByPrice(pool, rprice);
        const [win] = this.get('win', () => pari.position === resolution, [resolution, pari.position]);
        const [tptox, tptoy] = this.titleprofitStyle.offset;
        const [titleprofit, titleprofitState] = this.get('titleprofit', () => __1.GraphicUtils.createText('Profit', [
            bgwidth + tptox,
            tptoy,
        ], this.titleprofitStyle.text, this.titleprofitStyle.anchor));
        if (titleprofitState.new)
            content.addChild(titleprofit);
        if (win) {
            this.clear('zero');
            const [prizeAmount] = this.get('prizeAmount', () => ui_1.default.erc20((0, calc_utils_1.actualReturn)(pool.prizefunds, pari.wager, pari.position)), [pari.wager, pool.prizefunds]);
            const [pzox, pzoy] = this.prizeStyle.offset;
            const [prize, prizeState] = this.get('prize', () => __1.GraphicUtils.createText(prizeAmount, [
                bgwidth + pzox,
                pzoy,
            ], this.prizeStyle.text, this.prizeStyle.anchor));
            if (prizeState.new)
                content.addChild(prize);
            prize.text = prizeAmount;
            const [profitPercent] = this.get('profitPercent', () => ui_1.default.percent((0, calc_utils_1.actualProfitPercent)(pool.prizefunds, pari.wager, pari.position)), [pari.wager, pool.prizefunds]);
            const [ptox, ptoy] = this.profitStyle.offset;
            const [profit, profitState] = this.get('profit', () => __1.GraphicUtils.createText(profitPercent, [
                bgwidth + ptox,
                ptoy,
            ], this.profitStyle.text, this.profitStyle.anchor));
            if (profitState.new)
                content.addChild(profit);
            profit.text = profitPercent;
            titleprofit.position.set(bgwidth + tptox - profit.width - 4, // 4px padding
            tptoy);
        }
        else {
            this.clear('prize');
            this.clear('profit');
            const [pzox, pzoy] = this.prizeStyle.offset;
            const [zero, zeroState] = this.get('zero', () => __1.GraphicUtils.createText(0, [
                bgwidth + pzox,
                pzoy,
            ], this.prizeStyle.text, this.prizeStyle.anchor));
            if (zeroState.new)
                content.addChild(zero);
            titleprofit.position.set(bgwidth + tptox, tptoy);
        }
        if (this.isHistoricalPool(pool, context)) {
            if (win)
                this.animate('background', 'won');
            else
                this.animate('background', 'lost');
            if (!win)
                this.animate('content', 'cntlost');
            if (win) {
                if (groupstate.animation !== 'hoverwin')
                    this.animate('group', 'unhoverwin');
            }
            else {
                if (groupstate.animation !== 'hoverlose')
                    this.animate('group', 'unhoverlose');
            }
            if (!backgroundState.subscribed) {
                backgroundState.subscribed = true;
                const poolid = pool.poolid;
                const pariid = pari.pariid;
                context.eventTarget.addEventListener('poolhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [w] = this.read('win');
                    if (w)
                        this.animate('group', 'hoverwin');
                    else
                        this.animate('group', 'hoverlose');
                });
                context.eventTarget.addEventListener('poolunhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [w] = this.read('win');
                    if (w)
                        this.animate('group', 'unhoverwin');
                    else
                        this.animate('group', 'unhoverlose');
                });
            }
        }
        else {
            if (win)
                this.animate('background', 'winning');
            else
                this.animate('background', 'loseing');
            if (win)
                this.animate('group', 'fadeinwin');
            else
                this.animate('group', 'fadeinlose');
        }
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
        background.alpha = 0;
        return background;
    }
}
exports.PariTile = PariTile;
PariTile.PARI_TILE_ID = Symbol('PARI_TILE_ID');
//# sourceMappingURL=PariTile.js.map