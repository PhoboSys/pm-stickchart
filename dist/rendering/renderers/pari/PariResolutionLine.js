"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariResolutionLine = void 0;
const infra_1 = require("../../../infra");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const ui_1 = __importDefault(require("../../../lib/ui"));
const calc_utils_1 = require("../../../lib/calc-utils");
const events_1 = require("../../../events");
const __1 = require("../..");
const enums_1 = require("../../../enums");
const symbols_1 = require("../../textures/symbols");
const BaseParisRenderer_1 = require("./BaseParisRenderer");
class PariResolutionLine extends BaseParisRenderer_1.BaseParisRenderer {
    constructor() {
        super(...arguments);
        this.lineStyle = {
            [enums_1.EPosition.Undefined]: {
                circlStyle: {
                    innerr: 3,
                    outerr: 6,
                    innerColor: 0x303550,
                    outerColor: 0xFFFFFF,
                },
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 1,
                }
            },
            [enums_1.EPosition.Up]: {
                circlStyle: {
                    innerr: 3,
                    outerr: 6,
                    innerColor: 0x303550,
                    outerColor: config.style.resolution.upcolor,
                },
                lineStyle: {
                    color: config.style.resolution.upcolor,
                    width: 1,
                }
            },
            [enums_1.EPosition.Down]: {
                circlStyle: {
                    innerr: 3,
                    outerr: 6,
                    innerColor: 0x303550,
                    outerColor: config.style.resolution.downcolor,
                },
                lineStyle: {
                    color: config.style.resolution.downcolor,
                    width: 1,
                }
            },
            [enums_1.EPosition.Zero]: {
                circlStyle: {
                    innerr: 3,
                    outerr: 6,
                    innerColor: 0x303550,
                    outerColor: config.style.resolution.zerocolor,
                },
                lineStyle: {
                    color: config.style.resolution.zerocolor,
                    width: 1,
                }
            },
        };
        this.configAnimations = {
            winning_line: {
                pixi: {
                    alpha: 1.1,
                },
                duration: 0.5,
                ease: 'back.out(4)',
            },
            loseing_line: {
                pixi: {
                    alpha: 0.7,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
            won_line: {
                pixi: {
                    alpha: 1.1,
                },
                duration: 0.5,
                ease: 'back.out(4)',
            },
            lost_line: {
                pixi: {
                    alpha: 0.4,
                },
                duration: 0.5,
                ease: 'power2.out',
            },
            winning_group: {
                pixi: {
                    alpha: 1.3,
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
                    alpha: 1.1,
                    zIndex: 4,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
                new: 'set'
            },
            unhover_group_claimable: {
                pixi: {
                    alpha: 1,
                    zIndex: 1,
                },
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.5,
                new: 'set'
            },
            hover_group_unclaimable: {
                pixi: {
                    alpha: 1,
                    zIndex: 4,
                },
                duration: 0.3,
                ease: 'back.out(2)',
                clear: true,
                new: 'set'
            },
            unhover_group_unclaimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 0,
                },
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.5,
                new: 'set'
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
            tab_paybtn: {
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
        return PariResolutionLine.PARI_RESOLUTION_LINE_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updatePari(pool, pari, context, container) {
        this.updateTile(pool, pari, context, container);
    }
    updateTile(pool, pari, context, container) {
        var _a;
        const position = pari.position in enums_1.EPosition ? pari.position : enums_1.EPosition.Undefined;
        const { width, height, } = context.screen;
        const poolid = pool.poolid;
        const pariid = pari.pariid;
        const erc20 = pari.erc20;
        const { timerange, paddingY: [top, bottom] } = context.plotdata;
        const { openPriceTimestamp } = pool;
        const [ox] = datamath_1.default.scale([openPriceTimestamp], timerange, width);
        const bgStyle = this.backgroundStyle[position];
        const [ax, ay] = bgStyle.anchor;
        const [ofx, ofy] = bgStyle.offset;
        const bgwidth = bgStyle.width;
        const bgheight = bgStyle.height;
        const bgx = ox + bgwidth * ax + ofx;
        const bgy = top - bgheight * ay + ofy;
        const [group, groupstate] = this.get('group', () => new pixi_1.Container());
        if (groupstate.new) {
            group.alpha = 0;
            group.width = bgwidth;
            group.height = bgheight;
            container.sortableChildren = true;
            container.addChild(group);
        }
        group.position.set(bgx, bgy);
        const [background, backgroundState] = this.get('background', () => this.createBackground(pari.position));
        if (backgroundState.new)
            group.addChild(background);
        const [content, contentState] = this.get('content', () => new pixi_1.Container());
        if (contentState.new)
            group.addChild(content);
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
        const [tptox, tptoy] = this.titleprofitStyle.offset;
        const [titleprofit, titleprofitState] = this.get('titleprofit', () => __1.GraphicUtils.createText('Profit', [
            bgwidth + tptox,
            tptoy,
        ], this.titleprofitStyle.text, this.titleprofitStyle.anchor));
        if (titleprofitState.new)
            content.addChild(titleprofit);
        const rprice = this.getResolutionPricePoint(pool, context);
        const resolution = this.getPoolResolutionByPrice(pool, rprice);
        const win = pari.position === resolution;
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
            if (win) {
                this.animate('background', 'won_bg');
            }
            else {
                this.animate('background', 'lost_bg');
                this.animate('content', 'lost_contnet');
            }
            const [claimable] = this.get('claimable', () => win && !pari.claimed, [win, pari.claimed]);
            if (claimable) {
                if (groupstate.animation !== 'hover_group_claimable')
                    this.animate('group', 'unhover_group_claimable');
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
                    });
                    claim.addEventListener('pointerout', (e) => {
                        this.rebind(poolid, pariid);
                        this.animate('group', 'unhover_group_claimable');
                        this.animate('claim', 'unhover_claim');
                    });
                    claim.addEventListener('pointertap', (e) => {
                        this.rebind(poolid, pariid);
                        this.animate('claim', 'tab_paybtn');
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
                const [claim_img, claimimgState] = this.get('claim_img', () => new pixi_1.Graphics(), [resolved, pari.claimed]);
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
exports.PariResolutionLine = PariResolutionLine;
PariResolutionLine.PARI_RESOLUTION_LINE_ID = Symbol('PARI_RESOLUTION_LINE_ID');
//# sourceMappingURL=PariResolutionLine.js.map