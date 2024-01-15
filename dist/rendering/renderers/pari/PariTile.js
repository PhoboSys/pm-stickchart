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
const GroupElement_1 = require("../../elements/GroupElement");
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
        this.wagerContainerStyles = {
            [_enums_1.EPosition.Up]: {
                width: 137,
                height: 56,
                offset: [24, 0],
                background: {
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
                width: 137,
                height: 56,
                offset: [-137 - 24, 0],
                background: {
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
                width: 137,
                height: 56,
                offset: [24, 0],
                background: {
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
        this.profitTextStyle = {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Proxima Nova',
                fontSize: 12,
            },
            offset: [44 + 0, 0]
        };
        this.wagerTextStyle = {
            [_enums_1.EPosition.Up]: {
                text: {
                    fill: 0xFFFFFFB3,
                    fontWeight: 600,
                    fontFamily: 'Proxima Nova',
                    fontSize: 13,
                },
                offset: [24, 8]
            },
            [_enums_1.EPosition.Zero]: {
                text: {
                    fill: 0x071226B3,
                    fontWeight: 600,
                    fontFamily: 'Proxima Nova',
                    fontSize: 13,
                },
                offset: [24, 8]
            },
            [_enums_1.EPosition.Down]: {
                text: {
                    fill: 0xFFFFFFB3,
                    fontWeight: 600,
                    fontFamily: 'Proxima Nova',
                    fontSize: 13,
                },
                offset: [24, 8]
            },
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
        this.profitContainerStyles = {
            [_enums_1.EPosition.Up]: {
                default: {
                    width: 162,
                    height: 56,
                    offset: [-162 - 24, 0],
                    background: {
                        radiuses: [27, 27, 27, 27],
                        color: 0xDD8F19,
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                        },
                    },
                },
                claimable: {
                    width: 162,
                    height: 108,
                    offset: [-162 - 24, -(108 - 56) / 2],
                    background: {
                        radiuses: [22, 22, 22, 22],
                        color: 0xDD8F19,
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
                    width: 162,
                    height: 56,
                    offset: [-162 - 24, 0],
                    background: {
                        radiuses: [27, 27, 27, 27],
                        color: 0xDD8F19,
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                        },
                    },
                },
                claimable: {
                    width: 162,
                    height: 108,
                    offset: [-162 - 24, -(108 - 56) / 2],
                    background: {
                        radiuses: [22, 22, 22, 22],
                        color: 0xDD8F19,
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
                    width: 162,
                    height: 56,
                    offset: [-137 - 24 - 162 - 8, 0],
                    background: {
                        radiuses: [27, 27, 27, 27],
                        color: 0xDD8F19,
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                        },
                    },
                },
                claimable: {
                    width: 162,
                    height: 108,
                    offset: [-137 - 24 - 162 - 8, -(108 - 56) / 2],
                    background: {
                        radiuses: [22, 22, 22, 22],
                        color: 0xDD8F19,
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                        },
                    },
                }
            },
        };
        this.profitStyle = {
            offset: [14, 13],
        };
        this.claimStyle = {
            width: 134,
            height: 32,
            offset: [14, 60],
            background: {
                radiuses: [16, 16, 16, 16],
                color: 0xFFFFFF,
            },
        };
        this.claimTextStyle = {
            text: {
                fill: 0xDD8F19,
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
        this.currencyIconStyle = {
            size: 32,
            offset: [0, 0],
            alpha: 0.75,
        };
        this.wagerStyle = {
            [_enums_1.EPosition.Up]: {
                text: {
                    fill: 0xFFFFFF,
                    fontWeight: 500,
                    fontFamily: 'Roboto',
                    fontSize: 15,
                },
                offset: [24, 29]
            },
            [_enums_1.EPosition.Zero]: {
                text: {
                    fill: 0x071226,
                    fontWeight: 500,
                    fontFamily: 'Roboto',
                    fontSize: 15,
                },
                offset: [24, 29]
            },
            [_enums_1.EPosition.Down]: {
                text: {
                    fill: 0xFFFFFF,
                    fontWeight: 500,
                    fontFamily: 'Roboto',
                    fontSize: 15,
                },
                offset: [24, 29]
            },
        };
        this.validPariPositions = {
            [_enums_1.EPosition.Up]: _enums_1.EPosition.Up,
            [_enums_1.EPosition.Down]: _enums_1.EPosition.Down,
            [_enums_1.EPosition.Zero]: _enums_1.EPosition.Zero,
        };
        this.configAnimations = {
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
        if (!context.features.pariTileNewDesign)
            return this.clear();
        if (!(pari.position in this.validPariPositions))
            return this.clear();
        const state = this.getPariState(pool, pari, context);
        const [group] = this.renderGroup(pool, pari, context, container, state);
        if (!state.win && !state.nocontest && state.isHistorical)
            return;
        const [positionIcon, positionIconState] = this.get('positionIcon', () => this.createIcon(context, this.getPositionIconTextureName(pari.position), this.positionIconStyle), []);
        if (positionIconState.new)
            group.addChild(positionIcon);
        this.updateWager(pool, pari, context, group);
        this.updateProfit(pool, pari, context, group, state);
        this.updateClaim(pool, pari, context, state);
    }
    renderGroup(pool, pari, context, container, state) {
        const position = pari.position;
        const { isHistorical } = state;
        const [groupElement] = this.get('groupElement', () => new GroupElement_1.GroupElement(), []);
        const [group, groupstate] = groupElement.render(context, pool.poolid, state);
        if (group) {
            if (groupstate.new) {
                container.sortableChildren = true;
                container.addChild(group);
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
            if (!isHistorical)
                group.zIndex = 10;
            group.position.set(bgx, bgy);
        }
        return [group, groupstate];
    }
    updateProfit(pool, pari, context, container, state) {
        const { claimable, emptypool, nocontest, undef, win } = state;
        const [profitContainer, profitContainerState] = this.get('profitContainer', () => {
            const styles = this.profitContainerStyles[pari.position];
            const style = claimable ? styles.claimable : styles.default;
            return this.createContainer(style);
        }, [claimable]);
        if (profitContainerState.new)
            container.addChild(profitContainer);
        const [profit, profitState] = this.get('profit', () => this.createContainer(this.profitStyle), []);
        if (profitState.new || profitContainerState.new)
            profitContainer.addChild(profit);
        const [currency, currencyState] = this.get('currency', () => this.createIcon(context, this.getPariCurrencyIconTextureName(context), this.currencyIconStyle), []);
        if (currencyState.new)
            profit.addChild(currency);
        if (!undef) {
            const [payout, payoutState] = this.get('payout', () => _rendering_1.GraphicUtils.createText(0, this.payoutStyle.offset, this.payoutStyle.text), []);
            if (payoutState.new)
                profit.addChild(payout);
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
                payout.position.set(...this.payoutStyle.offset);
                payout.text = prizeAmount;
                const [profitText, profitTextState] = this.get('profitText', () => _rendering_1.GraphicUtils.createText('Profit', this.profitTextStyle.offset, this.profitTextStyle.text), []);
                if (profitTextState.new)
                    profit.addChild(profitText);
                const [percentAmount] = this.get('percent', () => ui_1.default.percent((0, calc_utils_1.profitPercent)(prizeAmount, pari.wager)), [prizeAmount, pari.wager]);
                const [percentText, percentTextState] = this.get('percentText', () => _rendering_1.GraphicUtils.createText(percentAmount, this.percentStyle.offset, this.percentStyle.text), []);
                if (percentTextState.new) {
                    profit.addChild(percentText);
                }
                percentText.text = percentAmount;
            }
            else {
                this.clear('profitText');
                this.clear('percentText');
                let payoutAmount = 0;
                if (pari.claimed) {
                    payoutAmount = ui_1.default.erc20(pari.payout);
                }
                else if (nocontest || emptypool) {
                    payoutAmount = ui_1.default.erc20(pari.wager);
                }
                const [ofx] = this.payoutStyle.offset;
                payout.position.set(ofx, (profit.height - payout.height) / 2);
                payout.text = payoutAmount;
            }
        }
    }
    updateClaim(pool, pari, context, state) {
        var _a;
        const { claimable, emptypool, isHistorical } = state;
        if (claimable) {
            const poolid = pool.poolid;
            const pariid = pari.pariid;
            const erc20 = pari.erc20;
            const [profitContainer, profitContainerState] = this.read('profitContainer');
            const [claim, claimState] = this.get('claim', () => this.createClaim(), []);
            if (claimState.new || profitContainerState.new)
                profitContainer.addChild(claim);
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
    updateWager(pool, pari, context, container) {
        const position = pari.position;
        const [wager, wagerState] = this.get('wager', () => this.createContainer(this.wagerContainerStyles[position]), [position]);
        if (wagerState.new)
            container.addChild(wager);
        const [wagerText, wagerTextState] = this.get('wagerText', () => _rendering_1.GraphicUtils.createText('Wager', this.wagerTextStyle[position].offset, this.wagerTextStyle[position].text), []);
        if (wagerTextState.new)
            wager.addChild(wagerText);
        const [wagerAmount, wagerAmountState] = this.get('wagerAmount', () => _rendering_1.GraphicUtils.createText(ui_1.default.erc20(pari.wager), this.wagerStyle[position].offset, this.wagerStyle[position].text), []);
        if (wagerAmountState.new)
            wager.addChild(wagerAmount);
        wagerAmount.text = ui_1.default.erc20(pari.wager);
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
        const { width, height, offset: [ofx, ofy], background: backgroundStyle } = style;
        const container = new pixi_1.Container();
        if (backgroundStyle) {
            const { lineStyle, radiuses, color, } = backgroundStyle;
            const background = _rendering_1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { color, lineStyle });
            container.addChild(background);
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
}
exports.PariTile = PariTile;
PariTile.PARI_TILE_ID = Symbol('PARI_TILE_ID');
//# sourceMappingURL=PariTile.js.map