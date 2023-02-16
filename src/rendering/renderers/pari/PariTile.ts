import { PRIZEFUNDS } from '@constants'

import { RenderingContext, GraphicUtils, EntityUtils } from '@rendering'
import {
    UP_ICON_TEXTURE,
    DOWN_ICON_TEXTURE,
    ZERO_ICON_TEXTURE,
    UNDEFINED_ICON_TEXTURE,
    GRADIENT_TEXTURE,
    UNKNOWN_DARK_TEXTURE,
    ETH_DARK_TEXTURE,
    USDT_DARK_TEXTURE,
    USDC_DARK_TEXTURE
} from '@rendering/textures'
import {
    AUD_TEXTURE,
    CAD_TEXTURE,
    CHF_TEXTURE,
    JPY_TEXTURE,
    ETH_TEXTURE,
    BTC_TEXTURE,
    SOL_TEXTURE,
    MATIC_TEXTURE,
    BNB_TEXTURE,
    USD_TEXTURE
} from '@rendering/textures'

import { Logger } from '@infra'

import datamath from '@lib/datamath'
import { Graphics, Container, Sprite, gsap } from '@lib/pixi'
import ui from '@lib/ui'
import { actualReturn, profitPercent } from '@lib/calc-utils'
import { nowUnixTS } from '@lib/utils'

import { PoolHoverEvent, PoolUnhoverEvent, WithdrawEvent } from '@events'
import { ResolveWithdrawEvent, PoolPinEvent, PoolUnpinEvent } from '@events'

import { EPosition } from '@enums'

import { BaseParisRenderer } from './BaseParisRenderer'

export class PariTile extends BaseParisRenderer {

    static readonly PARI_TILE_ID: symbol = Symbol('PARI_TILE_ID')

    public get rendererId(): symbol {
        return PariTile.PARI_TILE_ID
    }

    private nocontestLineStyle: any = {

        [EPosition.Up]: {
            offsetTOP: [0, -6],
            offsetBOTTOM: [0, 6],
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
            }
        },

        [EPosition.Down]: {
            offsetTOP: [0, -6],
            offsetBOTTOM: [0, 6],
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
            }
        },

        [EPosition.Zero]: {
            offsetTOP: [300, -6],
            offsetBOTTOM: [300, 6],
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
            }
        }
    }

    private winlineStyle: any = {

        [EPosition.Up]: {
            offsetTOP: [0, -6],
            offsetBOTTOM: [0, 6],
            lineStyle: {
                color: 0xFFA000,
                width: 2,
            }
        },

        [EPosition.Down]: {
            offsetTOP: [0, -6],
            offsetBOTTOM: [0, 6],
            lineStyle: {
                color: 0xFFA000,
                width: 2,
            }
        },

        [EPosition.Zero]: {
            offsetTOP: [300, -6],
            offsetBOTTOM: [300, 6],
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

        [EPosition.Down]: {
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

        [EPosition.Zero]: {
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

    }

    private payoutContainerStyle = {
        offset: [16, 68],
    }

    private prizeStyle: any = {
        text: {
            fill: 0x00A573,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 16,
        },
        offset: [-7, 6],
        anchor: [1, 0]
    }

    private payoutStyle = {
        height: 30,
        width: 42,
    }

    private profitContainerStyle = {
        offset: [8, 62],
    }

    private profitStyle: any = {
        text: {
            fill: 0x212233,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
        },
        offset: [-2, -1],
        anchor: [1, 0]
    }

    private profitBlockStyle: any = {
        height: 12,
        width: 6,
        offset: [0, 2],
    }

    private timeingLinesStyle = {
        offset: [16, 55],
    }

    private iconPositionStyle: any = {
        size: 30,
        offset: [16, 68]
    }

    private iconPariTitleStyle: any = {
        size: 30,
        offset: [16, 16]
    }

    private levelCurrencyStyle = {
        radius: 10,
        offset: [7, 6]
    }

    private iconCurrencyStyle: any = {
        size: 16,
        offset: [12, 8]
    }

    private wagerStyle: any = {
        text: {
            fill: 0xFFFFFF,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 16,
        },
        offset: [60, 74]
    }

    private titlePariStyle: any = {
        text: {
            fill: 0xB7BDD7,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 16,
        },
        offset: [60, 21]
    }

    private validPariPositions = {
        [EPosition.Up]: EPosition.Up,
        [EPosition.Down]: EPosition.Down,
        [EPosition.Zero]: EPosition.Zero,
    }

    private configAnimations: any = {
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

        if (!(pari.position in this.validPariPositions) || pool.phantom) return this.clear()

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
        const win = pari.position === resolution
        const nocontest = resolution === EPosition.NoContest
        const undef = resolution === EPosition.Undefined

        const { width, height } = context.screen

        const poolid = pool.poolid
        const pariid = pari.pariid

        if (!win && !nocontest && this.isHistoricalPool(pool, context)) {
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

        const [contentContainer, contentContainerState] = this.get('contentContainer', () => this.createContentContainer(position))
        if (contentContainerState.new) group.addChild(contentContainer)

        const [background, backgroundState] = this.get('background', () => this.createBackground(position, context))
        if (backgroundState.new) contentContainer.addChild(background)

        const [content, contentState] = this.get('content', () => new Container())
        if (contentState.new) contentContainer.addChild(content)

        const [iconPariTitle, iconPariTitleState] = this.get('iconPariTitle', () => this.createPariTitleIcon(context))
        if (iconPariTitleState.new) content.addChild(iconPariTitle)

        const [iconPosition, iconPositionState] = this.get('iconPosition', () => this.createPositionIcon(context, position))
        if (iconPositionState.new) content.addChild(iconPosition)

        if (this.isHistoricalPool(pool, context)) {
            this.clear('timeingLines')
            const [historicalTimeingLine, historicalTimeingLineState] = this.get('historicalTimeingLine', () => new Graphics())
            if (historicalTimeingLineState.new) {
                historicalTimeingLine
                    .beginFill(0x474c67)
                    .drawRect(0, 2, bgwidth - 2 * this.timeingLinesStyle.offset[0], 1)
                    .endFill()

                historicalTimeingLine.position.set(...this.timeingLinesStyle.offset)
                content.addChild(historicalTimeingLine)
            }
        } else {
            const [timeingLines, timeingLinesState] = this.get('timeingLines', () => this.createTimeingLines(
                context,
                pool,
                { width: bgwidth - 2 * this.timeingLinesStyle.offset[0], height: 5 }
            ))

            if (timeingLinesState.new) {
                timeingLines.position.set(...this.timeingLinesStyle.offset)
                content.addChild(timeingLines)
            }
        }

        const [wager, wagerState] = this.get('wager', () =>
            GraphicUtils.createText(
                ui.erc20(pari.wager),
                this.wagerStyle.offset,
                this.wagerStyle.text,
            )
        )
        if (wagerState.new) content.addChild(wager)
        wager.text = ui.erc20(pari.wager)

        const [titlePari, titlePariState] = this.get('titlePari', () =>
            GraphicUtils.createText(
                context.metapool.name,
                this.titlePariStyle.offset,
                this.titlePariStyle.text,
            )
        )
        if (titlePariState.new) content.addChild(titlePari)

        const emptypool = this.isNoContestEmptyPool(pool)

        if (!undef) {
            const [payoutContainer, payoutContainerState] = this.get('payoutContainer', () => new Graphics())
            if (payoutContainerState.new) {
                payoutContainer.position.set(bgwidth - this.payoutContainerStyle.offset[0], this.payoutContainerStyle.offset[1])
                content.addChild(payoutContainer)
            }

            const [profitContainer, profitContainerState] = this.get('profitContainer', () => new Graphics())
            if (profitContainerState.new) {
                profitContainer.position.set(bgwidth - this.profitContainerStyle.offset[0], this.profitContainerStyle.offset[1])
                content.addChild(profitContainer)
            }

            const [prize] = this.get('prize', () =>
                GraphicUtils.createText(
                    0,
                    this.prizeStyle.offset,
                    this.prizeStyle.text,
                    this.prizeStyle.anchor
                )
            )

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
                prize.text = prizeAmount

                const [percent] = this.get(
                    'percent',
                    () => ui.percent(profitPercent(prizeAmount, pari.wager)),
                    [prizeAmount, pari.wager]
                )

                const [profit] = this.get('profit', () =>
                    GraphicUtils.createText(
                        percent,
                        this.profitStyle.offset,
                        this.profitStyle.text,
                        this.profitStyle.anchor
                    )
                )

                profit.text = percent

                const [profitBlock, profitBlockState] = this.get('profitBlock', () => this.createProfitBlock(profit), [profit.width])
                if (profitBlockState.new) profitContainer.addChild(profitBlock)

            } else {
                this.clear('profitBlock')

                if (pari.claimed) prize.text = ui.erc20(pari.payout)
                else              prize.text = nocontest || emptypool ? ui.erc20(pari.wager) : 0
            }

            const [levelCurrency] = this.get('levelCurrency', () => this.createLevelCurrency(context))

            const [currency, currencyState] = this.get('currency', () => this.createPariCurrencyIcon(context))
            if (currencyState.new) levelCurrency.addChild(currency)

            const [payout, payoutState] = this.get('payout', () => this.createPayout(prize), [prize.width])
            if (payoutState.new) {
                payout.addChild(levelCurrency)
                payoutContainer.addChild(payout)
            }
        }

        if (this.isHistoricalPool(pool, context)) {

            const [claimable] = this.get('claimable', () =>
                !pari.claimed && (win || nocontest),
            [nocontest, win, pari.claimed]
            )

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

            if (claimable) {
                const [resolved] = this.get('resolved', () => pool.resolved, [pool.resolved])
                const [settlement] = this.get('settlement', () => context.settlements?.[pool.endDate], [context.settlements?.[pool.endDate]])

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

                        if (!rslvd && sttlmnt) {
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
                    })
                }

                claim.position.set(
                    btnx + bgwidth * horizontal,
                    btny + bgheight * vertical,
                )

                const [claim_img, claimimgState] = this.get('claim_img', () => new Graphics(), [resolved])
                if (claimimgState.new) {
                    claim_img
                        .beginFill(0xFFA000)
                        .drawCircle(0, 0, btnStyle.size / 2)
                        .endFill()
                        .beginFill(0xFFA000)
                        .drawCircle(0, 0, btnStyle.size / 3)
                        .endFill()

                    if (!resolved) {
                        claim_img
                            .beginFill(0xFFF000)
                            .drawCircle(0, 0, btnStyle.size / 3)
                            .endFill()
                    }

                    claim.addChild(claim_img)
                }
            } else {
                this.clear('claim')
                this.clear('claim_img')
                this.clear('resolved')
                this.clear('settlement')
            }

            if (!groupstate.subscribed) {
                groupstate.subscribed = true

                context.eventTarget.addEventListener('poolpin', (e: PoolPinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)
                    const [clble] = this.read('claimable')
                    if (clble) this.animate('group', 'pin_group_claimable')
                    else this.animate('group', 'pin_group_unclaimable')
                })

                context.eventTarget.addEventListener('poolunpin', (e: PoolUnpinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)
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
            contentContainer.addChild(propagatingBackground)
        }

        const propagating = EntityUtils.isEntityPropagating(context, pariid)
        if (propagating) {
            this.animate('propagatingBackground', 'propagating_bg')
        } else {
            this.animate('propagatingBackground', 'unpropagating_bg')
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

    private getPariTitleIconTextureName(currency): symbol {
        switch (currency) {
            case 'AUD':
                return AUD_TEXTURE
            case 'CAD':
                return CAD_TEXTURE
            case 'CHF':
                return CHF_TEXTURE
            case 'JPY':
                return JPY_TEXTURE
            case 'USD':
                return USD_TEXTURE
            case 'ETH':
                return ETH_TEXTURE
            case 'BTC':
                return BTC_TEXTURE
            case 'SOL':
                return SOL_TEXTURE
            case 'MATIC':
                return MATIC_TEXTURE
            case 'BNB':
                return BNB_TEXTURE
            default:
                Logger.error(`currency "${currency}" is not supported, fallback to Undeliden`)

                return UNDEFINED_ICON_TEXTURE
        }
    }

    private getPariCurrencyIconTextureName(context: RenderingContext, theme = 'DARK'): symbol {
        const key = [context.metapool?.currency, theme].join('_')

        switch (key) {
            case 'ETH_DARK':
                return ETH_DARK_TEXTURE
            case 'USDT_DARK':
                return USDT_DARK_TEXTURE
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

    private createPariTitleIcon(
        context: RenderingContext
    ): Container {
        const textureName = this.getPariTitleIconTextureName(context.metapool.base)
        const texture = context.textures.get(textureName)
        const icon = new Sprite(texture)
        icon.scale.set(this.iconPariTitleStyle.size / icon.height)
        icon.position.set(...this.iconPariTitleStyle.offset)

        return icon
    }

    private createPariCurrencyIcon(
        context: RenderingContext
    ): Container {
        const textureName = this.getPariCurrencyIconTextureName(context)
        const texture = context.textures.get(textureName)
        const icon = new Sprite(texture)
        icon.scale.set(this.iconCurrencyStyle.size / icon.height)
        icon.position.set(...this.iconCurrencyStyle.offset)

        return icon
    }

    private createLevelCurrency(context: RenderingContext): Graphics {
        const levelCurrency = new Graphics()
        const textureName = this.getLevelTextureName(context)
        const diagonal = 2 * this.levelCurrencyStyle.radius
        const texture = context.textures.get(textureName, { height: diagonal, width: diagonal })
        const pozx = this.levelCurrencyStyle.radius + this.levelCurrencyStyle.offset[0]
        const pozy = this.levelCurrencyStyle.radius + this.levelCurrencyStyle.offset[1]

        levelCurrency
            .beginTextureFill({ texture })
            .drawCircle(pozx, pozy, this.levelCurrencyStyle.radius)
            .endFill()

        return levelCurrency
    }

    private createPayout(prize): Graphics {
        const payout = new Graphics()
        const width = this.payoutStyle.width + prize.width
        const height = this.payoutStyle.height

        payout
            .beginFill(0x212233)
            .drawRect(0, 0, width, height)
            .endFill()

        payout.pivot.x = width
        prize.x = width + this.prizeStyle.offset[0]
        payout.addChild(prize)

        return payout
    }

    private createProfitBlock(profit): Graphics {
        const block = new Graphics()
        const width = this.profitBlockStyle.width + profit.width
        const height = this.profitBlockStyle.height

        block
            .beginFill(0x00a573)
            .drawRect(0, 0, width, height)
            .endFill()

        block.pivot.x = width
        profit.x = width + this.profitStyle.offset[0]
        block.addChild(profit)

        return block
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

    private createBackground(position: EPosition, context: RenderingContext): Graphics {
        const {
            width,
            height,
            background: {
                offset: [ofx, ofy],
                lineStyle,
                radiuses,
                color,
                shadow: {
                    points,
                    colorStops
                }
            }
        } = this.groupStyle[position]

        let background = GraphicUtils.createRoundedRect(
            [ofx, ofy],
            [width, height],
            radiuses,
            { color, lineStyle }
        )

        const texture = context.textures.get(GRADIENT_TEXTURE, {
            width: width + lineStyle.width*2,
            height: height + lineStyle.width*2,
            points,
            colorStops
        })
        background = GraphicUtils.createRoundedRect(
            [ofx - lineStyle.width, ofy - lineStyle.width/2],
            [width + lineStyle.width + lineStyle.width/2, height + lineStyle.width],
            radiuses,
            { texture },
            background
        )

        background.alpha = 0

        return background
    }

    private createTimeingLines(context: RenderingContext, pool, { width, height }): Container {
        const container = new Container()

        const timeNow = nowUnixTS()
        const fullTime = pool.endDate - pool.startDate
        const timeToLock = Math.max(pool.lockDate - timeNow, 0)
        const timeFromLockToEnd = Math.min(pool.endDate - pool.lockDate, pool.endDate - timeNow)

        const radiuses: any = [height/2, height/2, height/2, height/2]

        const mask = GraphicUtils.createRoundedRect([0, 0], [width, height], radiuses)
        container.mask = mask
        container.addChild(mask)

        const active = GraphicUtils.createPropagationBackground({
            height: 310,
            lineHeight: 18,
            width: 300,
            colors: [
                { color: 0xffffff, alpha: 0.3 },
                { color: 0xffffff, alpha: 0.6 }
            ],
            duration: 1,
        })
        active.rotation = 3*Math.PI/4
        active.pivot.x = 150
        active.pivot.y = 155
        active.position.set(150, 50)
        active.alpha = 0.1
        container.addChild(active)

        const widthToLock = (timeToLock / fullTime) * width
        const widthToEnd = (timeFromLockToEnd / fullTime) * width

        let toEnd = GraphicUtils.createRoundedRect([0, 0], [widthToEnd, height], radiuses, { color: 0x00A573 })
        toEnd.pivot.x = widthToEnd
        toEnd.pivot.y = height/2
        toEnd.position.set(width, height/2)
        const endTexture = context.textures.get(GRADIENT_TEXTURE, {
            width: widthToEnd,
            height,
            points: [0, 0, widthToEnd, 0],
            colorStops: [
                { color: '#007397', offset: 0 },
                { color: '#009797', offset: 1 },
            ]
        })
        toEnd = GraphicUtils.createRoundedRect([0, 0], [widthToEnd, height], radiuses, { texture: endTexture }, toEnd)
        container.addChild(toEnd)

        if (timeToLock !== 0) {
            let toLock = GraphicUtils.createRoundedRect([0, 0], [widthToLock, height], radiuses, { color: 0xF05350 })
            toLock.pivot.x = widthToLock
            toLock.pivot.y = height/2
            toLock.position.set(width - widthToEnd, height/2)
            const lockTexture = context.textures.get(GRADIENT_TEXTURE, {
                width: widthToLock,
                height,
                points: [0, 0, widthToLock, 0],
                colorStops: [
                    { color: '#FFA000', offset: 0 },
                    { color: '#FFC700', offset: 1 },
                ]
            })
            toLock = GraphicUtils.createRoundedRect(
                [0, 0],
                [widthToLock, height],
                radiuses,
                { texture: lockTexture },
                toLock
            )
            container.addChild(toLock)

            gsap.to(toLock, {
                pixi: { width: 0 },
                duration: timeToLock,
                ease: 'power0',
                onComplete: () => {
                    gsap.to(toEnd, {
                        pixi: { width: 0 },
                        duration: timeFromLockToEnd,
                        ease: 'power0',
                    })
                }
            })
        } else {
            gsap.to(toEnd, {
                pixi: { width: 0 },
                duration: timeFromLockToEnd,
                ease: 'power0',
            })
        }

        return container

    }

}
