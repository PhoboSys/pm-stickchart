"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariTile = void 0;
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
const _events_3 = require("../../../events/index.js");
const _enums_1 = require("../../../enums/index.js");
const BaseParisRenderer_1 = require("./BaseParisRenderer");
class PariTile extends BaseParisRenderer_1.BaseParisRenderer {
    constructor() {
        super(...arguments);
        this.groupStyle = {
            [_enums_1.EPosition.Up]: {
                offset: [0, 40],
            },
            [_enums_1.EPosition.Down]: {
                offset: [0, -134 - 62],
            },
            [_enums_1.EPosition.Zero]: {
                offset: [0, 14],
            }
        };
        this.contentStyle = {
            offset: [14, 13],
        };
        this.wagerContainerStyles = {
            [_enums_1.EPosition.Up]: {
                offset: [24, 0],
                background: {
                    width: 170,
                    height: 56,
                    radiuses: [27, 27, 27, 27],
                    color: 0x01A37A,
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                    },
                },
            },
            [_enums_1.EPosition.Zero]: {
                offset: [-24, 0],
                background: {
                    width: 170,
                    height: 56,
                    anchor: [-1, 0],
                    radiuses: [27, 27, 27, 27],
                    color: 0xB7BDD7,
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                    },
                },
            },
            [_enums_1.EPosition.Down]: {
                offset: [24, 0],
                background: {
                    width: 170,
                    height: 56,
                    radiuses: [27, 27, 27, 27],
                    color: 0xD7335B,
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                    },
                },
            },
        };
        this.wagerTextStyle = {
            [_enums_1.EPosition.Up]: {
                text: {
                    fill: 0xFFFFFFB3,
                    fontWeight: 600,
                    fontFamily: 'Proxima Nova',
                    fontSize: 13,
                },
                offset: [48, 0]
            },
            [_enums_1.EPosition.Zero]: {
                text: {
                    fill: 0x071226B3,
                    fontWeight: 600,
                    fontFamily: 'Proxima Nova',
                    fontSize: 13,
                },
                offset: [48, 0]
            },
            [_enums_1.EPosition.Down]: {
                text: {
                    fill: 0xFFFFFFB3,
                    fontWeight: 600,
                    fontFamily: 'Proxima Nova',
                    fontSize: 13,
                },
                offset: [48, 0]
            },
        };
        this.wagerStyle = {
            [_enums_1.EPosition.Up]: {
                text: {
                    fill: 0xFFFFFF,
                    fontWeight: 500,
                    fontFamily: 'Roboto',
                    fontSize: 15,
                },
                offset: [48, 16]
            },
            [_enums_1.EPosition.Zero]: {
                text: {
                    fill: 0x071226,
                    fontWeight: 500,
                    fontFamily: 'Roboto',
                    fontSize: 15,
                },
                offset: [48, 16]
            },
            [_enums_1.EPosition.Down]: {
                text: {
                    fill: 0xFFFFFF,
                    fontWeight: 500,
                    fontFamily: 'Roboto',
                    fontSize: 15,
                },
                offset: [48, 16]
            },
        };
        this.profitContainerStyle = {
            [_enums_1.EPosition.Up]: {
                default: {
                    offset: [-24, 0],
                    background: {
                        width: 170,
                        height: 56,
                        anchor: [-1, 0],
                        radiuses: [27, 27, 27, 27],
                        color: 0xD66F35,
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                        },
                    },
                },
                claimable: {
                    offset: [-24, -(108 - 56) / 2],
                    background: {
                        width: 170,
                        height: 108,
                        anchor: [-1, 0],
                        radiuses: [22, 22, 22, 22],
                        color: 0xD66F35,
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                        },
                    },
                }
            },
            [_enums_1.EPosition.Down]: {
                default: {
                    offset: [-24, 0],
                    background: {
                        width: 170,
                        height: 56,
                        anchor: [-1, 0],
                        radiuses: [27, 27, 27, 27],
                        color: 0xD66F35,
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                        },
                    },
                },
                claimable: {
                    offset: [-24, -(108 - 56)],
                    background: {
                        width: 170,
                        height: 108,
                        anchor: [-1, 0],
                        radiuses: [22, 22, 22, 22],
                        color: 0xD66F35,
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                        },
                    },
                }
            },
            [_enums_1.EPosition.Zero]: {
                default: {
                    offset: [-137 - 24 - 8, 0],
                    background: {
                        width: 170,
                        height: 56,
                        anchor: [-1, 0],
                        radiuses: [27, 27, 27, 27],
                        color: 0xD66F35,
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                        },
                    },
                },
                claimable: {
                    offset: [-170 - 24 - 8, -(108 - 56) / 2],
                    background: {
                        width: 170,
                        height: 108,
                        anchor: [-1, 0],
                        radiuses: [22, 22, 22, 22],
                        color: 0xD66F35,
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                        },
                    },
                }
            },
        };
        this.profitTextStyle = {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Proxima Nova',
                fontSize: 12,
            },
            offset: [44 + 0, 0]
        };
        this.percentStyle = {
            text: {
                fill: 0xFFFFFFBF,
                fontWeight: 400,
                fontFamily: 'Roboto',
                fontSize: 11,
            },
            offset: [44 + 35, 0],
        };
        this.payoutStyle = {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: 15,
            },
            offset: [44 + 0, 15]
        };
        this.claimStyle = {
            offset: [14, 60],
            background: {
                width: 142,
                height: 32,
                radiuses: [16, 16, 16, 16],
                color: 0xFFFFFF,
            },
        };
        this.claimTextStyle = {
            text: {
                fill: 0xD66F35,
                fontWeight: 700,
                fontFamily: 'Proxima Nova',
                fontSize: 15,
            },
            offset: [0, 0]
        };
        this.positionIconStyle = {
            size: 32,
            offset: [-16, (56 - 32) / 2],
        };
        this.iconStyle = {
            size: 32,
            offset: [0, 0],
            alpha: 0.75,
        };
        this.validPariPositions = {
            [_enums_1.EPosition.Up]: _enums_1.EPosition.Up,
            [_enums_1.EPosition.Down]: _enums_1.EPosition.Down,
            [_enums_1.EPosition.Zero]: _enums_1.EPosition.Zero,
        };
        this.configAnimations = {
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
            show_propagating_bg: {
                pixi: {
                    alpha: 0.15,
                    zIndex: 10,
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
        };
    }
    get rendererId() {
        return PariTile.PARI_TILE_ID;
    }
    get animations() {
        return this.configAnimations;
    }
    updatePari(pool, pari, context, container) {
        if (!context.features.pariTileNewDesign)
            return this.clear();
        if (!(pari.position in this.validPariPositions))
            return this.clear();
        const state = this.getPariState(pool, pari, context);
        this.updateGroup(pool, pari, context, container, state);
        if (!state.win && !state.nocontest && state.isHistorical)
            return;
        const [group] = this.read('group');
        const [positionIcon, positionIconState] = this.get('positionIcon', () => this.createIcon(context, this.getPositionIconTextureName(pari.position), this.positionIconStyle), []);
        if (positionIconState.new)
            group.addChild(positionIcon);
        this.updateWager(pool, pari, context, group, state);
        this.updateProfit(pool, pari, context, group, state);
        this.updateClaim(pool, pari, context, state);
    }
    updateGroup(pool, pari, context, container, state) {
        const poolid = pool.poolid;
        const pariid = pari.pariid;
        const position = pari.position;
        const { isHistorical, win, claimable, emptypool, nocontest } = state;
        if (!win && !nocontest && isHistorical) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.rebind(poolid, pariid);
                    this.clear();
                }
            });
            return;
        }
        const [ox] = datamath_1.default.scale([pool.openPriceTimestamp], context.plotdata.timerange, context.screen.width);
        const [oy] = datamath_1.default.scaleReverse([pool.openPriceValue], context.plotdata.pricerange, context.screen.height);
        let vertical = null;
        if (position === _enums_1.EPosition.Up)
            vertical = 0;
        if (position === _enums_1.EPosition.Zero)
            vertical = oy;
        if (position === _enums_1.EPosition.Down)
            vertical = context.screen.height;
        const bgStyle = this.groupStyle[position];
        const [ofx, ofy] = bgStyle.offset;
        const bgx = ox + ofx;
        const bgy = vertical + ofy;
        const [group, groupstate] = this.get('group', () => new pixi_1.Container(), []);
        if (groupstate.new) {
            container.sortableChildren = true;
            container.addChild(group);
            group.alpha = 0;
        }
        group.position.set(bgx, bgy);
        if (!isHistorical)
            group.zIndex = 10;
        if (isHistorical) {
            if (claimable) {
                if (groupstate.animation !== 'pin_group_claimable')
                    this.animate('group', 'hide_group_claimable');
            }
            else {
                if (groupstate.animation !== 'pin_group_unclaimable')
                    this.animate('group', 'unpin_group_unclaimable');
            }
            if (!groupstate.subscribed) {
                groupstate.subscribed = true;
                this.get('claimable', () => state.claimable, [state.claimable]);
                context.eventTarget.addEventListener('poolpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [claimable] = this.read('claimable');
                    if (claimable)
                        this.animate('group', 'pin_group_claimable');
                    else
                        this.animate('group', 'pin_group_unclaimable');
                });
                context.eventTarget.addEventListener('poolunpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [claimable] = this.read('claimable');
                    if (claimable)
                        this.animate('group', 'unpin_group_claimable');
                    else
                        this.animate('group', 'unpin_group_unclaimable');
                });
            }
        }
        else {
            if (win && !emptypool) {
                this.animate('group', 'winning_group');
            }
            else {
                this.animate('group', 'loseing_group');
            }
        }
    }
    updateProfit(pool, pari, context, container, state) {
        const { claimable, emptypool, nocontest, undef, win, phantom, propagating } = state;
        const [profit, profitState] = this.get('profit', () => {
            const styles = this.profitContainerStyle[pari.position];
            const style = claimable ? styles.claimable : styles.default;
            return this.createContainer(style);
        }, [claimable]);
        if (profitState.new) {
            container.addChild(profit);
            profit.sortableChildren = true;
        }
        profit.alpha = 0;
        const [profitcontent, profitcontentState] = this.get('profitcontent', () => this.createContainer(this.contentStyle));
        if (profitcontentState.new || profitState.new)
            profit.addChild(profitcontent);
        const [winIcon, winIconState] = this.get('winIcon', () => this.createIcon(context, textures_1.WIN_ICON_TEXTURE, this.iconStyle));
        if (winIconState.new)
            profitcontent.addChild(winIcon);
        if (!undef) {
            const [payout, payoutState] = this.get('payout', () => _rendering_1.GraphicUtils.createText(0, this.payoutStyle.offset, this.payoutStyle.text), []);
            if (payoutState.new)
                profitcontent.addChild(payout);
            if (win && !emptypool) {
                profit.alpha = 1;
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
                payout.text = prizeAmount;
                payout.position.set(...this.payoutStyle.offset);
                const [profitText, profitTextState] = this.get('profitText', () => _rendering_1.GraphicUtils.createText('Profit', this.profitTextStyle.offset, this.profitTextStyle.text), []);
                if (profitTextState.new)
                    profitcontent.addChild(profitText);
                profitText.alpha = 1;
                const [percentAmount] = this.get('percent', () => ui_1.default.percent((0, calc_utils_1.profitPercent)(prizeAmount, pari.wager)), [prizeAmount, pari.wager]);
                const [percentText, percentTextState] = this.get('percentText', () => _rendering_1.GraphicUtils.createText(percentAmount, this.percentStyle.offset, this.percentStyle.text), []);
                if (percentTextState.new)
                    profitcontent.addChild(percentText);
                percentText.alpha = 1;
                percentText.text = percentAmount;
            }
            else {
                const [profitText] = this.read('profitText');
                if (profitText)
                    profitText.alpha = 0;
                const [percentText] = this.read('percentText');
                if (percentText)
                    percentText.alpha = 0;
                let payoutAmount = 0;
                if (pari.claimed) {
                    profit.alpha = 1;
                    payoutAmount = ui_1.default.erc20(pari.payout);
                }
                else if ((nocontest || emptypool) && !phantom) {
                    profit.alpha = 1;
                    payoutAmount = ui_1.default.erc20(pari.wager);
                }
                else {
                    profit.alpha = 0;
                }
                const [ofx] = this.payoutStyle.offset;
                payout.text = payoutAmount;
                payout.position.set(ofx, (profitcontent.height - payout.height) / 2);
            }
        }
        const [profitpropagating, profitpropagatingState] = this.get('profitpropagating', () => {
            const styles = this.profitContainerStyle[pari.position];
            const style = claimable ? styles.claimable : styles.default;
            return this.createPropagatingBackground(style);
        }, [claimable]);
        if (profitpropagatingState.new || profitState.new)
            profit.addChild(profitpropagating);
        if (propagating) {
            this.animate('profitpropagating', 'show_propagating_bg');
        }
        else {
            this.animate('profitpropagating', 'hide_propagating_bg');
        }
    }
    updateClaim(pool, pari, context, state) {
        var _a;
        const { claimable, emptypool, isHistorical } = state;
        if (claimable) {
            const poolid = pool.poolid;
            const pariid = pari.pariid;
            const erc20 = pari.erc20;
            const [profit, profitState] = this.read('profit');
            const [claim, claimState] = this.get('claim', () => this.createClaim(), []);
            if (claimState.new || profitState.new)
                profit.addChild(claim);
            if (claimState.new) {
                this.get('resolved', () => pool.resolved, [pool.resolved]);
                this.get('settlement', () => { var _a; return (_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.endDate]; }, [(_a = context.settlements) === null || _a === void 0 ? void 0 : _a[pool.endDate]]);
                this.get('nocontest', () => state.nocontest, [state.nocontest]);
                claim.interactive = true;
                claim.cursor = 'pointer';
                claim.addEventListener('pointerover', (e) => {
                    this.rebind(poolid, pariid);
                    // this.animate('claim', 'hover_claim')
                    context.eventTarget.dispatchEvent(new _events_1.PoolHoverEvent(poolid, e));
                });
                claim.addEventListener('pointerout', (e) => {
                    this.rebind(poolid, pariid);
                    // this.animate('claim', 'unhover_claim')
                    context.eventTarget.dispatchEvent(new _events_1.PoolUnhoverEvent(poolid, e));
                });
                claim.addEventListener('pointertap', (e) => {
                    this.rebind(poolid, pariid);
                    // this.animate('claim', 'tab_claim')
                    const [rslvd] = this.read('resolved');
                    const [sttlmnt] = this.read('settlement');
                    const [nocontest] = this.read('nocontest');
                    if (rslvd) {
                        context.eventTarget.dispatchEvent(new _events_1.WithdrawEvent(poolid, pariid, erc20, e));
                    }
                    if (!rslvd) {
                        if (nocontest && emptypool) {
                            context.eventTarget.dispatchEvent(new _events_3.ResolveWithdrawNocontestEvent(poolid, pariid, erc20, e));
                        }
                        else if (sttlmnt) {
                            context.eventTarget.dispatchEvent(new _events_2.ResolveWithdrawEvent(poolid, pariid, erc20, sttlmnt.resolutionPrice, sttlmnt.controlPrice, e));
                        }
                    }
                });
            }
            if (isHistorical && !claimState.subscribed) {
                claimState.subscribed = true;
                context.eventTarget.addEventListener('poolpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [claim] = this.read('claim');
                    if (claim)
                        claim.interactive = true;
                });
                context.eventTarget.addEventListener('poolunpin', (e) => {
                    if (e.poolid !== poolid)
                        return;
                    this.rebind(poolid, pariid);
                    const [claim] = this.read('claim');
                    if (claim)
                        claim.interactive = false;
                });
            }
        }
        else {
            this.clear('claim');
            this.clear('resolved');
            this.clear('settlement');
            this.clear('nocontest');
        }
    }
    updateWager(pool, pari, context, container, state) {
        const { propagating } = state;
        const position = pari.position;
        const [wager, wagerState] = this.get('wager', () => this.createContainer(this.wagerContainerStyles[position]));
        if (wagerState.new)
            container.addChild(wager);
        const [wagercontent, wagercontentState] = this.get('wagercontent', () => this.createContainer(this.contentStyle));
        if (wagercontentState.new)
            wager.addChild(wagercontent);
        const [currency, currencyState] = this.get('currency', () => this.createIcon(context, this.getPariCurrencyIconTextureName(context), Object.assign(Object.assign({}, this.iconStyle), { tint: position === _enums_1.EPosition.Zero ? 0x071226 : undefined })));
        if (currencyState.new)
            wagercontent.addChild(currency);
        const [wagerText, wagerTextState] = this.get('wagerText', () => _rendering_1.GraphicUtils.createText('Wager', this.wagerTextStyle[position].offset, this.wagerTextStyle[position].text));
        if (wagerTextState.new)
            wagercontent.addChild(wagerText);
        const [wagerAmount, wagerAmountState] = this.get('wagerAmount', () => _rendering_1.GraphicUtils.createText(ui_1.default.erc20(pari.wager), this.wagerStyle[position].offset, this.wagerStyle[position].text));
        if (wagerAmountState.new)
            wagercontent.addChild(wagerAmount);
        wagerAmount.text = ui_1.default.erc20(pari.wager);
        const [wagerpropagating, wagerpropagatingState] = this.get('wagerpropagating', () => this.createPropagatingBackground(this.wagerContainerStyles[position]));
        if (wagerpropagatingState.new)
            wager.addChild(wagerpropagating);
        if (propagating) {
            this.animate('wagerpropagating', 'show_propagating_bg');
        }
        else {
            this.animate('wagerpropagating', 'hide_propagating_bg');
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
    getPariCurrencyIconTextureName(context) {
        var _a;
        const key = (_a = context.metapool) === null || _a === void 0 ? void 0 : _a.currency;
        switch (key) {
            case 'PARI':
                return textures_1.PARI_TEXTURE;
            case 'USDC':
                return textures_1.USDC_TEXTURE;
            default:
                _infra_1.Logger.error(`currency "${key}" is not supported, fallback to Undeliden`);
                return textures_1.UNKNOWN_DARK_TEXTURE;
        }
    }
    createIcon(context, textureName, style) {
        const { size, offset, tint, alpha } = style;
        const texture = context.textures.get(textureName);
        const icon = new pixi_1.Sprite(texture);
        icon.scale.set(size / icon.height);
        icon.position.set(...offset);
        if (tint)
            icon.tint = tint;
        if (alpha)
            icon.alpha = alpha;
        return icon;
    }
    createContainer(style) {
        let { offset: [ofx, ofy] } = style;
        const { background: backgroundStyle } = style;
        const container = new pixi_1.Container();
        if (backgroundStyle) {
            const { width, height, anchor, lineStyle, radiuses, color, } = backgroundStyle;
            const background = _rendering_1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { color, lineStyle });
            container.addChild(background);
            if (anchor) {
                const [ax, ay] = anchor;
                ofx = ax * width + ofx;
                ofy = ay * height + ofy;
            }
        }
        container.position.set(ofx, ofy);
        return container;
    }
    createClaim() {
        const container = this.createContainer(this.claimStyle);
        const text = _rendering_1.GraphicUtils.createText('Withdraw', this.claimTextStyle.offset, this.claimTextStyle.text);
        container.addChild(text);
        text.position.set((container.width - text.width) / 2, (container.height - text.height) / 2);
        return container;
    }
    createPropagatingBackground(style) {
        const container = new pixi_1.Container();
        const propagatingBackground = _rendering_1.GraphicUtils.createPropagationBackground({
            height: 310,
            lineHeight: 18,
            width: 300,
            colors: [{ color: 0xffffff, alpha: 1 }],
            duration: 1,
        });
        const mask = this.createContainer(style);
        mask.position.set(0, 0);
        container.addChild(propagatingBackground);
        container.mask = mask;
        container.addChild(mask);
        propagatingBackground.rotation = 3 * Math.PI / 4;
        propagatingBackground.pivot.x = 150;
        propagatingBackground.pivot.y = 155;
        propagatingBackground.position.set(150, 50);
        container.alpha = 0;
        return container;
    }
}
exports.PariTile = PariTile;
PariTile.PARI_TILE_ID = Symbol('PARI_TILE_ID');
//# sourceMappingURL=PariTile.js.map