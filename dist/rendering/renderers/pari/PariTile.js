"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariTile = void 0;
const lodash_1 = require("lodash");
const _constants_1 = require("../../../constants/index.js");
const _rendering_1 = require("../../index.js");
const textures_1 = require("../../textures");
const _infra_1 = require("../../../infra/index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const ui_1 = __importDefault(require("../../../lib/ui"));
const calc_utils_1 = require("../../../lib/calc-utils");
const _events_1 = require("../../../events/index.js");
const _events_2 = require("../../../events/index.js");
const _enums_1 = require("../../../enums/index.js");
const BaseParisRenderer_1 = require("./BaseParisRenderer");
class PariTile extends BaseParisRenderer_1.BaseParisRenderer {
    constructor() {
        super(...arguments);
        this.nocontestLineStyle = {
            [_enums_1.EPosition.Up]: {
                offsetTOP: [0, -6],
                offsetBOTTOM: [0, 6],
                lineStyle: {
                    color: 0xB7BDD7,
                    width: 2,
                }
            },
            [_enums_1.EPosition.Down]: {
                offsetTOP: [0, -6],
                offsetBOTTOM: [0, 6],
                lineStyle: {
                    color: 0xB7BDD7,
                    width: 2,
                }
            },
            [_enums_1.EPosition.Zero]: {
                offsetTOP: [300, -6],
                offsetBOTTOM: [300, 6],
                lineStyle: {
                    color: 0xB7BDD7,
                    width: 2,
                }
            }
        };
        this.winlineStyle = {
            [_enums_1.EPosition.Up]: {
                offsetTOP: [0, -6],
                offsetBOTTOM: [0, 6],
                lineStyle: {
                    color: 0xFFA000,
                    width: 2,
                }
            },
            [_enums_1.EPosition.Down]: {
                offsetTOP: [0, -6],
                offsetBOTTOM: [0, 6],
                lineStyle: {
                    color: 0xFFA000,
                    width: 2,
                }
            },
            [_enums_1.EPosition.Zero]: {
                offsetTOP: [300, -6],
                offsetBOTTOM: [300, 6],
                lineStyle: {
                    color: 0xFFA000,
                    width: 2,
                }
            }
        };
        this.buttonStyle = {
            [_enums_1.EPosition.Up]: {
                size: 50,
                color: 0xFFA000,
                offset: [-30, 0],
                outside: [0, 0.5]
            },
            [_enums_1.EPosition.Down]: {
                size: 50,
                color: 0xFFA000,
                offset: [-30, 0],
                outside: [0, 0.5]
            },
            [_enums_1.EPosition.Zero]: {
                size: 50,
                color: 0xFFA000,
                offset: [30, 0],
                outside: [1, 0.5]
            }
        };
        this.groupStyle = {
            [_enums_1.EPosition.Up]: {
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
            [_enums_1.EPosition.Down]: {
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
            [_enums_1.EPosition.Zero]: {
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
        this.stateBackgroundStyle = (0, lodash_1.merge)({}, this.groupStyle, {
            [_enums_1.EPosition.Up]: {
                background: {
                    color: 0x343755,
                    shadow: {
                        colorStops: [
                            { color: '#343755FF', offset: 0 },
                            { color: '#343755FF', offset: 0.01 },
                            { color: '#34375500', offset: 0.05 },
                            { color: '#34375500', offset: 1 },
                        ]
                    },
                },
            },
            [_enums_1.EPosition.Down]: {
                background: {
                    color: 0x343755,
                    shadow: {
                        colorStops: [
                            { color: '#343755FF', offset: 0 },
                            { color: '#343755FF', offset: 0.01 },
                            { color: '#34375500', offset: 0.05 },
                            { color: '#34375500', offset: 1 },
                        ]
                    },
                }
            },
            [_enums_1.EPosition.Zero]: {
                background: {
                    color: 0x343755,
                    shadow: {
                        colorStops: [
                            { color: '#343755FF', offset: 0 },
                            { color: '#343755FF', offset: 0.01 },
                            { color: '#34375500', offset: 0.05 },
                            { color: '#34375500', offset: 1 },
                        ]
                    },
                }
            }
        });
        this.stateBackgroundAlphaStyle = {
            winning: 1,
            undef: 0.6,
            phantom: 0.6,
            loseing: 0.8,
        };
        this.orphanBackgroundStyle = (0, lodash_1.merge)({}, this.groupStyle, {
            [_enums_1.EPosition.Up]: {
                background: {
                    color: 0xFF0000,
                    shadow: {
                        colorStops: [
                            { color: '#FF0000FF', offset: 0 },
                            { color: '#FF0000FF', offset: 0.01 },
                            { color: '#FF000000', offset: 0.05 },
                            { color: '#FF000000', offset: 1 },
                        ]
                    },
                },
                alpha: 0.06
            },
            [_enums_1.EPosition.Down]: {
                background: {
                    color: 0xFF0000,
                    shadow: {
                        colorStops: [
                            { color: '#FF0000FF', offset: 0 },
                            { color: '#FF0000FF', offset: 0.01 },
                            { color: '#FF000000', offset: 0.05 },
                            { color: '#FF000000', offset: 1 },
                        ]
                    },
                },
                alpha: 0.06
            },
            [_enums_1.EPosition.Zero]: {
                background: {
                    color: 0xFF0000,
                    shadow: {
                        colorStops: [
                            { color: '#FF0000FF', offset: 0 },
                            { color: '#FF0000FF', offset: 0.01 },
                            { color: '#FF000000', offset: 0.05 },
                            { color: '#FF000000', offset: 1 },
                        ]
                    },
                },
                alpha: 0.06
            }
        });
        this.payoutContainerStyle = {
            offset: [18, 13],
        };
        this.prizeStyle = {
            text: {
                fill: 0xf07750,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 18,
            },
            offset: [-9, 7],
            anchor: [1, 0],
            winFill: 0x00A573,
            loseFill: 0xf07750
        };
        this.payoutStyle = {
            height: 36,
            width: 42,
            fill: 0x212233,
        };
        this.profitContainerStyle = {
            offset: [12, 4],
        };
        this.profitStyle = {
            text: {
                fill: 0x212233,
                fontWeight: 700,
                fontFamily: 'Gilroy',
                fontSize: 13,
            },
            offset: [-3, 2],
            anchor: [1, 0]
        };
        this.profitBlockStyle = {
            height: 18,
            width: 8,
            fill: 0x00a573,
        };
        this.iconPositionStyle = {
            size: 30,
            offset: [16, 16]
        };
        this.levelCurrencyStyle = {
            radius: 10,
            offset: [7, 8]
        };
        this.iconCurrencyStyle = {
            size: 16,
            offset: [12, 10]
        };
        this.wagerStyle = {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 16,
            },
            offset: [60, 22]
        };
        this.validPariPositions = {
            [_enums_1.EPosition.Up]: _enums_1.EPosition.Up,
            [_enums_1.EPosition.Down]: _enums_1.EPosition.Down,
            [_enums_1.EPosition.Zero]: _enums_1.EPosition.Zero,
        };
        this.configAnimations = {
            show_propagating_bg: {
                pixi: {
                    alpha: 0.03,
                },
                duration: 0.3,
                ease: 'power2.out',
            },
            hide_propagating_bg: {
                pixi: {
                    alpha: 0,
                },
                duration: 0.3,
                ease: 'power2.out',
            },
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
            pin_group_claimable: {
                pixi: {
                    alpha: 1,
                    zIndex: 4,
                },
                duration: 0.5,
                ease: 'back.out(4)',
                clear: true,
            },
            unpin_group_claimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 1,
                },
                duration: 0.3,
                ease: 'power2.out',
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
            pin_group_unclaimable: {
                pixi: {
                    alpha: 0.9,
                    zIndex: 3,
                },
                duration: 0.3,
                ease: 'power2.out',
                clear: true,
            },
            unpin_group_unclaimable: {
                pixi: {
                    alpha: 0,
                    zIndex: 0,
                },
                duration: 0.3,
                ease: 'power2.out',
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
        if (!(pari.position in this.validPariPositions) || pool.phantom)
            return this.clear();
        const resolution = this.getPoolResolution(pool, context);
        this.updateTile(pool, pari, context, container, resolution);
        this.updateLine(pool, pari, context, container, resolution);
    }
    updateLine(pool, pari, context, container, resolution) {
        const win = pari.position === resolution;
        const nocontest = resolution === _enums_1.EPosition.NoContest;
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
        const poolid = pool.poolid;
        const pariid = pari.pariid;
        const phantom = pari.phantom;
        const undef = resolution === _enums_1.EPosition.Undefined;
        const nocontest = resolution === _enums_1.EPosition.NoContest;
        const win = pari.position === resolution;
        const lose = !win && !phantom;
        const isHistorical = this.isHistoricalPool(pool, context);
        const winning = win && !isHistorical && !phantom;
        const loseing = lose && !isHistorical && !phantom;
        const reverted = _rendering_1.EntityUtils.isEnityReverted(context, pariid);
        const orphan = phantom && reverted;
        const { width, height } = context.screen;
        if (!win && !nocontest && isHistorical) {
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
        if (position === _enums_1.EPosition.Up)
            vertical = 0;
        if (position === _enums_1.EPosition.Zero)
            vertical = oy;
        if (position === _enums_1.EPosition.Down)
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
        const [background, backgroundState] = this.get('background', () => this.createBackground(this.groupStyle[position], context));
        if (backgroundState.new)
            group.addChild(background);
        const [stateBackground, stateBackgroundState] = this.get('stateBackgroundState', () => this.createBackground(this.stateBackgroundStyle[position], context));
        if (stateBackgroundState.new)
            group.addChild(stateBackground);
        stateBackground.alpha = this.getStateBackgroundAlpha({ winning, loseing, undef, phantom });
        const [orphanBackground, orphanBackgroundState] = this.get('orphanBackground', () => this.createBackground(this.orphanBackgroundStyle[position], context));
        if (orphanBackgroundState.new)
            group.addChild(orphanBackground);
        orphanBackground.alpha = orphan ? this.orphanBackgroundStyle[position].alpha : 0;
        const [contentContainer, contentContainerState] = this.get('contentContainer', () => this.createContentContainer(position));
        if (contentContainerState.new)
            group.addChild(contentContainer);
        const [content, contentState] = this.get('content', () => new pixi_1.Container());
        if (contentState.new)
            contentContainer.addChild(content);
        content.alpha = this.getContentAlpha({ loseing, undef, phantom });
        const [iconPosition, iconPositionState] = this.get('iconPosition', () => this.createPositionIcon(context, position));
        if (iconPositionState.new)
            content.addChild(iconPosition);
        const [wager, wagerState] = this.get('wager', () => _rendering_1.GraphicUtils.createText(ui_1.default.erc20(pari.wager), this.wagerStyle.offset, this.wagerStyle.text));
        if (wagerState.new)
            content.addChild(wager);
        wager.text = ui_1.default.erc20(pari.wager);
        const emptypool = this.isNoContestEmptyPool(pool);
        if (!undef) {
            const [payoutContainer, payoutContainerState] = this.get('payoutContainer', () => new pixi_1.Graphics());
            if (payoutContainerState.new) {
                payoutContainer.position.set(bgwidth - this.payoutContainerStyle.offset[0], this.payoutContainerStyle.offset[1]);
                content.addChild(payoutContainer);
            }
            const [profitContainer, profitContainerState] = this.get('profitContainer', () => new pixi_1.Graphics());
            if (profitContainerState.new) {
                profitContainer.position.set(bgwidth - this.profitContainerStyle.offset[0], this.profitContainerStyle.offset[1]);
                content.addChild(profitContainer);
            }
            const [prize] = this.get('prize', () => _rendering_1.GraphicUtils.createText(0, this.prizeStyle.offset, this.prizeStyle.text, this.prizeStyle.anchor));
            if (win && !emptypool) {
                const [prizeAmount] = this.get('prizeAmount', () => {
                    if (pari.claimed) {
                        return ui_1.default.erc20(pari.payout);
                    }
                    else if (emptypool) {
                        return ui_1.default.erc20(pari.wager);
                    }
                    else {
                        return ui_1.default.erc20((0, calc_utils_1.actualReturn)(pool.prizefunds, pari.wager, pari.position));
                    }
                }, [pari.wager, pari.position, pari.claimed, pool.prizefunds[_constants_1.PRIZEFUNDS.TOTAL], nocontest, emptypool]);
                prize.text = prizeAmount;
                prize.style.fill = this.prizeStyle.winFill;
                const [percent] = this.get('percent', () => ui_1.default.percent((0, calc_utils_1.profitPercent)(prizeAmount, pari.wager)), [prizeAmount, pari.wager]);
                const [profit] = this.get('profit', () => _rendering_1.GraphicUtils.createText(percent, this.profitStyle.offset, this.profitStyle.text, this.profitStyle.anchor));
                profit.text = percent;
                const [profitBlock, profitBlockState] = this.get('profitBlock', () => this.createProfitBlock(profit), [profit.width]);
                if (profitBlockState.new)
                    profitContainer.addChild(profitBlock);
            }
            else {
                this.clear('profitBlock');
                let payout = 0;
                if (pari.claimed) {
                    prize.style.fill = this.prizeStyle.winFill;
                    payout = ui_1.default.erc20(pari.payout);
                }
                else if (nocontest || emptypool) {
                    prize.style.fill = this.prizeStyle.winFill;
                    payout = ui_1.default.erc20(pari.wager);
                }
                else {
                    prize.style.fill = this.prizeStyle.loseFill;
                }
                prize.text = payout;
            }
            const [levelCurrency] = this.get('levelCurrency', () => this.createLevelCurrency(context));
            const [currency, currencyState] = this.get('currency', () => this.createPariCurrencyIcon(context));
            if (currencyState.new)
                levelCurrency.addChild(currency);
            const [payout, payoutState] = this.get('payout', () => this.createPayout(prize), [prize.width]);
            if (payoutState.new) {
                payout.addChild(levelCurrency);
                payoutContainer.addChild(payout);
            }
        }
        if (isHistorical) {
            const [claimable] = this.get('claimable', () => !pari.claimed && (win || nocontest), [nocontest, win, pari.claimed]);
            if (win) {
                this.animate('background', 'won_bg');
                if (!claimable)
                    this.animate('content', 'unclaimable_contnet');
            }
            else {
                this.animate('background', 'lost_bg');
                if (!claimable)
                    this.animate('content', 'lost_contnet');
            }
            if (claimable) {
                if (groupstate.animation !== 'pin_group_claimable')
                    this.animate('group', 'hide_group_claimable');
            }
            else {
                if (groupstate.animation !== 'pin_group_unclaimable')
                    this.animate('group', 'unpin_group_unclaimable');
            }
            if (claimable) {
                const [resolved] = this.get('resolved', () => pool.resolved, [pool.resolved]);
                const [settlement] = this.get('settlement', () => { var _a; return (_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.endDate]; }, [(_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.endDate]]);
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
                        this.animate('claim', 'hover_claim');
                        context.eventTarget.dispatchEvent(new _events_1.PoolHoverEvent(poolid, e));
                    });
                    claim.addEventListener('pointerout', (e) => {
                        this.rebind(poolid, pariid);
                        this.animate('claim', 'unhover_claim');
                        context.eventTarget.dispatchEvent(new _events_1.PoolUnhoverEvent(poolid, e));
                    });
                    claim.addEventListener('pointertap', (e) => {
                        this.rebind(poolid, pariid);
                        this.animate('claim', 'tab_claim');
                        const [rslvd] = this.read('resolved');
                        const [sttlmnt] = this.read('settlement');
                        if (rslvd) {
                            context.eventTarget.dispatchEvent(new _events_1.WithdrawEvent(poolid, pariid, erc20, e));
                        }
                        if (!rslvd && sttlmnt) {
                            context.eventTarget.dispatchEvent(new _events_2.ResolveWithdrawEvent(poolid, pariid, erc20, sttlmnt.resolutionPrice, sttlmnt.controlPrice, e));
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
                context.eventTarget.addEventListener('poolpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [claim] = this.read('claim');
                    if (claim)
                        claim.interactive = true;
                    const [clble] = this.read('claimable');
                    if (clble)
                        this.animate('group', 'pin_group_claimable');
                    else
                        this.animate('group', 'pin_group_unclaimable');
                });
                context.eventTarget.addEventListener('poolunpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [claim] = this.read('claim');
                    if (claim)
                        claim.interactive = false;
                    const [clble] = this.read('claimable');
                    if (clble)
                        this.animate('group', 'unpin_group_claimable');
                    else
                        this.animate('group', 'unpin_group_unclaimable');
                });
            }
        }
        else {
            if (win && !emptypool) {
                this.animate('background', 'winning_bg');
                this.animate('group', 'winning_group');
            }
            else {
                this.animate('background', 'loseing_bg');
                this.animate('group', 'loseing_group');
            }
        }
        const [propagatingBackground, propagatingBackgroundState] = this.get('propagatingBackground', () => this.createPropagatingBackground());
        if (propagatingBackgroundState.new)
            contentContainer.addChild(propagatingBackground);
        const propagating = _rendering_1.EntityUtils.isEntityPropagating(context, pariid, pari.block);
        if (propagating) {
            this.animate('propagatingBackground', 'show_propagating_bg');
        }
        else {
            this.animate('propagatingBackground', 'hide_propagating_bg');
        }
    }
    getPositionIconTextureName(position) {
        switch (position) {
            case _enums_1.EPosition.Up:
                return textures_1.UP_ICON_TEXTURE;
            case _enums_1.EPosition.Down:
                return textures_1.DOWN_ICON_TEXTURE;
            case _enums_1.EPosition.Zero:
                return textures_1.ZERO_ICON_TEXTURE;
            default:
                _infra_1.Logger.error(`pari position "${position}" is not supported, fallback to Undeliden`);
                return textures_1.UNDEFINED_ICON_TEXTURE;
        }
    }
    getPariCurrencyIconTextureName(context, theme = 'DARK') {
        var _a;
        const key = [(_a = context.metapool) === null || _a === void 0 ? void 0 : _a.currency, theme].join('_');
        switch (key) {
            case 'ETH_DARK':
                return textures_1.ETH_DARK_TEXTURE;
            case 'USDT_DARK':
                return textures_1.USDT_DARK_TEXTURE;
            case 'USDC_DARK':
                return textures_1.USDC_DARK_TEXTURE;
            default:
                _infra_1.Logger.error(`currency "${key}" is not supported, fallback to Undeliden`);
                return textures_1.UNKNOWN_DARK_TEXTURE;
        }
    }
    createPositionIcon(context, position) {
        const textureName = this.getPositionIconTextureName(position);
        const texture = context.textures.get(textureName);
        const icon = new pixi_1.Sprite(texture);
        icon.scale.set(this.iconPositionStyle.size / icon.height);
        icon.position.set(...this.iconPositionStyle.offset);
        return icon;
    }
    createPariCurrencyIcon(context) {
        const textureName = this.getPariCurrencyIconTextureName(context);
        const texture = context.textures.get(textureName);
        const icon = new pixi_1.Sprite(texture);
        icon.scale.set(this.iconCurrencyStyle.size / icon.height);
        icon.position.set(...this.iconCurrencyStyle.offset);
        return icon;
    }
    createLevelCurrency(context) {
        const levelCurrency = new pixi_1.Graphics();
        const textureName = this.getLevelTextureName(context);
        const diagonal = 2 * this.levelCurrencyStyle.radius;
        const texture = context.textures.get(textureName, { height: diagonal, width: diagonal });
        const pozx = this.levelCurrencyStyle.radius + this.levelCurrencyStyle.offset[0];
        const pozy = this.levelCurrencyStyle.radius + this.levelCurrencyStyle.offset[1];
        levelCurrency
            .beginTextureFill({ texture })
            .drawCircle(pozx, pozy, this.levelCurrencyStyle.radius)
            .endFill();
        return levelCurrency;
    }
    createPayout(prize) {
        const payout = new pixi_1.Graphics();
        const width = this.payoutStyle.width + prize.width;
        const height = this.payoutStyle.height;
        payout
            .beginFill(this.payoutStyle.fill)
            .drawRect(0, 0, width, height)
            .endFill();
        payout.pivot.x = width;
        prize.x = width + this.prizeStyle.offset[0];
        payout.addChild(prize);
        return payout;
    }
    createProfitBlock(profit) {
        const block = new pixi_1.Graphics();
        const width = this.profitBlockStyle.width + profit.width;
        const height = this.profitBlockStyle.height;
        block
            .beginFill(this.profitBlockStyle.fill)
            .drawRect(0, 0, width, height)
            .endFill();
        block.pivot.x = width;
        profit.x = width + this.profitStyle.offset[0];
        block.addChild(profit);
        return block;
    }
    createContentContainer(position) {
        const { width, height, background: { offset: [ofx, ofy], lineStyle, radiuses, } } = this.groupStyle[position];
        const container = new pixi_1.Container();
        const mask = _rendering_1.GraphicUtils.createRoundedRect([ofx, ofy], [width, height], radiuses, { lineStyle });
        container.addChild(mask);
        container.mask = mask;
        return container;
    }
    createBackground(style, context) {
        const { width, height, background: { offset: [ofx, ofy], lineStyle, radiuses, color, shadow: { points, colorStops } } } = style;
        let background = _rendering_1.GraphicUtils.createRoundedRect([ofx, ofy], [width, height], radiuses, { color, lineStyle });
        const texture = context.textures.get(textures_1.GRADIENT_TEXTURE, {
            width: width + lineStyle.width * 2,
            height: height + lineStyle.width * 2,
            points,
            colorStops
        });
        background = _rendering_1.GraphicUtils.createRoundedRect([ofx - lineStyle.width, ofy - lineStyle.width / 2], [width + lineStyle.width + lineStyle.width / 2, height + lineStyle.width], radiuses, { texture }, background);
        background.alpha = 0;
        return background;
    }
    createPropagatingBackground() {
        const [propagatingBackground, propagatingBackgroundState] = this.get('propagatingBackground', () => _rendering_1.GraphicUtils.createPropagationBackground({
            height: 310,
            lineHeight: 18,
            width: 300,
            colors: [{ color: 0xffffff, alpha: 1 }],
            duration: 1,
        }));
        if (propagatingBackgroundState.new) {
            propagatingBackground.rotation = 3 * Math.PI / 4;
            propagatingBackground.pivot.x = 150;
            propagatingBackground.pivot.y = 155;
            propagatingBackground.position.set(150, 50);
            propagatingBackground.alpha = 0;
        }
        return propagatingBackground;
    }
    getStateBackgroundAlpha({ winning, loseing, undef, phantom }) {
        if (winning)
            return this.stateBackgroundAlphaStyle.winning;
        if (loseing)
            return this.stateBackgroundAlphaStyle.loseing;
        if (phantom)
            return this.stateBackgroundAlphaStyle.phantom;
        if (undef)
            return this.stateBackgroundAlphaStyle.undef;
        return 0;
    }
    getContentAlpha({ loseing, undef, phantom }) {
        if (loseing)
            return this.stateBackgroundAlphaStyle.loseing;
        if (phantom)
            return this.stateBackgroundAlphaStyle.phantom;
        if (undef)
            return this.stateBackgroundAlphaStyle.undef;
        return 1;
    }
}
exports.PariTile = PariTile;
PariTile.PARI_TILE_ID = Symbol('PARI_TILE_ID');
//# sourceMappingURL=PariTile.js.map