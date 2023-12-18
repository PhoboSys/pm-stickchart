import { merge } from 'lodash'

import { PRIZEFUNDS } from '@constants'

import { RenderingContext, GraphicUtils, EntityUtils } from '@rendering'
import {
    UP_ICON_TEXTURE,
    DOWN_ICON_TEXTURE,
    ZERO_ICON_TEXTURE,
    UNDEFINED_ICON_TEXTURE,
    GRADIENT_TEXTURE,
    UNKNOWN_DARK_TEXTURE,
    PARI_DARK_TEXTURE,
    USDC_DARK_TEXTURE,
} from '@rendering/textures'

import { Logger } from '@infra'

import datamath from '@lib/datamath'
import { Graphics, Container, Sprite, Matrix } from '@lib/pixi'
import ui from '@lib/ui'
import { actualReturn, profitPercent } from '@lib/calc-utils'

import { PoolHoverEvent, PoolUnhoverEvent, WithdrawEvent } from '@events'
import { ResolveWithdrawEvent, PoolPinEvent, PoolUnpinEvent } from '@events'
import { ResolveWithdrawNocontestEvent } from '@events'

import { EPosition } from '@enums'

import { BaseParisRenderer } from './BaseParisRenderer'

export class PariTile extends BaseParisRenderer {

    static readonly PARI_TILE_ID: symbol = Symbol('PARI_TILE_ID')

    public get rendererId(): symbol {
        return PariTile.PARI_TILE_ID
    }

    private nocontestLineStyle: any = {

        [EPosition.Up]: {
            offsetTOP: [0, -8],
            offsetBOTTOM: [0, 8],
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
            }
        },

        [EPosition.Down]: {
            offsetTOP: [0, -8],
            offsetBOTTOM: [0, 8],
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
            }
        },

        [EPosition.Zero]: {
            offsetTOP: [300, -8],
            offsetBOTTOM: [300, 8],
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
            }
        }
    }

    private winlineStyle: any = {

        [EPosition.Up]: {
            offsetTOP: [0, -8],
            offsetBOTTOM: [0, 8],
            lineStyle: {
                color: 0xFFA000,
                width: 2,
            }
        },

        [EPosition.Down]: {
            offsetTOP: [0, -8],
            offsetBOTTOM: [0, 8],
            lineStyle: {
                color: 0xFFA000,
                width: 2,
            }
        },

        [EPosition.Zero]: {
            offsetTOP: [300, -8],
            offsetBOTTOM: [300, 8],
            lineStyle: {
                color: 0xFFA000,
                width: 2,
            }
        }
    }

    private buttonStyle: any = {

        [EPosition.Up]: {
            size: 50,
            color: 0xFFA000,
            offset: [-30, 0],
            outside: [0, 0.5]
        },

        [EPosition.Down]: {
            size: 50,
            color: 0xFFA000,
            offset: [-30, 0],
            outside: [0, 0.5]
        },

        [EPosition.Zero]: {
            size: 50,
            color: 0xFFA000,
            offset: [30, 0],
            outside: [1, 0.5]
        }

    }

    private groupStyle: any = {

        [EPosition.Up]: {
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
                    width: 300,
                    height: 64,
                    offset: [1.5, -1],
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

        [EPosition.Down]: {
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
                    width: 300,
                    height: 64,
                    offset: [1.5, -1],
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

        [EPosition.Zero]: {
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
                    width: 300,
                    height: 64,
                    offset: [-0.5, -1],
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

    }

    private stateBackgroundStyle: any = merge({}, this.groupStyle, {

        [EPosition.Up]: {
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

        [EPosition.Down]: {
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

        [EPosition.Zero]: {
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

    })

    private stateBackgroundAlphaStyle: any = {
        winning: 1,
        undef: 0.6,
        phantom: 0.6,
        loseing: 0.8,
    }

    private orphanBackgroundStyle = merge({}, this.groupStyle, {

        [EPosition.Up]: {
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

        [EPosition.Down]: {
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

        [EPosition.Zero]: {
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

    })

    private payoutStyle: any = {
        color: 0x212233,
        offset: [18, 13],
        padding: [8, 8, 8, 36],
        anchor: [1, 0],
        radius: 0,
        textstyle: {
            fill: 0xf07750,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 18,
        },
        winFill: 0x00A573,
        loseFill: 0xf07750
    }

    private profitStyle: any = {
        color: 0x00a573,
        offset: [12, 4],
        padding: [2, 4],
        anchor: [1, 0],
        radius: 0,
        textstyle: {
            fill: 0x212233,
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 13,
        },
    }

    private iconPositionStyle: any = {
        size: 30,
        offset: [16, 16]
    }

    private levelCurrencyStyle = {
        radius: 10,
        offset: [7, 8]
    }

    private iconCurrencyStyle: any = {
        size: 16,
        offset: [10, 10]
    }

    private wagerStyle: any = {
        text: {
            fill: 0xFFFFFF,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 16,
        },
        offset: [60, 22]
    }

    private validPariPositions = {
        [EPosition.Up]: EPosition.Up,
        [EPosition.Down]: EPosition.Down,
        [EPosition.Zero]: EPosition.Zero,
    }

    private configAnimations: any = {
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
    }

    protected get animations(): any {
        return this.configAnimations
    }

    protected updatePari(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (!(pari.position in this.validPariPositions)) return this.clear()

        const resolution = this.getPoolResolution(pool, context)

        this.updateTile(pool, pari, context, container, resolution)
        this.updateLine(pool, pari, context, container, resolution)

    }

    private updateLine(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
        resolution: EPosition,
    ): void {
        const win = pari.position === resolution
        const nocontest = resolution === EPosition.NoContest

        const [group] = this.read('group')
        if (!(win || nocontest) || !group || !this.isHistoricalPool(pool, context)) return this.clear('line')

        const { height } = context.screen
        const { pricerange } = context.plotdata
        const { openPriceValue } = pool

        const [oy] = datamath.scaleReverse([openPriceValue], pricerange, height)

        const [line, linestate] = this.get('line', () => new Graphics())
        if (linestate.new) group.addChild(line)

        const style = nocontest ? this.nocontestLineStyle : this.winlineStyle

        const [topx, topy] = style[pari.position].offsetTOP
        const [botx, boty] = style[pari.position].offsetBOTTOM

        line
            .clear()
            .lineStyle(style[pari.position].lineStyle)
            .moveTo(0+topx, 0)
            .lineTo(0+topx, oy+topy)
            .moveTo(0+botx, oy+boty)
            .lineTo(0+botx, height)

        line.position.y = -group.position.y

    }

    private updateTile(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
        resolution: EPosition,
    ): void {
        const poolid = pool.poolid
        const pariid = pari.pariid

        const phantom = pari.phantom
        const undef = resolution === EPosition.Undefined
        const [nocontest] = this.get('nocontest', () => resolution === EPosition.NoContest, [resolution])
        const isHistorical = this.isHistoricalPool(pool, context)
        const win = pari.position === resolution
        const lose = !win && !phantom
        const winning = win && !isHistorical && !phantom
        const loseing = lose && !isHistorical && !phantom
        const won = win && isHistorical && !nocontest && !phantom
        const reverted = EntityUtils.isEnityReverted(context, pariid)
        const orphan = phantom && reverted

        const { width, height } = context.screen

        if (!win && !nocontest && isHistorical) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.rebind(poolid, pariid)
                    this.clear()
                }
            })

            return
        }

        const erc20 = pari.erc20
        const position = pari.position

        const { timerange, pricerange } = context.plotdata
        const { openPriceTimestamp, openPriceValue } = pool

        const [ox] = datamath.scale([openPriceTimestamp], timerange, width)
        const [oy] = datamath.scaleReverse([openPriceValue], pricerange, height)

        const bgStyle = this.groupStyle[position]
        const [ax, ay] = bgStyle.anchor
        const [ofx, ofy] = bgStyle.offset

        const bgwidth = bgStyle.width
        const bgx = ox + bgwidth * ax + ofx

        let vertical: any = null
        if (position === EPosition.Up) vertical = 0
        if (position === EPosition.Zero) vertical = oy
        if (position === EPosition.Down) vertical = height
        if (vertical === null) return this.clear()

        const bgheight = bgStyle.height
        const bgy = vertical + bgheight * ay + ofy

        const [group, groupstate] = this.get('group', () => new Container())
        if (groupstate.new) {
            group.alpha = 0

            group.width = bgwidth
            group.height = bgheight

            container.sortableChildren = true
            container.addChild(group)
        }
        group.position.set(bgx, bgy)
        if (!isHistorical) group.zIndex = 10

        const [background, backgroundState] = this.get(
            'background',
            () => this.createBackground(this.groupStyle[position])
        )
        if (backgroundState.new) group.addChild(background)

        const [stateBackground, stateBackgroundState] = this.get(
            'stateBackgroundState',
            () => this.createBackground(this.stateBackgroundStyle[position])
        )
        if (stateBackgroundState.new) group.addChild(stateBackground)
        stateBackground.alpha = this.getStateBackgroundAlpha({ winning, loseing, undef, phantom })

        const [orphanBackground, orphanBackgroundState] = this.get(
            'orphanBackground',
            () => this.createBackground(this.orphanBackgroundStyle[position])
        )
        if (orphanBackgroundState.new) group.addChild(orphanBackground)
        orphanBackground.alpha = orphan ? this.orphanBackgroundStyle[position].alpha : 0

        const [shadow, shadowState] = this.get(
            'shadow',
            () => this.createShadow(this.groupStyle[position].background.shadow, context)
        )
        if (shadowState.new) group.addChild(shadow)

        const [contentContainer, contentContainerState] = this.get('contentContainer', () => this.createContentContainer(position))
        if (contentContainerState.new) group.addChild(contentContainer)

        const [content, contentState] = this.get('content', () => new Container())
        if (contentState.new) contentContainer.addChild(content)
        content.alpha = this.getContentAlpha({ loseing, undef, phantom })

        const [iconPosition, iconPositionState] = this.get('iconPosition', () => this.createPositionIcon(context, position))
        if (iconPositionState.new) content.addChild(iconPosition)

        const [wager, wagerState] = this.get('wager', () =>
            GraphicUtils.createText(
                ui.erc20(pari.wager),
                this.wagerStyle.offset,
                this.wagerStyle.text,
            )
        )
        if (wagerState.new) content.addChild(wager)
        wager.text = ui.erc20(pari.wager)

        const emptypool = this.isNoContestEmptyPool(pool)

        if (!undef) {
            const payoutPosition: [number, number] = [bgwidth - this.payoutStyle.offset[0], this.payoutStyle.offset[1]]
            const [payout, payoutState] = this.get('payout', () => GraphicUtils.createCoveredText(
                0,
                payoutPosition,
                this.payoutStyle,
            ))
            if (payoutState.new) content.addChild(payout)

            const [levelCurrency, levelCurrencyState] = this.get('levelCurrency', () => this.createLevelCurrency(context))
            if (levelCurrencyState.new) payout.addChild(levelCurrency)

            const [currency, currencyState] = this.get('currency', () => this.createPariCurrencyIcon(context))
            if (currencyState.new) levelCurrency.addChild(currency)

            if (win && !emptypool) {
                const [prizeAmount] = this.get(
                    'prizeAmount',
                    () => {
                        if (pari.claimed) {
                            return ui.erc20(pari.payout)
                        } else if (emptypool) {
                            return ui.erc20(pari.wager)
                        } else {
                            return ui.erc20(actualReturn(pool.prizefunds, pari.wager, pari.position))
                        }
                    },
                    [pari.wager, pari.position, pari.claimed, pool.prizefunds[PRIZEFUNDS.TOTAL], nocontest, emptypool]
                )

                payout.update((textGraphic) => {
                    textGraphic.text = prizeAmount
                    textGraphic.style.fill = this.payoutStyle.winFill
                }, payoutPosition, this.payoutStyle)

                const [percent] = this.get(
                    'percent',
                    () => ui.percent(profitPercent(prizeAmount, pari.wager)),
                    [prizeAmount, pari.wager]
                )

                const profitPosition: [number, number] = [bgwidth - this.profitStyle.offset[0], this.profitStyle.offset[1]]
                const [profit, profitState] = this.get('profit', () => GraphicUtils.createCoveredText(
                    percent,
                    profitPosition,
                    this.profitStyle,
                ))
                if (profitState.new) content.addChild(profit)
                else profit.update((textGraphic) => textGraphic.text = percent, profitPosition, this.profitStyle)

            } else {
                this.clear('profit')

                let fill: any
                let payoutAmount: any = 0

                if (pari.claimed) {
                    fill = this.payoutStyle.winFill
                    payoutAmount = ui.erc20(pari.payout)
                } else if (nocontest || emptypool) {
                    fill = this.payoutStyle.winFill
                    payoutAmount = ui.erc20(pari.wager)
                } else {
                    fill = this.payoutStyle.loseFill
                }

                payout.update((textGraphic) => {
                    textGraphic.text = payoutAmount
                    textGraphic.style.fill = fill
                }, payoutPosition, this.payoutStyle)
            }
        }

        const [claimable] = this.get('claimable',
            () => !pari.claimed && (won || nocontest) && !orphan,
            [nocontest, won, pari.claimed, orphan]
        )

        if (claimable) {
            const [resolved] = this.get('resolved', () => pool.resolved, [pool.resolved])
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [settlement] = this.get('settlement', () =>
                context.settlements?.[pool.endDate], [context.settlements?.[pool.endDate]]
            )

            const btnStyle = this.buttonStyle[position]
            const [btnx, btny] = btnStyle.offset
            const [horizontal, vertical] = btnStyle.outside

            const [claim, claimState] = this.get('claim', () => new Container(), [pari.claimed])
            if (claimState.new) {
                group.addChild(claim)

                claim.width = btnStyle.size
                claim.height = btnStyle.size
                claim.interactive = true
                claim.cursor = 'pointer'
                claim.addEventListener('pointerover', (e) => {
                    this.rebind(poolid, pariid)
                    this.animate('claim', 'hover_claim')
                    context.eventTarget.dispatchEvent(new PoolHoverEvent(poolid, e))
                })
                claim.addEventListener('pointerout', (e) => {
                    this.rebind(poolid, pariid)
                    this.animate('claim', 'unhover_claim')
                    context.eventTarget.dispatchEvent(new PoolUnhoverEvent(poolid, e))
                })
                claim.addEventListener('pointertap', (e) => {
                    this.rebind(poolid, pariid)
                    this.animate('claim', 'tab_claim')
                    const [rslvd] = this.read('resolved')
                    const [sttlmnt] = this.read('settlement')
                    const [nocontest] = this.read('nocontest')

                    if (rslvd) {
                        context.eventTarget.dispatchEvent(
                            new WithdrawEvent(
                                poolid,
                                pariid,
                                erc20,
                                e
                            )
                        )
                    }

                    if (!rslvd) {
                        if (nocontest && emptypool) {
                            context.eventTarget.dispatchEvent(
                                new ResolveWithdrawNocontestEvent(
                                    poolid,
                                    pariid,
                                    erc20,
                                    e
                                )
                            )
                        } else if (sttlmnt) {
                            context.eventTarget.dispatchEvent(
                                new ResolveWithdrawEvent(
                                    poolid,
                                    pariid,
                                    erc20,
                                    sttlmnt.resolutionPrice,
                                    sttlmnt.controlPrice,
                                    e
                                )
                            )
                        }
                    }
                })
            }

            claim.position.set(
                btnx + bgwidth * horizontal,
                btny + bgheight * vertical,
            )

            const [claimimg, claimimgState] = this.get('claim_img', () => new Graphics(), [resolved])
            if (claimimgState.new) {
                claimimg
                    .beginFill(0xFFA000)
                    .drawCircle(0, 0, btnStyle.size / 2)
                    .endFill()
                    .beginFill(0xFFA000)
                    .drawCircle(0, 0, btnStyle.size / 3)
                    .endFill()

                if (!resolved) {
                    claimimg
                        .beginFill(0xFFF000)
                        .drawCircle(0, 0, btnStyle.size / 3)
                        .endFill()
                }

                claim.addChild(claimimg)
            }
        } else {
            this.clear('claim')
            this.clear('claim_img')
            this.clear('resolved')
            this.clear('settlement')
        }

        if (isHistorical) {

            if (win) {
                this.animate('background', 'won_bg')
                if (!claimable) this.animate('content', 'unclaimable_contnet')
            } else {
                this.animate('background', 'lost_bg')
                if (!claimable) this.animate('content', 'lost_contnet')
            }

            if (claimable) {
                if (groupstate.animation !== 'pin_group_claimable') this.animate('group', 'hide_group_claimable')
            } else {
                if (groupstate.animation !== 'pin_group_unclaimable') this.animate('group', 'unpin_group_unclaimable')
            }

            if (!groupstate.subscribed) {
                groupstate.subscribed = true

                context.eventTarget.addEventListener('poolpin', (e: PoolPinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)

                    const [claim] = this.read('claim')
                    if (claim) claim.interactive = true

                    const [clble] = this.read('claimable')
                    if (clble) this.animate('group', 'pin_group_claimable')
                    else this.animate('group', 'pin_group_unclaimable')
                })

                context.eventTarget.addEventListener('poolunpin', (e: PoolUnpinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)

                    const [claim] = this.read('claim')
                    if (claim) claim.interactive = false

                    const [clble] = this.read('claimable')
                    if (clble) this.animate('group', 'unpin_group_claimable')
                    else this.animate('group', 'unpin_group_unclaimable')
                })

            }

        } else {
            if (win && !emptypool) {
                this.animate('background', 'winning_bg')
                this.animate('group', 'winning_group')
            } else {
                this.animate('background', 'loseing_bg')
                this.animate('group', 'loseing_group')
            }

        }

        const [propagatingBackground, propagatingBackgroundState] = this.get(
            'propagatingBackground',
            () => this.createPropagatingBackground()
        )
        if (propagatingBackgroundState.new) contentContainer.addChild(propagatingBackground)

        const propagating = EntityUtils.isEntityPropagating(context, pariid)
        if (propagating) {
            this.animate('propagatingBackground', 'show_propagating_bg')
        } else {
            this.animate('propagatingBackground', 'hide_propagating_bg')
        }
    }

    private getPositionIconTextureName(position: EPosition): symbol {

        switch (position) {
            case EPosition.Up:
                return UP_ICON_TEXTURE
            case EPosition.Down:
                return DOWN_ICON_TEXTURE
            case EPosition.Zero:
                return ZERO_ICON_TEXTURE

            default:
                Logger.error(`pari position "${position}" is not supported, fallback to Undeliden`)

                return UNDEFINED_ICON_TEXTURE
        }

    }

    private getPariCurrencyIconTextureName(context: RenderingContext, theme = 'DARK'): symbol {
        const key = [context.metapool?.currency, theme].join('_')

        switch (key) {
            case 'PARI_DARK':
                return PARI_DARK_TEXTURE
            case 'USDC_DARK':
                return USDC_DARK_TEXTURE
            default:
                Logger.error(`currency "${key}" is not supported, fallback to Undeliden`)

                return UNKNOWN_DARK_TEXTURE
        }
    }

    private createPositionIcon(
        context: RenderingContext,
        position: EPosition,
    ): Container {
        const textureName = this.getPositionIconTextureName(position)
        const texture = context.textures.get(textureName)
        const icon = new Sprite(texture)
        icon.scale.set(this.iconPositionStyle.size / icon.height)
        icon.position.set(...this.iconPositionStyle.offset)

        return icon
    }

    private createPariCurrencyIcon(
        context: RenderingContext
    ): Container {
        const textureName = this.getPariCurrencyIconTextureName(context)
        const texture = context.textures.get(textureName)
        const icon = new Sprite(texture)
        icon.anchor.set(0.5, 0.5)
        icon.scale.set(this.iconCurrencyStyle.size / icon.height)
        icon.position.set(...this.iconCurrencyStyle.offset)

        return icon
    }

    private createLevelCurrency(context: RenderingContext): Container {
        const levelCurrency = new Graphics()
        const container = new Container()

        container.addChild(levelCurrency)
        container.position.set(...this.levelCurrencyStyle.offset)

        const textureName = this.getLevelTextureName(context)
        const diagonal = 2 * this.levelCurrencyStyle.radius
        const texture = context.textures.get(textureName, { height: diagonal, width: diagonal })
        const pozx = this.levelCurrencyStyle.radius
        const pozy = this.levelCurrencyStyle.radius

        levelCurrency
            .beginTextureFill({ texture })
            .drawCircle(pozx, pozy, this.levelCurrencyStyle.radius)
            .endFill()

        return container
    }

    private createContentContainer(position: EPosition): Container {
        const {
            width,
            height,
            background: {
                offset: [ofx, ofy],
                lineStyle,
                radiuses,
            }
        } = this.groupStyle[position]

        const container = new Container()
        const mask = GraphicUtils.createRoundedRect(
            [ofx, ofy],
            [width, height],
            radiuses,
            { lineStyle }
        )

        container.addChild(mask)
        container.mask = mask

        return container
    }

    private createBackground(style): Graphics {
        const {
            width,
            height,
            background: {
                offset: [ofx, ofy],
                lineStyle,
                radiuses,
                color,
            }
        } = style

        const background = GraphicUtils.createRoundedRect(
            [ofx, ofy],
            [width, height],
            radiuses,
            { color, lineStyle }
        )

        background.alpha = 0

        return background
    }

    private createPropagatingBackground(): Container {
        const [propagatingBackground, propagatingBackgroundState] = this.get(
            'propagatingBackground',
            () => GraphicUtils.createPropagationBackground({
                height: 310,
                lineHeight: 18,
                width: 300,
                colors: [{ color: 0xffffff, alpha: 1 }],
                duration: 1,
            })
        )

        if (propagatingBackgroundState.new) {
            propagatingBackground.rotation = 3*Math.PI/4
            propagatingBackground.pivot.x = 150
            propagatingBackground.pivot.y = 155
            propagatingBackground.position.set(150, 50)
            propagatingBackground.alpha = 0
        }

        return propagatingBackground
    }

    private createShadow(style, context: RenderingContext): Graphics {
        const { width, height, offset: [ofx, ofy], points, colorStops } = style

        const shadow = new Graphics()

        // We need mask to hide weird line at the and of shadow graphic.
        const mask = new Graphics()
            .beginFill(0x000000)
            .drawRect(ofx, ofy, width - 1, height)
            .endFill()

        shadow.addChild(mask)
        shadow.mask = mask

        const texture = context.textures.get(GRADIENT_TEXTURE, { width, height, points, colorStops })

        const matrix = new Matrix()
        matrix.tx = ofx
        matrix.ty = ofy

        shadow
            .beginTextureFill({ texture, matrix })
            .drawRect(ofx, ofy, width, height)
            .endFill()

        return shadow
    }

    private getStateBackgroundAlpha({ winning, loseing, undef, phantom }): number {
        if (winning) return this.stateBackgroundAlphaStyle.winning
        if (loseing) return this.stateBackgroundAlphaStyle.loseing
        if (phantom) return this.stateBackgroundAlphaStyle.phantom
        if (undef) return this.stateBackgroundAlphaStyle.undef

        return 0
    }

    private getContentAlpha({ loseing, undef, phantom }): number {
        if (loseing) return this.stateBackgroundAlphaStyle.loseing
        if (phantom) return this.stateBackgroundAlphaStyle.phantom
        if (undef) return this.stateBackgroundAlphaStyle.undef

        return 1
    }

}
