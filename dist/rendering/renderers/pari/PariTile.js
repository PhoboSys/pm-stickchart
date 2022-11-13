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
const events_1 = require("../../../events");
const __1 = require("../..");
const enums_1 = require("../../../enums");
const constants_1 = require("../../../constants");
const textures_1 = require("../../textures");
const textures_2 = require("../../textures");
const BaseParisRenderer_1 = require("./BaseParisRenderer");
class PariTile extends BaseParisRenderer_1.BaseParisRenderer {
    constructor() {
        super(...arguments);
        this.nocontestLineStyle = {
            [enums_1.EPosition.Up]: {
                offsetTOP: [0, -6],
                offsetBOTTOM: [0, 6],
                lineStyle: {
                    color: 0xB7BDD7,
                    width: 2,
                }
            },
            [enums_1.EPosition.Down]: {
                offsetTOP: [0, -6],
                offsetBOTTOM: [0, 6],
                lineStyle: {
                    color: 0xB7BDD7,
                    width: 2,
                }
            },
            [enums_1.EPosition.Zero]: {
                offsetTOP: [300, -6],
                offsetBOTTOM: [300, 6],
                lineStyle: {
                    color: 0xB7BDD7,
                    width: 2,
                }
            }
        };
        this.winlineStyle = {
            [enums_1.EPosition.Up]: {
                offsetTOP: [0, -6],
                offsetBOTTOM: [0, 6],
                lineStyle: {
                    color: 0xFFA000,
                    width: 2,
                }
            },
            [enums_1.EPosition.Down]: {
                offsetTOP: [0, -6],
                offsetBOTTOM: [0, 6],
                lineStyle: {
                    color: 0xFFA000,
                    width: 2,
                }
            },
            [enums_1.EPosition.Zero]: {
                offsetTOP: [300, -6],
                offsetBOTTOM: [300, 6],
                lineStyle: {
                    color: 0xFFA000,
                    width: 2,
                }
            }
        };
        this.buttonStyle = {
            [enums_1.EPosition.Up]: {
                size: 50,
                color: 0xFFA000,
                offset: [-30, 0],
                outside: [0, 0.5]
            },
            [enums_1.EPosition.Down]: {
                size: 50,
                color: 0xFFA000,
                offset: [-30, 0],
                outside: [0, 0.5]
            },
            [enums_1.EPosition.Zero]: {
                size: 50,
                color: 0xFFA000,
                offset: [30, 0],
                outside: [1, 0.5]
            }
        };
        this.groupStyle = {
            [enums_1.EPosition.Up]: {
                anchor: [0, 0],
                offset: [0, 40],
                width: 300,
                height: 62,
                background: {
                    offset: [3, 0],
                    radiuses: [1, 20, 20, 1],
                    color: 0x22273F,
                    lineStyle: {
                        color: 0xB7BDD7,
                        width: 2,
                        alpha: 1,
                    },
                    shadow: {
                        points: [0, 0, 300, 0],
                        colorStops: [
                            { color: '#22273FFF', offset: 0 },
                            { color: '#22273FFF', offset: 0.01 },
                            { color: '#22273F00', offset: 0.05 },
                            { color: '#22273F00', offset: 1 },
                        ]
                    },
                },
            },
            [enums_1.EPosition.Down]: {
                anchor: [0, -1],
                offset: [0, -134],
                width: 300,
                height: 62,
                background: {
                    offset: [3, 0],
                    radiuses: [1, 20, 20, 1],
                    color: 0x22273F,
                    lineStyle: {
                        color: 0xB7BDD7,
                        width: 2,
                        alpha: 1,
                    },
                    shadow: {
                        points: [0, 0, 300, 0],
                        colorStops: [
                            { color: '#22273FFF', offset: 0 },
                            { color: '#22273FFF', offset: 0.01 },
                            { color: '#22273F00', offset: 0.05 },
                            { color: '#22273F00', offset: 1 },
                        ]
                    },
                }
            },
            [enums_1.EPosition.Zero]: {
                anchor: [-1, 0],
                offset: [0, 8],
                width: 300,
                height: 62,
                background: {
                    offset: [-2, 0],
                    radiuses: [20, 1, 1, 20],
                    color: 0x22273F,
                    lineStyle: {
                        color: 0xB7BDD7,
                        width: 2,
                        alpha: 1,
                    },
                    shadow: {
                        points: [300, 0, 0, 0],
                        colorStops: [
                            { color: '#22273FFF', offset: 0 },
                            { color: '#22273FFF', offset: 0.01 },
                            { color: '#22273F00', offset: 0.05 },
                            { color: '#22273F00', offset: 1 },
                        ]
                    },
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
        this.validPariPositions = {
            [enums_1.EPosition.Up]: enums_1.EPosition.Up,
            [enums_1.EPosition.Down]: enums_1.EPosition.Down,
            [enums_1.EPosition.Zero]: enums_1.EPosition.Zero,
        };
        this.configAnimations = {
            winning_bg: {
                pixi: {
                    alpha: 1,
                    lineColor: 0xFFA000,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
            loseing_bg: {
                pixi: {
                    alpha: 1,
                    lineColor: 0xB7BDD7,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
            won_bg: {
                pixi: {
                    alpha: 1.1,
                    lineColor: 0xFFA000,
                },
                duration: 0.5,
                ease: 'power2.out',
                new: 'set'
            },
            lost_bg: {
                pixi: {
                    alpha: 1,
                    lineColor: 0xB7BDD7,
                },
                duration: 0.5,
                ease: 'power2.out',
                new: 'set'
            },
            unclaimable_contnet: {
                pixi: {
                    alpha: 0.7,
                },
                duration: 0.5,
                ease: 'power2.out',
                new: 'set'
            },
            lost_contnet: {
                pixi: {
                    alpha: 0.6,
                },
                duration: 0.5,
                ease: 'power2.out',
                new: 'set'
            },
            winning_group: {
                pixi: {
                    alpha: 1,
                    zIndex: 3,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            loseing_group: {
                pixi: {
                    alpha: 1,
                    zIndex: 3,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            hover_group_claimable: {
                pixi: {
                    alpha: 1,
                    zIndex: 4,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
            },
            unhover_group_claimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 1,
                },
                duration: 0.3,
                ease: 'power2.out',
                delay: 0.9,
            },
            hide_group_claimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 1,
                },
                duration: 0.6,
                ease: 'power2.out',
                delay: 5,
                new: 'set'
            },
            hover_group_unclaimable: {
                pixi: {
                    alpha: 0.9,
                    zIndex: 3,
                },
                duration: 0.3,
                ease: 'power2.out',
                clear: true,
            },
            unhover_group_unclaimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 0,
                },
                duration: 0.3,
                ease: 'power2.out',
                delay: 0.5,
                new: 'set'
            },
            hide_group: {
                pixi: {
                    alpha: 0,
                    zIndex: 0,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
            hover_claim: {
                pixi: {
                    alpha: 1.2,
                    scale: 1.1,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
            },
            unhover_claim: {
                pixi: {
                    alpha: 1,
                    scale: 1,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
            tab_claim: {
                pixi: {
                    scale: 1.2,
                },
                duration: 0.2,
                ease: 'back.out(2)',
                repeat: 1,
                yoyo: true,
                yoyoEase: 'power2.out',
            },
        };
    }
    get rendererId() {
        return PariTile.PARI_TILE_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updatePari(pool, pari, context, container) {
        if (!(pari.position in this.validPariPositions))
            return this.clear();
        const resolution = this.getPoolResolution(pool, context);
        this.updateTile(pool, pari, context, container, resolution);
        this.updateLine(pool, pari, context, container, resolution);
    }
    updateLine(pool, pari, context, container, resolution) {
        const win = pari.position === resolution;
        const nocontest = resolution === enums_1.EPosition.NoContest;
        const [group] = this.read('group');
        if (!(win || nocontest) || !group || !this.isHistoricalPool(pool, context))
            return this.clear('line');
        const { height } = context.screen;
        const { pricerange } = context.plotdata;
        const { openPriceValue } = pool;
        const [oy] = datamath_1.default.scaleReverse([openPriceValue], pricerange, height);
        const [line, linestate] = this.get('line', () => new pixi_1.Graphics());
        if (linestate.new)
            group.addChild(line);
        const style = nocontest ? this.nocontestLineStyle : this.winlineStyle;
        const [topx, topy] = style[pari.position].offsetTOP;
        const [botx, boty] = style[pari.position].offsetBOTTOM;
        line
            .clear()
            .lineStyle(style[pari.position].lineStyle)
            .moveTo(0 + topx, 0)
            .lineTo(0 + topx, oy + topy)
            .moveTo(0 + botx, oy + boty)
            .lineTo(0 + botx, height);
        line.position.y = -group.position.y;
    }
    updateTile(pool, pari, context, container, resolution) {
        var _a;
        const win = pari.position === resolution;
        const nocontest = resolution === enums_1.EPosition.NoContest;
        const { width, height } = context.screen;
        const poolid = pool.poolid;
        const pariid = pari.pariid;
        if (!win && !nocontest && this.isHistoricalPool(pool, context)) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.rebind(poolid, pariid);
                    this.clear();
                }
            });
            return;
        }
        const erc20 = pari.erc20;
        const position = pari.position;
        const { timerange, pricerange } = context.plotdata;
        const { openPriceTimestamp, openPriceValue } = pool;
        const [ox] = datamath_1.default.scale([openPriceTimestamp], timerange, width);
        const [oy] = datamath_1.default.scaleReverse([openPriceValue], pricerange, height);
        const bgStyle = this.groupStyle[position];
        const [ax, ay] = bgStyle.anchor;
        const [ofx, ofy] = bgStyle.offset;
        const bgwidth = bgStyle.width;
        const bgx = ox + bgwidth * ax + ofx;
        let vertical = null;
        if (position === enums_1.EPosition.Up)
            vertical = 0;
        if (position === enums_1.EPosition.Zero)
            vertical = oy;
        if (position === enums_1.EPosition.Down)
            vertical = height;
        if (vertical === null)
            return this.clear();
        const bgheight = bgStyle.height;
        const bgy = vertical + bgheight * ay + ofy;
        const [group, groupstate] = this.get('group', () => new pixi_1.Container());
        if (groupstate.new) {
            group.alpha = 0;
            group.width = bgwidth;
            group.height = bgheight;
            container.sortableChildren = true;
            container.addChild(group);
        }
        group.position.set(bgx, bgy);
        const [background, backgroundState] = this.get('background', () => this.createBackground(position, context));
        if (backgroundState.new)
            group.addChild(background);
        const [content, contentState] = this.get('content', () => new pixi_1.Container());
        if (contentState.new)
            group.addChild(content);
        const [icon, iconState] = this.get('icon', () => this.createIcon(context, position));
        if (iconState.new)
            content.addChild(icon);
        const [wager, wagerState] = this.get('wager', () => __1.GraphicUtils.createText(ui_1.default.erc20(pari.wager), this.wagerStyle.offset, this.wagerStyle.text));
        if (wagerState.new)
            content.addChild(wager);
        wager.text = ui_1.default.erc20(pari.wager);
        const [titlewager, titlewagerState] = this.get('titlewager', () => __1.GraphicUtils.createText('Wager', this.titlewagerStyle.offset, this.titlewagerStyle.text));
        if (titlewagerState.new)
            content.addChild(titlewager);
        const [tptox, tptoy] = this.titleprofitStyle.offset;
        const [titleprofit, titleprofitState] = this.get('titleprofit', () => __1.GraphicUtils.createText('Profit', [
            bgwidth + tptox,
            tptoy,
        ], this.titleprofitStyle.text, this.titleprofitStyle.anchor));
        if (titleprofitState.new)
            content.addChild(titleprofit);
        if (win) {
            this.clear('zero');
            const [prizeAmount] = this.get('prizeAmount', () => pari.claimed ? ui_1.default.erc20(pari.payout)
                : ui_1.default.erc20((0, calc_utils_1.actualReturn)(pool.prizefunds, pari.wager, pari.position)), [pari.wager, pari.position, pari.claimed, pool.prizefunds[constants_1.PRIZEFUNDS.TOTAL], nocontest]);
            const [pzox, pzoy] = this.prizeStyle.offset;
            const [prize, prizeState] = this.get('prize', () => __1.GraphicUtils.createText(prizeAmount, [
                bgwidth + pzox,
                pzoy,
            ], this.prizeStyle.text, this.prizeStyle.anchor));
            if (prizeState.new)
                content.addChild(prize);
            prize.text = prizeAmount;
            const [percent] = this.get('percent', () => ui_1.default.percent((0, calc_utils_1.profitPercent)(prizeAmount, pari.wager)), [prizeAmount, pari.wager]);
            const [ptox, ptoy] = this.profitStyle.offset;
            const [profit, profitState] = this.get('profit', () => __1.GraphicUtils.createText(percent, [
                bgwidth + ptox,
                ptoy,
            ], this.profitStyle.text, this.profitStyle.anchor));
            if (profitState.new)
                content.addChild(profit);
            profit.text = percent;
            titleprofit.text = 'Profit';
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
            ], this.prizeStyle.text, this.prizeStyle.anchor), [pari.wager]);
            if (zeroState.new)
                content.addChild(zero);
            zero.text = nocontest ? ui_1.default.erc20(pari.wager) : 0;
            titleprofit.text = 'Return';
            titleprofit.position.set(bgwidth + tptox, tptoy);
        }
        if (this.isHistoricalPool(pool, context)) {
            const [claimable] = this.get('claimable', () => !pari.claimed && (win || nocontest), [nocontest, win, pari.claimed]);
            if (win) {
                this.animate('background', 'won_bg');
                if (!claimable)
                    this.animate('content', 'unclaimable_contnet');
            }
            else {
                this.animate('background', 'lost_bg');
                this.animate('content', 'lost_contnet');
            }
            if (claimable) {
                if (groupstate.animation !== 'hover_group_claimable')
                    this.animate('group', 'hide_group_claimable');
            }
            else {
                if (groupstate.animation !== 'hover_group_unclaimable')
                    this.animate('group', 'unhover_group_unclaimable');
            }
            if (claimable) {
                const [resolved] = this.get('resolved', () => pool.resolved, [pool.resolved]);
                const [settlement] = this.get('settlement', () => { var _a; return (_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.poolid]; }, [(_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.poolid]]);
                const btnStyle = this.buttonStyle[position];
                const [btnx, btny] = btnStyle.offset;
                const [horizontal, vertical] = btnStyle.outside;
                const [claim, claimState] = this.get('claim', () => new pixi_1.Container(), [pari.claimed]);
                if (claimState.new) {
                    group.addChild(claim);
                    claim.width = btnStyle.size;
                    claim.height = btnStyle.size;
                    claim.interactive = true;
                    claim.cursor = 'pointer';
                    claim.addEventListener('pointerover', (e) => {
                        this.rebind(poolid, pariid);
                        this.animate('group', 'hover_group_claimable');
                        this.animate('claim', 'hover_claim');
                        context.eventTarget.dispatchEvent(new events_1.PoolHoverEvent(poolid, e));
                    });
                    claim.addEventListener('pointerout', (e) => {
                        this.rebind(poolid, pariid);
                        this.animate('group', 'unhover_group_claimable');
                        this.animate('claim', 'unhover_claim');
                        context.eventTarget.dispatchEvent(new events_1.PoolUnhoverEvent(poolid, e));
                    });
                    claim.addEventListener('pointertap', (e) => {
                        this.rebind(poolid, pariid);
                        this.animate('claim', 'tab_claim');
                        const [rslvd] = this.read('resolved');
                        const [sttlmnt] = this.read('settlement');
                        if (rslvd) {
                            context.eventTarget.dispatchEvent(new events_1.ClaimPariEvent(pariid, erc20, e));
                        }
                        if (!rslvd && sttlmnt) {
                            context.eventTarget.dispatchEvent(new events_1.SettlePoolEvent(poolid, sttlmnt.resolutionPrice, sttlmnt.controlPrice, e));
                        }
                    });
                }
                claim.position.set(btnx + bgwidth * horizontal, btny + bgheight * vertical);
                const [claim_img, claimimgState] = this.get('claim_img', () => new pixi_1.Graphics(), [resolved]);
                if (claimimgState.new) {
                    claim_img
                        .beginFill(0xFFA000)
                        .drawCircle(0, 0, btnStyle.size / 2)
                        .endFill()
                        .beginFill(0xFFA000)
                        .drawCircle(0, 0, btnStyle.size / 3)
                        .endFill();
                    if (!resolved) {
                        claim_img
                            .beginFill(0xFFF000)
                            .drawCircle(0, 0, btnStyle.size / 3)
                            .endFill();
                    }
                    claim.addChild(claim_img);
                }
            }
            else {
                this.clear('claim');
                this.clear('claim_img');
                this.clear('resolved');
                this.clear('settlement');
            }
            if (!groupstate.subscribed) {
                groupstate.subscribed = true;
                context.eventTarget.addEventListener('poolhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [clble] = this.read('claimable');
                    if (clble)
                        this.animate('group', 'hover_group_claimable');
                    else
                        this.animate('group', 'hover_group_unclaimable');
                });
                context.eventTarget.addEventListener('poolunhover', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [clble] = this.read('claimable');
                    if (clble)
                        this.animate('group', 'unhover_group_claimable');
                    else
                        this.animate('group', 'unhover_group_unclaimable');
                });
            }
        }
        else {
            if (win) {
                this.animate('background', 'winning_bg');
                this.animate('group', 'winning_group');
            }
            else {
                this.animate('background', 'loseing_bg');
                this.animate('group', 'loseing_group');
            }
        }
    }
    getPositionIconTextureName(position) {
        switch (position) {
            case enums_1.EPosition.Up:
                return textures_1.UP_ICON_TEXTURE;
            case enums_1.EPosition.Down:
                return textures_1.DOWN_ICON_TEXTURE;
            case enums_1.EPosition.Zero:
                return textures_1.ZERO_ICON_TEXTURE;
            default:
                infra_1.Logger.error(`pari position "${position}" is not supported, fallback to Undeliden`);
                return textures_2.UNDEFINED_ICON_TEXTURE;
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
    createBackground(position, context) {
        const { width, height, background: { offset: [ofx, ofy], lineStyle, radiuses, color, shadow: { points, colorStops } } } = this.groupStyle[position];
        let background = __1.GraphicUtils.createRoundedRect([ofx, ofy], [width, height], radiuses, { color, lineStyle });
        const texture = context.textures.get(textures_2.GRADIENT_TEXTURE, {
            width: width + lineStyle.width * 2,
            height: height + lineStyle.width * 2,
            points,
            colorStops
        });
        background = __1.GraphicUtils.createRoundedRect([ofx - lineStyle.width, ofy - lineStyle.width / 2], [width + lineStyle.width + lineStyle.width / 2, height + lineStyle.width], radiuses, { texture }, background);
        background.alpha = 0;
        return background;
    }
}
exports.PariTile = PariTile;
PariTile.PARI_TILE_ID = Symbol('PARI_TILE_ID');
//# sourceMappingURL=PariTile.js.map