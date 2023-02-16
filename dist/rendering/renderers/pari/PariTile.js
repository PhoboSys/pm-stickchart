"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariTile = void 0;
const _constants_1 = require("../../../constants/index.js");
const _rendering_1 = require("../../index.js");
const textures_1 = require("../../textures");
const textures_2 = require("../../textures");
const _infra_1 = require("../../../infra/index.js");
const datamath_1 = __importDefault(require("../../../lib/datamath"));
const pixi_1 = require("../../../lib/pixi");
const ui_1 = __importDefault(require("../../../lib/ui"));
const calc_utils_1 = require("../../../lib/calc-utils");
const utils_1 = require("../../../lib/utils");
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
                height: 114,
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
                height: 114,
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
                height: 114,
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
        this.payoutContainerStyle = {
            offset: [16, 68],
        };
        this.prizeStyle = {
            text: {
                fill: 0x00A573,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 16,
            },
            offset: [-7, 6],
            anchor: [1, 0]
        };
        this.payoutStyle = {
            height: 30,
            width: 42,
        };
        this.profitContainerStyle = {
            offset: [8, 62],
        };
        this.profitStyle = {
            text: {
                fill: 0x212233,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 12,
            },
            offset: [-2, -1],
            anchor: [1, 0]
        };
        this.profitBlockStyle = {
            height: 12,
            width: 6,
            offset: [0, 2],
        };
        this.timeingLinesStyle = {
            offset: [16, 55],
        };
        this.iconPositionStyle = {
            size: 30,
            offset: [16, 68]
        };
        this.iconPariTitleStyle = {
            size: 30,
            offset: [16, 16]
        };
        this.levelCurrencyStyle = {
            radius: 10,
            offset: [7, 6]
        };
        this.iconCurrencyStyle = {
            size: 16,
            offset: [12, 8]
        };
        this.wagerStyle = {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 400,
                fontFamily: 'Gilroy',
                fontSize: 16,
            },
            offset: [60, 74]
        };
        this.titlePariStyle = {
            text: {
                fill: 0xB7BDD7,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 16,
            },
            offset: [60, 21]
        };
        this.validPariPositions = {
            [_enums_1.EPosition.Up]: _enums_1.EPosition.Up,
            [_enums_1.EPosition.Down]: _enums_1.EPosition.Down,
            [_enums_1.EPosition.Zero]: _enums_1.EPosition.Zero,
        };
        this.configAnimations = {
            propagating_bg: {
                pixi: {
                    alpha: 0.03,
                },
                duration: 0.3,
                ease: 'power2.out',
            },
            unpropagating_bg: {
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
        const win = pari.position === resolution;
        const nocontest = resolution === _enums_1.EPosition.NoContest;
        const undef = resolution === _enums_1.EPosition.Undefined;
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
        const [contentContainer, contentContainerState] = this.get('contentContainer', () => this.createContentContainer(position));
        if (contentContainerState.new)
            group.addChild(contentContainer);
        const [background, backgroundState] = this.get('background', () => this.createBackground(position, context));
        if (backgroundState.new)
            contentContainer.addChild(background);
        const [content, contentState] = this.get('content', () => new pixi_1.Container());
        if (contentState.new)
            contentContainer.addChild(content);
        const [iconPariTitle, iconPariTitleState] = this.get('iconPariTitle', () => this.createPariTitleIcon(context));
        if (iconPariTitleState.new)
            content.addChild(iconPariTitle);
        const [iconPosition, iconPositionState] = this.get('iconPosition', () => this.createPositionIcon(context, position));
        if (iconPositionState.new)
            content.addChild(iconPosition);
        if (this.isHistoricalPool(pool, context)) {
            this.clear('timeingLines');
            const [historicalTimeingLine, historicalTimeingLineState] = this.get('historicalTimeingLine', () => new pixi_1.Graphics());
            if (historicalTimeingLineState.new) {
                historicalTimeingLine
                    .beginFill(0x474c67)
                    .drawRect(0, 2, bgwidth - 2 * this.timeingLinesStyle.offset[0], 1)
                    .endFill();
                historicalTimeingLine.position.set(...this.timeingLinesStyle.offset);
                content.addChild(historicalTimeingLine);
            }
        }
        else {
            const [timeingLines, timeingLinesState] = this.get('timeingLines', () => this.createTimeingLines(context, pool, { width: bgwidth - 2 * this.timeingLinesStyle.offset[0], height: 5 }));
            if (timeingLinesState.new) {
                timeingLines.position.set(...this.timeingLinesStyle.offset);
                content.addChild(timeingLines);
            }
        }
        const [wager, wagerState] = this.get('wager', () => _rendering_1.GraphicUtils.createText(ui_1.default.erc20(pari.wager), this.wagerStyle.offset, this.wagerStyle.text));
        if (wagerState.new)
            content.addChild(wager);
        wager.text = ui_1.default.erc20(pari.wager);
        const [titlePari, titlePariState] = this.get('titlePari', () => _rendering_1.GraphicUtils.createText(context.metapool.name, this.titlePariStyle.offset, this.titlePariStyle.text));
        if (titlePariState.new)
            content.addChild(titlePari);
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
                const [percent] = this.get('percent', () => ui_1.default.percent((0, calc_utils_1.profitPercent)(prizeAmount, pari.wager)), [prizeAmount, pari.wager]);
                const [profit] = this.get('profit', () => _rendering_1.GraphicUtils.createText(percent, this.profitStyle.offset, this.profitStyle.text, this.profitStyle.anchor));
                profit.text = percent;
                const [profitBlock, profitBlockState] = this.get('profitBlock', () => this.createProfitBlock(profit), [profit.width]);
                if (profitBlockState.new)
                    profitContainer.addChild(profitBlock);
            }
            else {
                this.clear('profitBlock');
                if (pari.claimed)
                    prize.text = ui_1.default.erc20(pari.payout);
                else
                    prize.text = nocontest || emptypool ? ui_1.default.erc20(pari.wager) : 0;
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
        if (this.isHistoricalPool(pool, context)) {
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
            contentContainer.addChild(propagatingBackground);
        }
        const propagating = _rendering_1.EntityUtils.isEntityPropagating(context, pariid);
        if (propagating) {
            this.animate('propagatingBackground', 'propagating_bg');
        }
        else {
            this.animate('propagatingBackground', 'unpropagating_bg');
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
    getPariTitleIconTextureName(currency) {
        switch (currency) {
            case 'AUD':
                return textures_2.AUD_TEXTURE;
            case 'CAD':
                return textures_2.CAD_TEXTURE;
            case 'CHF':
                return textures_2.CHF_TEXTURE;
            case 'JPY':
                return textures_2.JPY_TEXTURE;
            case 'USD':
                return textures_2.USD_TEXTURE;
            case 'ETH':
                return textures_2.ETH_TEXTURE;
            case 'BTC':
                return textures_2.BTC_TEXTURE;
            case 'SOL':
                return textures_2.SOL_TEXTURE;
            case 'MATIC':
                return textures_2.MATIC_TEXTURE;
            case 'BNB':
                return textures_2.BNB_TEXTURE;
            default:
                _infra_1.Logger.error(`currency "${currency}" is not supported, fallback to Undeliden`);
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
    createPariTitleIcon(context) {
        const textureName = this.getPariTitleIconTextureName(context.metapool.base);
        const texture = context.textures.get(textureName);
        const icon = new pixi_1.Sprite(texture);
        icon.scale.set(this.iconPariTitleStyle.size / icon.height);
        icon.position.set(...this.iconPariTitleStyle.offset);
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
            .beginFill(0x212233)
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
            .beginFill(0x00a573)
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
    createBackground(position, context) {
        const { width, height, background: { offset: [ofx, ofy], lineStyle, radiuses, color, shadow: { points, colorStops } } } = this.groupStyle[position];
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
    createTimeingLines(context, pool, { width, height }) {
        const container = new pixi_1.Container();
        const timeNow = (0, utils_1.nowUnixTS)();
        const fullTime = pool.endDate - pool.startDate;
        const timeToLock = Math.max(pool.lockDate - timeNow, 0);
        const timeFromLockToEnd = Math.min(pool.endDate - pool.lockDate, pool.endDate - timeNow);
        const radiuses = [height / 2, height / 2, height / 2, height / 2];
        const mask = _rendering_1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses);
        container.mask = mask;
        container.addChild(mask);
        const active = _rendering_1.GraphicUtils.createPropagationBackground({
            height: 310,
            lineHeight: 18,
            width: 300,
            colors: [
                { color: 0xffffff, alpha: 0.3 },
                { color: 0xffffff, alpha: 0.6 }
            ],
            duration: 1,
        });
        active.rotation = 3 * Math.PI / 4;
        active.pivot.x = 150;
        active.pivot.y = 155;
        active.position.set(150, 50);
        active.alpha = 0.1;
        container.addChild(active);
        const widthToLock = (timeToLock / fullTime) * width;
        const widthToEnd = (timeFromLockToEnd / fullTime) * width;
        let toEnd = _rendering_1.GraphicUtils.createRoundedRect([0, 0], [widthToEnd, height], radiuses, { color: 0x00A573 });
        toEnd.pivot.x = widthToEnd;
        toEnd.pivot.y = height / 2;
        toEnd.position.set(width, height / 2);
        const endTexture = context.textures.get(textures_1.GRADIENT_TEXTURE, {
            width: widthToEnd,
            height,
            points: [0, 0, widthToEnd, 0],
            colorStops: [
                { color: '#007397', offset: 0 },
                { color: '#009797', offset: 1 },
            ]
        });
        toEnd = _rendering_1.GraphicUtils.createRoundedRect([0, 0], [widthToEnd, height], radiuses, { texture: endTexture }, toEnd);
        container.addChild(toEnd);
        if (timeToLock !== 0) {
            let toLock = _rendering_1.GraphicUtils.createRoundedRect([0, 0], [widthToLock, height], radiuses, { color: 0xF05350 });
            toLock.pivot.x = widthToLock;
            toLock.pivot.y = height / 2;
            toLock.position.set(width - widthToEnd, height / 2);
            const lockTexture = context.textures.get(textures_1.GRADIENT_TEXTURE, {
                width: widthToLock,
                height,
                points: [0, 0, widthToLock, 0],
                colorStops: [
                    { color: '#FFA000', offset: 0 },
                    { color: '#FFC700', offset: 1 },
                ]
            });
            toLock = _rendering_1.GraphicUtils.createRoundedRect([0, 0], [widthToLock, height], radiuses, { texture: lockTexture }, toLock);
            container.addChild(toLock);
            pixi_1.gsap.to(toLock, {
                pixi: { width: 0 },
                duration: timeToLock,
                ease: 'power0',
                onComplete: () => {
                    pixi_1.gsap.to(toEnd, {
                        pixi: { width: 0 },
                        duration: timeFromLockToEnd,
                        ease: 'power0',
                    });
                }
            });
        }
        else {
            pixi_1.gsap.to(toEnd, {
                pixi: { width: 0 },
                duration: timeFromLockToEnd,
                ease: 'power0',
            });
        }
        return container;
    }
}
exports.PariTile = PariTile;
PariTile.PARI_TILE_ID = Symbol('PARI_TILE_ID');
//# sourceMappingURL=PariTile.js.map