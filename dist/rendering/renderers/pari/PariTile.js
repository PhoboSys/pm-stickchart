"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PariTile = void 0;
const merge_1 = __importDefault(require("lodash/merge"));
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
const GroupComponent_1 = require("../../components/GroupComponent");
const BaseParisRenderer_1 = require("./BaseParisRenderer");
class PariTile extends BaseParisRenderer_1.BaseParisRenderer {
    constructor() {
        super(...arguments);
        this.avatarResolvers = {};
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
            offset: [14, (58 - 32) / 2],
        };
        this.wagerContainerBaseStyles = {
            [_enums_1.EPosition.Up]: {
                offset: [24, 0],
                background: {
                    width: 170,
                    height: 58,
                    radiuses: [28, 28, 28, 28],
                    color: 0x01A37A,
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                        alignment: 0,
                    },
                },
            },
            [_enums_1.EPosition.Zero]: {
                offset: [-24, 0],
                background: {
                    width: 170,
                    height: 58,
                    anchor: [-1, 0],
                    radiuses: [28, 28, 28, 28],
                    color: 0xB7BDD7,
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                        alignment: 0,
                    },
                },
            },
            [_enums_1.EPosition.Down]: {
                offset: [24, 0],
                background: {
                    width: 170,
                    height: 58,
                    radiuses: [28, 28, 28, 28],
                    color: 0xD7335B,
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                        alignment: 0,
                    },
                },
            },
        };
        this.wagerOrphanContainerStyles = (0, merge_1.default)({}, this.wagerContainerBaseStyles, {
            [_enums_1.EPosition.Up]: {
                background: {
                    color: 0x081327,
                    lineStyle: {
                        color: 0xD32F2F,
                    },
                }
            },
            [_enums_1.EPosition.Zero]: {
                background: {
                    color: 0x081327,
                    lineStyle: {
                        color: 0xD32F2F,
                    },
                }
            },
            [_enums_1.EPosition.Down]: {
                background: {
                    color: 0x081327,
                    lineStyle: {
                        color: 0xD32F2F,
                    },
                }
            },
        });
        this.wagerContainerStyles = this.wagerContainerBaseStyles;
        this.wagerTextStyle = {
            [_enums_1.EPosition.Up]: {
                text: {
                    fill: 0xFFFFFFBF,
                    fontWeight: 600,
                    fontFamily: 'Proxima Nova',
                    fontSize: 13,
                    trim: true,
                },
                offset: [32 + 16, 0]
            },
            [_enums_1.EPosition.Zero]: {
                text: {
                    fill: 0x071226BF,
                    fontWeight: 600,
                    fontFamily: 'Proxima Nova',
                    fontSize: 13,
                    trim: true,
                },
                offset: [32 + 16, 0]
            },
            [_enums_1.EPosition.Down]: {
                text: {
                    fill: 0xFFFFFFBF,
                    fontWeight: 600,
                    fontFamily: 'Proxima Nova',
                    fontSize: 13,
                    trim: true,
                },
                offset: [32 + 16, 0]
            },
        };
        this.wagerStyle = {
            [_enums_1.EPosition.Up]: {
                text: {
                    fill: 0xFFFFFF,
                    fontWeight: 500,
                    fontFamily: 'Roboto',
                    fontSize: 16,
                    trim: true,
                },
                offset: [32 + 16, 20]
            },
            [_enums_1.EPosition.Zero]: {
                text: {
                    fill: 0x071226,
                    fontWeight: 500,
                    fontFamily: 'Roboto',
                    fontSize: 16,
                    trim: true,
                },
                offset: [32 + 16, 20]
            },
            [_enums_1.EPosition.Down]: {
                text: {
                    fill: 0xFFFFFF,
                    fontWeight: 500,
                    fontFamily: 'Roboto',
                    fontSize: 16,
                    trim: true,
                },
                offset: [32 + 16, 20]
            },
            orphan: {
                text: {
                    fill: 0xD32F2F,
                },
            }
        };
        this.profitContainerStyle = {
            [_enums_1.EPosition.Up]: {
                default: {
                    offset: [-24, 0],
                    background: {
                        width: 170,
                        height: 58,
                        anchor: [-1, 0],
                        radiuses: [28, 28, 28, 28],
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                            alignment: 0,
                        },
                        gradient: {
                            width: 170,
                            height: 58,
                            points: [0, 58, 170, 0],
                            colorStops: [
                                { color: '#F7C15B', offset: 0 },
                                { color: '#FFD78D', offset: 1 },
                            ]
                        }
                    },
                },
                claimable: {
                    offset: [-24, 0],
                    background: {
                        width: 170,
                        height: 58,
                        anchor: [-1, 0],
                        radiuses: [28, 28, 28, 28],
                        color: 0x0F2668,
                    },
                },
            },
            [_enums_1.EPosition.Down]: {
                default: {
                    offset: [-24, 0],
                    background: {
                        width: 170,
                        height: 58,
                        anchor: [-1, 0],
                        radiuses: [28, 28, 28, 28],
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                            alignment: 0,
                        },
                        gradient: {
                            width: 170,
                            height: 58,
                            points: [0, 58, 170, 0],
                            colorStops: [
                                { color: '#F7C15B', offset: 0 },
                                { color: '#FFD78D', offset: 1 },
                            ]
                        }
                    },
                },
                claimable: {
                    offset: [-24, 0],
                    background: {
                        width: 170,
                        height: 58,
                        anchor: [-1, 0],
                        radiuses: [28, 28, 28, 28],
                        color: 0x0F2668,
                    },
                },
            },
            [_enums_1.EPosition.Zero]: {
                default: {
                    offset: [-170 - 24 - 8, 0],
                    background: {
                        width: 170,
                        height: 58,
                        anchor: [-1, 0],
                        radiuses: [28, 28, 28, 28],
                        lineStyle: {
                            color: 0xFFFFFF,
                            width: 1,
                            alpha: 1,
                            alignment: 0,
                        },
                        gradient: {
                            width: 170,
                            height: 58,
                            points: [0, 58, 170, 0],
                            colorStops: [
                                { color: '#F7C15B', offset: 0 },
                                { color: '#FFD78D', offset: 1 },
                            ]
                        }
                    },
                },
                claimable: {
                    offset: [-170 - 24 - 8, 0],
                    background: {
                        width: 170,
                        height: 58,
                        anchor: [-1, 0],
                        radiuses: [28, 28, 28, 28],
                        color: 0x0F2668,
                    },
                },
            },
        };
        this.profitBorderBottomStyle = {
            offset: [0, -1],
            background: {
                width: 170,
                height: 58,
                radiuses: [28, 28, 28, 28],
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 1,
                    alpha: 0.2,
                    alignment: 0,
                }
            },
        };
        this.profitTextStyle = {
            default: {
                text: {
                    fill: 0x0F1F43,
                    fontWeight: 600,
                    fontFamily: 'Proxima Nova',
                    fontSize: 13,
                    trim: true,
                    alpha: 0.8
                },
                offset: [44 + 0, 0]
            },
            claimable: {
                text: {
                    fill: 0xF7C15B,
                    fontWeight: 600,
                    fontFamily: 'Proxima Nova',
                    fontSize: 13,
                    trim: true,
                    alpha: 0.8
                },
                offset: [44 + 0, 0]
            }
        };
        this.percentStyle = {
            default: {
                text: {
                    fill: 0x0F1F43,
                    fontWeight: 400,
                    fontFamily: 'Roboto',
                    fontSize: 12,
                    trim: true,
                    alpha: 0.8,
                },
                offset: [32 + 12 + 31 + 8, 0],
            },
            claimable: {
                text: {
                    fill: 0xF7C15B,
                    fontWeight: 400,
                    fontFamily: 'Roboto',
                    fontSize: 12,
                    trim: true,
                    alpha: 0.8,
                },
                offset: [32 + 12 + 31 + 8, 0],
            },
        };
        this.payoutStyle = {
            default: {
                text: {
                    fill: 0x0F1F43,
                    fontWeight: 500,
                    fontFamily: 'Roboto',
                    fontSize: 16,
                    trim: true,
                },
                offset: [44 + 0, 19.5]
            },
            claimable: {
                text: {
                    fill: 0xFFFFFF,
                    fontWeight: 500,
                    fontFamily: 'Roboto',
                    fontSize: 16,
                    trim: true,
                },
                offset: [44 + 0, 19.5]
            }
        };
        this.claimStyle = {
            [_enums_1.EPosition.Up]: {
                offset: [-24, 58 + 10],
                background: {
                    width: 170,
                    height: 48,
                    anchor: [-1, 0],
                    radiuses: [23, 23, 23, 23],
                    color: 0xFFFFFF,
                    gradient: {
                        width: 170,
                        height: 48,
                        points: [0, 48, 170, 0],
                        colorStops: [
                            { color: '#F7C15B', offset: 0 },
                            { color: '#FFD78D', offset: 1 },
                        ]
                    }
                },
            },
            [_enums_1.EPosition.Down]: {
                offset: [-24, -10 - 48],
                background: {
                    width: 170,
                    height: 48,
                    anchor: [-1, 0],
                    radiuses: [23, 23, 23, 23],
                    color: 0xFFFFFF,
                    gradient: {
                        width: 170,
                        height: 48,
                        points: [0, 48, 170, 0],
                        colorStops: [
                            { color: '#F7C15B', offset: 0 },
                            { color: '#FFD78D', offset: 1 },
                        ]
                    }
                },
            },
            [_enums_1.EPosition.Zero]: {
                offset: [-24 - 170 - 8, 58 + 10],
                background: {
                    width: 170,
                    height: 48,
                    anchor: [-1, 0],
                    radiuses: [23, 23, 23, 23],
                    color: 0xFFFFFF,
                    gradient: {
                        width: 170,
                        height: 48,
                        points: [0, 48, 170, 0],
                        colorStops: [
                            { color: '#F7C15B', offset: 0 },
                            { color: '#FFD78D', offset: 1 },
                        ]
                    }
                },
            },
        };
        this.claimBorderBottomStyle = {
            offset: [0, -1],
            background: {
                width: 170,
                height: 48,
                radiuses: [23, 23, 23, 23],
                lineStyle: {
                    color: 0xFFE7BA,
                    width: 1,
                    alpha: 1,
                    alignment: 0,
                }
            },
        };
        this.claimTextStyle = {
            text: {
                fill: 0x0F1F43,
                fontWeight: 700,
                fontFamily: 'Proxima Nova',
                fontSize: 16,
            },
            offset: [0, 0]
        };
        this.positionIconCircleStyle = {
            [_enums_1.EPosition.Up]: {
                offset: [0, 58 / 2],
                radius: 16,
                color: 0x01A37A,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 2,
                    alpha: 1,
                    alignment: 0,
                },
            },
            [_enums_1.EPosition.Down]: {
                offset: [0, 58 / 2],
                radius: 16,
                color: 0xD7335B,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 2,
                    alpha: 1,
                    alignment: 0,
                },
            },
            [_enums_1.EPosition.Zero]: {
                offset: [0, 58 / 2],
                radius: 16,
                color: 0xB7BDD7,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 2,
                    alpha: 1,
                    alignment: 0,
                },
            },
            orphan: {
                offset: [0, 58 / 2],
                radius: 16,
                color: 0x081327,
                lineStyle: {
                    color: 0xD32F2F,
                    width: 2,
                    alpha: 1,
                    alignment: 0,
                },
            }
        };
        this.positionIconStyle = {
            [_enums_1.EPosition.Up]: {
                size: 32,
                offset: [0, 58 / 2],
                anchor: [0.5, 0.5],
                tint: 0xFFFFFF,
            },
            [_enums_1.EPosition.Down]: {
                size: 32,
                offset: [0, 58 / 2],
                anchor: [0.5, 0.5],
                tint: 0xFFFFFF,
            },
            [_enums_1.EPosition.Zero]: {
                size: 32,
                offset: [0, 58 / 2],
                anchor: [0.5, 0.5],
                tint: 0x071226,
                orphanTint: 0xFFFFFF,
            }
        };
        this.profitCurrencyIconStyle = {
            default: {
                offset: [6, 6],
                size: 20,
                radius: 16,
                circleTint: 0x0F1F43,
                iconTint: 0xF9C462,
            },
            claimable: {
                offset: [6, 6],
                size: 20,
                radius: 16,
                circleTint: 0xF7C15B,
                iconTint: 0x092A73,
            },
        };
        this.avatarStyle = {
            radius: 20,
            offset: [-5, -4],
            lineStyle: {
                width: 1,
                color: 0xFFFFFF,
                alignment: 1,
                alpha: 1,
            }
        };
        this.wagerCurrencyIconContainerStyle = {
            offset: [32 + 16 + 7, 18],
        };
        this.wagerCurrencyCircleStyle = {
            [_enums_1.EPosition.Up]: {
                color: 0xFFFFFF,
                radius: 8,
            },
            [_enums_1.EPosition.Down]: {
                color: 0xFFFFFF,
                radius: 8,
            },
            [_enums_1.EPosition.Zero]: {
                color: 0x071226,
                radius: 8,
            },
            orphan: {
                color: 0xD32F2F,
                radius: 8,
            },
        };
        this.wagerCurrencyIconStyle = {
            [_enums_1.EPosition.Up]: {
                offset: [2, 2],
                tint: 0x01A37A,
                size: 12,
            },
            [_enums_1.EPosition.Down]: {
                offset: [2, 2],
                tint: 0xD7335B,
                size: 12,
            },
            [_enums_1.EPosition.Zero]: {
                offset: [2, 2],
                tint: 0xB7BDD7,
                size: 12,
            },
            orphan: {
                offset: [2, 2],
                tint: 0x081327,
                size: 12,
            }
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
            show_propagating_bg: {
                duration: 0.3,
                ease: 'power2.out',
            },
            hide_propagating_bg: {
                pixi: {
                    alpha: 0
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
        if (!(pari.position in this.validPariPositions))
            return this.clear();
        if (!pool.openPriceTimestamp || !pool.openPriceValue)
            return this.clear();
        const state = this.getPariState(pool, pari, context);
        if (!state.win && !state.nocontest && state.isHistorical)
            return this.clear();
        const [group] = this.renderGroup(pool, pari, context, container, state);
        this.updatePositionIcon(pool, pari, context, group, state);
        this.updateWager(pool, pari, context, group, state);
        this.updateProfit(pool, pari, context, group, state);
        this.updateClaim(pool, pari, context, group, state);
    }
    getGroupPosition(context, pool, position) {
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
        return [bgx, bgy];
    }
    renderGroup(pool, pari, context, container, state) {
        const [groupElement] = this.get('groupElement', () => new GroupComponent_1.GroupComponent());
        const [group, groupstate] = groupElement.update(context, {
            poolid: pool.poolid,
            pariState: state,
        });
        if (group) {
            if (groupstate.new) {
                container.sortableChildren = true;
                container.addChild(group);
            }
            const [bgx, bgy] = this.getGroupPosition(context, pool, pari.position);
            group.position.set(bgx, bgy);
        }
        return [group, groupstate];
    }
    updatePositionIcon(pool, pari, context, container, state) {
        const { orphan } = state;
        const circleStyle = orphan ? this.positionIconCircleStyle.orphan : this.positionIconCircleStyle[pari.position];
        const { lineStyle, color, radius, offset: [ofx, ofy] } = circleStyle;
        const [positionIconCircle, positionIconCircleState] = this.get('positionIconCircle', () => new pixi_1.Graphics());
        if (positionIconCircleState.new)
            container.addChild(positionIconCircle);
        positionIconCircle
            .clear()
            .lineStyle(lineStyle)
            .beginFill(color)
            .drawCircle(ofx, ofy, radius)
            .endFill();
        const iconStyle = this.positionIconStyle[pari.position];
        const [positionIcon, positionIconState] = this.get('positionIcon', () => this.createIcon(context, this.getPositionIconTextureName(pari.position), iconStyle));
        if (positionIconState.new)
            container.addChild(positionIcon);
        if (orphan && iconStyle.orphanTint)
            positionIcon.tint = iconStyle.orphanTint;
        else
            positionIcon.tint = iconStyle.tint;
    }
    updateProfit(pool, pari, context, container, state) {
        const { emptypool, nocontest, undef, win, phantom, orphan, propagating, claimable, } = state;
        if (orphan) {
            this.clear('profit');
            this.clear('profitcontent');
            this.clear('profitCurrency');
            this.clear('payout');
            this.clear('prizeAmount');
            this.clear('profitText');
            this.clear('percent');
            this.clear('percentText');
            this.clear('profitpropagatingContainer');
            this.clear('profitpropagating');
            return;
        }
        const [profit, profitState] = this.get('profit', () => this.createProfitContainer(context, pari.position, claimable), [claimable]);
        if (profitState.new)
            container.addChild(profit);
        profit.alpha = 0;
        const [profitcontent, profitcontentState] = this.get('profitcontent', () => this.createContainer(this.contentStyle));
        if (profitcontentState.new || profitState.new)
            profit.addChild(profitcontent);
        const [profitCurrency, profitCurrencyState] = this.get('profitCurrency', () => this.createProfitCurrencyIcon(context));
        if (profitCurrencyState.new)
            profitcontent.addChild(profitCurrency);
        profitCurrency.tint = claimable ?
            this.profitCurrencyIconStyle.claimable.circleTint :
            this.profitCurrencyIconStyle.default.circleTint;
        const icon = profitCurrency.getChildAt(0);
        icon.tint = claimable ?
            this.profitCurrencyIconStyle.claimable.iconTint :
            this.profitCurrencyIconStyle.default.iconTint;
        if (!undef) {
            const [payout, payoutState] = this.get('payout', () => _rendering_1.GraphicUtils.createText(0, this.payoutStyle.default.offset, this.payoutStyle.default.text));
            if (payoutState.new)
                profitcontent.addChild(payout);
            payout.style.fill = claimable ? this.payoutStyle.claimable.text.fill : this.payoutStyle.default.text.fill;
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
                payout.position.set(...this.payoutStyle.default.offset);
                const [profitText, profitTextState] = this.get('profitText', () => _rendering_1.GraphicUtils.createText('Profit', this.profitTextStyle.default.offset, this.profitTextStyle.default.text));
                if (profitTextState.new)
                    profitcontent.addChild(profitText);
                profitText.alpha = this.profitTextStyle.default.text.alpha;
                profitText.style.fill = claimable ? this.profitTextStyle.claimable.text.fill : this.profitTextStyle.default.text.fill;
                const [percentAmount] = this.get('percent', () => ui_1.default.percent((0, calc_utils_1.profitPercent)(prizeAmount, pari.wager)), [prizeAmount, pari.wager]);
                const [percentText, percentTextState] = this.get('percentText', () => _rendering_1.GraphicUtils.createText(percentAmount, this.percentStyle.default.offset, this.percentStyle.default.text));
                if (percentTextState.new)
                    profitcontent.addChild(percentText);
                percentText.alpha = this.percentStyle.default.text.alpha;
                percentText.text = percentAmount;
                percentText.style.fill = claimable ? this.percentStyle.claimable.text.fill : this.percentStyle.default.text.fill;
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
                const [ofx] = this.payoutStyle.default.offset;
                payout.text = payoutAmount;
                payout.position.set(ofx, (profitcontent.height - payout.height) / 2);
            }
        }
        const [profitpropagatingContainer, profitpropagatingContainerState] = this.get('profitpropagatingContainer', () => this.createPropagatingContainer(this.profitContainerStyle[pari.position].default));
        if (profitpropagatingContainerState.new || profitState.new)
            profit.addChild(profitpropagatingContainer);
        const [[profitpropagating, profitpropagatingtimeline], profitpropagatingState] = this.get('profitpropagating', () => this.createPropagatingBackground());
        if (profitpropagatingState.new) {
            profitpropagatingContainerState.timeline = profitpropagatingtimeline;
            profitpropagatingContainer.addChild(profitpropagating);
        }
        if (propagating)
            this.animate('profitpropagatingContainer', 'show_propagating_bg', { pixi: { alpha: 0.07 } });
        else
            this.animate('profitpropagatingContainer', 'hide_propagating_bg');
    }
    updateClaim(pool, pari, context, container, state) {
        var _a;
        const { claimable, emptypool, isHistorical, propagating } = state;
        if (claimable) {
            const poolid = pool.poolid;
            const pariid = pari.pariid;
            const erc20 = pari.erc20;
            const [claim, claimState] = this.get('claim', () => this.createClaim(context, pari.position));
            if (claimState.new) {
                container.addChild(claim);
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
            const [[claimFragment, claimFragmentTimeline], claimFragmentState] = this.get('claimFragment', () => this.createClaimFragment(claim.width));
            if (claimFragmentState.new) {
                claimFragmentState.timeline = claimFragmentTimeline;
                claim.addChild(claimFragment);
            }
            const [claimpropagatingContainer, claimpropagatingContainerState] = this.get('claimpropagatingContainer', () => this.createPropagatingContainer(this.claimStyle[pari.position]));
            if (claimpropagatingContainerState.new)
                claim.addChild(claimpropagatingContainer);
            const [[claimpropagating, claimpropagatingtimeline], claimpropagatingState] = this.get('claimpropagating', () => this.createPropagatingBackground());
            if (claimpropagatingState.new) {
                claimpropagatingState.timeline = claimpropagatingtimeline;
                claimpropagatingContainer.addChild(claimpropagating);
            }
            if (propagating)
                this.animate('claimpropagatingContainer', 'show_propagating_bg', { pixi: { alpha: 0.3 } });
            else
                this.animate('claimpropagatingContainer', 'hide_propagating_bg');
        }
        else {
            this.clear('claim');
            this.clear('resolved');
            this.clear('settlement');
            this.clear('nocontest');
        }
    }
    updateWager(pool, pari, context, container, state) {
        const { propagating, orphan } = state;
        const position = pari.position;
        const [wager, wagerState] = this.get('wager', () => this.createContainer(orphan ?
            this.wagerOrphanContainerStyles[position] :
            this.wagerContainerStyles[position]), [orphan]);
        if (wagerState.new)
            container.addChild(wager);
        const [wagercontent, wagercontentState] = this.get('wagercontent', () => this.createContainer(this.contentStyle));
        if (wagercontentState.new || wagerState.new)
            wager.addChild(wagercontent);
        const [avatar, avatarState] = this.get('avatar', () => this.createAvatar(context.bettor.avatarUrl), [context.bettor.avatarUrl]);
        if (avatarState.new)
            wagercontent.addChild(avatar);
        const [wagerText, wagerTextState] = this.get('wagerText', () => _rendering_1.GraphicUtils.createText('Deposit', this.wagerTextStyle[position].offset, this.wagerTextStyle[position].text));
        if (wagerTextState.new)
            wagercontent.addChild(wagerText);
        const [wagerAmount, wagerAmountState] = this.get('wagerAmount', () => _rendering_1.GraphicUtils.createText(ui_1.default.erc20(pari.wager), this.wagerStyle[position].offset, this.wagerStyle[position].text));
        if (wagerAmountState.new)
            wagercontent.addChild(wagerAmount);
        wagerAmount.text = ui_1.default.erc20(pari.wager);
        wagerAmount.style.fill = orphan ?
            this.wagerStyle.orphan.text.fill :
            this.wagerStyle[position].text.fill;
        this.updateWagerCurrencyIcon(context, wagercontent, position, [wagerAmount.width, 0], orphan);
        const [wagerpropagatingContainer, wagerpropagatingContainerState] = this.get('wagerpropagatingContainer', () => this.createPropagatingContainer(this.wagerContainerStyles[position]));
        if (wagerpropagatingContainerState.new || wagerState.new)
            wager.addChild(wagerpropagatingContainer);
        const [[wagerpropagating, wagerpropagatingtimeline], wagerpropagatingState] = this.get('wagerpropagating', () => this.createPropagatingBackground());
        if (wagerpropagatingState.new) {
            wagerpropagatingState.timeline = wagerpropagatingtimeline;
            wagerpropagatingContainer.addChild(wagerpropagating);
        }
        if (propagating)
            this.animate('wagerpropagatingContainer', 'show_propagating_bg', { pixi: { alpha: 0.15 } });
        else
            this.animate('wagerpropagatingContainer', 'hide_propagating_bg');
    }
    updateWagerCurrencyIcon(context, container, position, [ofx, ofy], orphan) {
        const { offset: containerOffset } = this.wagerCurrencyIconContainerStyle;
        const [wagerCurrencyContainer, wagerCurrencyContainerState] = this.get('wagerCurrencyContainer', () => new pixi_1.Container());
        if (wagerCurrencyContainerState.new)
            container.addChild(wagerCurrencyContainer);
        wagerCurrencyContainer.position.set(containerOffset[0] + ofx, containerOffset[1] + ofy);
        const [wagerCurrencyCircle, wagerCurrencyCircleState] = this.get('wagerCurrencyCircle', () => new pixi_1.Graphics());
        if (wagerCurrencyCircleState.new)
            wagerCurrencyContainer.addChild(wagerCurrencyCircle);
        const { radius, color } = orphan ? this.wagerCurrencyCircleStyle.orphan : this.wagerCurrencyCircleStyle[position];
        wagerCurrencyCircle
            .clear()
            .beginFill(color, 1)
            .drawCircle(radius, radius, radius)
            .endFill();
        const [wagerCurrencyIcon, wagerCurrencyIconState] = this.get('wagerCurrencyIcon', () => this.createIcon(context, this.getPariCurrencyIconTextureName(context), this.wagerCurrencyIconStyle[position]));
        if (wagerCurrencyIconState.new)
            wagerCurrencyContainer.addChild(wagerCurrencyIcon);
        wagerCurrencyIcon.tint = orphan ?
            this.wagerCurrencyIconStyle.orphan.tint :
            this.wagerCurrencyIconStyle[position].tint;
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
        const key = (_a = context.game) === null || _a === void 0 ? void 0 : _a.currency;
        switch (key) {
            case _constants_1.ORCY:
                return textures_1.ORCY_TEXTURE;
            case _constants_1.DEMO:
                return textures_1.DEMO_TEXTURE;
            case _constants_1.USDC:
                return textures_1.USDC_TEXTURE;
            default:
                _infra_1.Logger.error(`currency "${key}" is not supported, fallback to Undeliden`);
                return textures_1.UNKNOWN_DARK_TEXTURE;
        }
    }
    createIcon(context, textureName, style) {
        const { size, offset, tint, alpha, anchor } = style;
        const texture = context.textures.get(textureName);
        const icon = new pixi_1.Sprite(texture);
        icon.scale.set(size / icon.height);
        if (offset)
            icon.position.set(...offset);
        if (tint)
            icon.tint = tint;
        if (alpha)
            icon.alpha = alpha;
        if (anchor)
            icon.anchor.set(...anchor);
        return icon;
    }
    createProfitCurrencyIcon(context) {
        const { radius } = this.profitCurrencyIconStyle.default;
        const circle = (new pixi_1.Graphics())
            .beginFill(0xFFFFFF, 1)
            .drawCircle(radius, radius, radius)
            .endFill();
        const icon = this.createIcon(context, this.getPariCurrencyIconTextureName(context), this.profitCurrencyIconStyle.default);
        circle.addChild(icon);
        return circle;
    }
    createAvatar(url) {
        const { radius, lineStyle, offset } = this.avatarStyle;
        const circle = (new pixi_1.Graphics())
            .lineStyle(lineStyle)
            .beginFill(0xFFFFFF, 1)
            .drawCircle(radius, radius, radius)
            .endFill();
        const container = new pixi_1.Container();
        // Presist avatarResolvers to prevent showing pixi warnings about loading same assets
        this.avatarResolvers[url] = this.avatarResolvers[url] || pixi_1.Assets.load(url);
        this.avatarResolvers[url].then((texture) => {
            const icon = new pixi_1.Sprite(texture);
            icon.scale.set(2 * radius / texture.height);
            container.addChild(icon);
        });
        const mask = (new pixi_1.Graphics())
            .beginFill(0xFFFFFF, 1)
            .drawCircle(radius, radius, radius)
            .endFill();
        container.mask = mask;
        circle.addChild(container);
        container.addChild(mask);
        circle.position.set(...offset);
        return circle;
    }
    createContainer(style) {
        let { offset: [ofx, ofy] } = style;
        const { background: backgroundStyle } = style;
        const container = new pixi_1.Container();
        if (backgroundStyle) {
            const { width, height, anchor, lineStyle, radiuses, color, texture, alpha, } = backgroundStyle;
            const background = _rendering_1.GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses, { color, lineStyle, texture, alpha });
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
    createProfitContainer(context, position, claimable) {
        if (claimable) {
            const profit = this.createContainer(this.profitContainerStyle[position].claimable);
            const mask = profit.getChildAt(0).clone();
            profit.addChild(mask);
            profit.mask = mask;
            const borderBottom = this.createContainerBorderBottom(this.profitBorderBottomStyle);
            profit.addChild(borderBottom);
            return profit;
        }
        else {
            const style = this.profitContainerStyle[position].default;
            const texture = context.textures.get(textures_1.GRADIENT_TEXTURE, style.background.gradient);
            return this.createContainer(Object.assign(Object.assign({}, style), { background: Object.assign(Object.assign({}, style.background), { texture }) }));
        }
    }
    createClaim(context, position) {
        const style = this.claimStyle[position];
        const containerTexture = context.textures.get(textures_1.GRADIENT_TEXTURE, style.background.gradient);
        const container = this.createContainer(Object.assign(Object.assign({}, style), { background: Object.assign(Object.assign({}, style.background), { texture: containerTexture }) }));
        const mask = container.getChildAt(0).clone();
        container.addChild(mask);
        container.mask = mask;
        const text = _rendering_1.GraphicUtils.createText('Withdraw', this.claimTextStyle.offset, this.claimTextStyle.text);
        container.addChild(text);
        text.position.set((container.width - text.width) / 2, (container.height - text.height) / 2);
        const borderBottom = this.createContainerBorderBottom(this.claimBorderBottomStyle);
        container.addChild(borderBottom);
        return container;
    }
    createClaimFragment(claimwidth) {
        const rect = (new pixi_1.Graphics())
            .beginFill(0xFFFFFF, 0.2)
            .drawPolygon([
            27, 0,
            55, 0,
            28, 46,
            0, 46,
        ])
            .drawPolygon([
            66, 0,
            75, 0,
            48, 46,
            39, 46,
        ])
            .endFill();
        rect.pivot.x = rect.width;
        rect.position.y = 1;
        const timeline = pixi_1.gsap.timeline().to(rect, {
            pixi: { x: claimwidth + rect.width },
            delay: 5,
            repeatDelay: 5,
            duration: 1,
            ease: 'none',
            repeat: -1
        });
        return [rect, timeline];
    }
    createPropagatingContainer(style) {
        const container = new pixi_1.Container();
        const mask = this.createContainer(style);
        mask.position.set(0, 0);
        container.mask = mask;
        container.addChild(mask);
        container.alpha = 0;
        return container;
    }
    createPropagatingBackground() {
        const [propagatingBackground, gsaptimeline] = _rendering_1.GraphicUtils.createPropagationBackground({
            height: 310,
            lineHeight: 18,
            width: 300,
            colors: [{ color: 0xffffff, alpha: 1 }],
            duration: 1,
        });
        propagatingBackground.rotation = 3 * Math.PI / 4;
        propagatingBackground.pivot.x = 150;
        propagatingBackground.pivot.y = 155;
        propagatingBackground.position.set(150, 50);
        return [propagatingBackground, gsaptimeline];
    }
    createContainerBorderBottom(style) {
        const { offset: [x, y], background: { height, width, radiuses: [, , r3, r4], lineStyle, } } = style;
        const rect = new pixi_1.Graphics();
        rect.lineStyle(lineStyle);
        rect
            .moveTo(x - 0.25, y + (height / 2))
            .arcTo(x - 0.25, y + height, x + r4, y + height, r4)
            .lineTo(x + width - r3, y + height)
            .arcTo(x + width + 0.25, y + height, x + width + 0.25, y + (height / 2), r3);
        return rect;
    }
}
exports.PariTile = PariTile;
PariTile.PARI_TILE_ID = Symbol('PARI_TILE_ID');
//# sourceMappingURL=PariTile.js.map