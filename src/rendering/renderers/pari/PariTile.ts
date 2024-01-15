import { PRIZEFUNDS } from '@constants'

import { RenderingContext, GraphicUtils } from '@rendering'
import {
    UP_ICON_TEXTURE,
    DOWN_ICON_TEXTURE,
    ZERO_ICON_TEXTURE,
    UNDEFINED_ICON_TEXTURE,
    UNKNOWN_DARK_TEXTURE,
    PARI_TEXTURE,
    USDC_TEXTURE,
} from '@rendering/textures'

import { Logger } from '@infra'

import datamath from '@lib/datamath'
import { Graphics, Container, Sprite } from '@lib/pixi'
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

    private groupStyle: any = {

        [EPosition.Up]: {
            offset: [0, 40],
        },

        [EPosition.Down]: {
            offset: [0, -134-62],
        },

        [EPosition.Zero]: {
            offset: [0, 14],
        }

    }

    private wagerContainerStyles: any = {
        [EPosition.Up]: {
            width: 137,
            height: 56,
            offset: [24, 0],
            background: {
                radiuses: <[number, number, number, number]>[27, 27, 27, 27],
                color: 0x01A37A,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 1,
                    alpha: 1,
                },
            },
        },
        [EPosition.Zero]: {
            width: 137,
            height: 56,
            offset: [-137-24, 0],
            background: {
                radiuses: <[number, number, number, number]>[27, 27, 27, 27],
                color: 0xB7BDD7,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 1,
                    alpha: 1,
                },
            },
        },
        [EPosition.Down]: {
            width: 137,
            height: 56,
            offset: [24, 0],
            background: {
                radiuses: <[number, number, number, number]>[27, 27, 27, 27],
                color: 0xD7335B,
                lineStyle: {
                    color: 0xFFFFFF,
                    width: 1,
                    alpha: 1,
                },
            },
        },
    }

    private profitTextStyle: any = {
        text: {
            fill: 0xFFFFFF,
            fontWeight: 600,
            fontFamily: 'Proxima Nova',
            fontSize: 12,
        },
        offset: [44+0, 0]
    }

    private wagerTextStyle: any = {
        [EPosition.Up]: {
            text: {
                fill: 0xFFFFFFB3,
                fontWeight: 600,
                fontFamily: 'Proxima Nova',
                fontSize: 13,
            },
            offset: [24, 8]
        },
        [EPosition.Zero]: {
            text: {
                fill: 0x071226B3,
                fontWeight: 600,
                fontFamily: 'Proxima Nova',
                fontSize: 13,
            },
            offset: [24, 8]
        },
        [EPosition.Down]: {
            text: {
                fill: 0xFFFFFFB3,
                fontWeight: 600,
                fontFamily: 'Proxima Nova',
                fontSize: 13,
            },
            offset: [24, 8]
        },
    }

    private percentStyle: any = {
        text: {
            fill: 0xFFFFFFBF,
            fontWeight: 400,
            fontFamily: 'Roboto',
            fontSize: 11,
        },
        offset: [44+35, 0],
    }

    private payoutStyle: any = {
        text: {
            fill: 0xFFFFFF,
            fontWeight: 500,
            fontFamily: 'Roboto',
            fontSize: 15,
        },
        offset: [44+0, 15]
    }

    private profitContainerStyles = {

        [EPosition.Up]: {
            default: {
                width: 162,
                height: 56,
                offset: [-162-24, 0],
                background: {
                    radiuses: <[number, number, number, number]>[27, 27, 27, 27],
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
                offset: [-162-24, -(108-56)/2],
                background: {
                    radiuses: <[number, number, number, number]>[22, 22, 22, 22],
                    color: 0xDD8F19,
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                    },
                },
            }
        },

        [EPosition.Down]: {
            default: {
                width: 162,
                height: 56,
                offset: [-162-24, 0],
                background: {
                    radiuses: <[number, number, number, number]>[27, 27, 27, 27],
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
                offset: [-162-24, -(108-56)/2],
                background: {
                    radiuses: <[number, number, number, number]>[22, 22, 22, 22],
                    color: 0xDD8F19,
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                    },
                },
            }
        },

        [EPosition.Zero]: {
            default: {
                width: 162,
                height: 56,
                offset: [-137-24-162-8, 0],
                background: {
                    radiuses: <[number, number, number, number]>[27, 27, 27, 27],
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
                offset: [-137-24-162-8, -(108-56)/2],
                background: {
                    radiuses: <[number, number, number, number]>[22, 22, 22, 22],
                    color: 0xDD8F19,
                    lineStyle: {
                        color: 0xFFFFFF,
                        width: 1,
                        alpha: 1,
                    },
                },
            }
        },
    }

    private profitStyle = {
        offset: [14, 13],
    }

    private claimStyle = {
        width: 134,
        height: 32,
        offset: [14, 60],
        background: {
            radiuses: <[number, number, number, number]>[16, 16, 16, 16],
            color: 0xFFFFFF,
        },
    }

    private claimTextStyle = {
        text: {
            fill: 0xDD8F19,
            fontWeight: 700,
            fontFamily: 'Proxima Nova',
            fontSize: 15,
        },
        offset: <[number, number]>[0, 0]
    }

    private positionIconStyle: any = {
        size: 32,
        offset: [-16, (56-32)/2],
    }

    private currencyIconStyle: any = {
        size: 32,
        offset: [0, 0],
        alpha: 0.75,
    }

    private wagerStyle: any = {
        [EPosition.Up]: {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: 15,
            },
            offset: [24, 29]
        },
        [EPosition.Zero]: {
            text: {
                fill: 0x071226,
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: 15,
            },
            offset: [24, 29]
        },
        [EPosition.Down]: {
            text: {
                fill: 0xFFFFFF,
                fontWeight: 500,
                fontFamily: 'Roboto',
                fontSize: 15,
            },
            offset: [24, 29]
        },
    }

    private validPariPositions = {
        [EPosition.Up]: EPosition.Up,
        [EPosition.Down]: EPosition.Down,
        [EPosition.Zero]: EPosition.Zero,
    }

    private configAnimations: any = {
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

        if (!context.features.pariTileNewDesign) return this.clear()
        if (!(pari.position in this.validPariPositions)) return this.clear()

        const state = this.getPariState(pool, pari, context)

        this.updateGroup(pool, pari, context, container, state)

        if (!state.win && !state.nocontest && state.isHistorical) return

        const [group] = this.read('group')

        const [positionIcon, positionIconState] = this.get(
            'positionIcon',
            () => this.createIcon(context, this.getPositionIconTextureName(pari.position), this.positionIconStyle),
            []
        )
        if (positionIconState.new) group.addChild(positionIcon)

        this.updateWager(pool, pari, context, group, state)
        this.updateProfit(pool, pari, context, group, state)
        this.updateClaim(pool, pari, context, state)

    }

    private updateGroup(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
        state: any,
    ): void {
        const poolid = pool.poolid
        const pariid = pari.pariid
        const position = pari.position
        const { isHistorical, win, claimable, emptypool, nocontest } = state

        if (!win && !nocontest && isHistorical) {
            this.animate('group', 'hide_group', {
                onComplete: () => {
                    this.rebind(poolid, pariid)
                    this.clear()
                }
            })

            return
        }

        const [ox] = datamath.scale([pool.openPriceTimestamp], context.plotdata.timerange, context.screen.width)
        const [oy] = datamath.scaleReverse([pool.openPriceValue], context.plotdata.pricerange, context.screen.height)

        let vertical: any = null
        if (position === EPosition.Up) vertical = 0
        if (position === EPosition.Zero) vertical = oy
        if (position === EPosition.Down) vertical = context.screen.height

        const bgStyle = this.groupStyle[position]

        const [ofx, ofy] = bgStyle.offset
        const bgx = ox + ofx
        const bgy = vertical + ofy

        const [group, groupstate] = this.get('group', () => new Container(), [])
        if (groupstate.new) {
            container.sortableChildren = true
            container.addChild(group)
            group.alpha = 0
        }
        group.position.set(bgx, bgy)
        if (!isHistorical) group.zIndex = 10

        if (isHistorical) {

            if (claimable) {
                if (groupstate.animation !== 'pin_group_claimable') this.animate('group', 'hide_group_claimable')
            } else {
                if (groupstate.animation !== 'pin_group_unclaimable') this.animate('group', 'unpin_group_unclaimable')
            }

            if (!groupstate.subscribed) {
                groupstate.subscribed = true

                this.get('claimable', () => state.claimable, [state.claimable])

                context.eventTarget.addEventListener('poolpin', (e: PoolPinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)

                    const [claimable] = this.read('claimable')
                    if (claimable) this.animate('group', 'pin_group_claimable')
                    else this.animate('group', 'pin_group_unclaimable')
                })

                context.eventTarget.addEventListener('poolunpin', (e: PoolUnpinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)

                    const [claimable] = this.read('claimable')
                    if (claimable) this.animate('group', 'unpin_group_claimable')
                    else this.animate('group', 'unpin_group_unclaimable')
                })

            }

        } else {
            if (win && !emptypool) {
                this.animate('group', 'winning_group')
            } else {
                this.animate('group', 'loseing_group')
            }

        }
    }

    private updateProfit(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Graphics | Container,
        state: any,
    ): void {

        const { claimable, emptypool, nocontest, undef, win } = state

        const [profitContainer, profitContainerState] = this.get(
            'profitContainer',
            () => {
                const styles = this.profitContainerStyles[pari.position]
                const style = claimable ? styles.claimable : styles.default

                return this.createContainer(style)
            },
            [claimable]
        )
        if (profitContainerState.new) container.addChild(profitContainer)

        const [profit, profitState] = this.get('profit', () => this.createContainer(this.profitStyle), [])
        if (profitState.new || profitContainerState.new) profitContainer.addChild(profit)

        const [currency, currencyState] = this.get(
            'currency',
            () => this.createIcon(context, this.getPariCurrencyIconTextureName(context), this.currencyIconStyle),
            []
        )
        if (currencyState.new) profit.addChild(currency)

        if (!undef) {
            const [payout, payoutState] = this.get('payout', () => GraphicUtils.createText(
                0,
                this.payoutStyle.offset,
                this.payoutStyle.text,
            ), [])
            if (payoutState.new) profit.addChild(payout)

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
                payout.position.set(...this.payoutStyle.offset)
                payout.text = prizeAmount

                const [profitText, profitTextState] = this.get('profitText', () => GraphicUtils.createText(
                    'Profit',
                    this.profitTextStyle.offset,
                    this.profitTextStyle.text,
                ), [])
                if (profitTextState.new) profit.addChild(profitText)

                const [percentAmount] = this.get(
                    'percent',
                    () => ui.percent(profitPercent(prizeAmount, pari.wager)),
                    [prizeAmount, pari.wager]
                )
                const [percentText, percentTextState] = this.get('percentText', () => GraphicUtils.createText(
                    percentAmount,
                    this.percentStyle.offset,
                    this.percentStyle.text,
                ), [])
                if (percentTextState.new) {
                    profit.addChild(percentText)
                }
                percentText.text = percentAmount
            } else {
                this.clear('profitText')
                this.clear('percentText')

                let payoutAmount: any = 0

                if (pari.claimed) {
                    payoutAmount = ui.erc20(pari.payout)
                } else if (nocontest || emptypool) {
                    payoutAmount = ui.erc20(pari.wager)
                }

                const [ofx] = this.payoutStyle.offset
                payout.position.set(ofx, (profit.height-payout.height)/2)
                payout.text = payoutAmount
            }
        }

    }

    private updateClaim(
        pool: any,
        pari: any,
        context: RenderingContext,
        state: any,
    ): void {
        const { claimable, emptypool, isHistorical } = state

        if (claimable) {
            const poolid = pool.poolid
            const pariid = pari.pariid
            const erc20 = pari.erc20

            const [profitContainer, profitContainerState] = this.read('profitContainer')
            const [claim, claimState] = this.get('claim', () => this.createClaim(), [])
            if (claimState.new || profitContainerState.new) profitContainer.addChild(claim)
            if (claimState.new) {
                this.get('resolved', () => pool.resolved, [pool.resolved])
                this.get('settlement', () => context.settlements?.[pool.endDate], [context.settlements?.[pool.endDate]])
                this.get('nocontest', () => state.nocontest, [state.nocontest])

                claim.interactive = true
                claim.cursor = 'pointer'
                claim.addEventListener('pointerover', (e) => {
                    this.rebind(poolid, pariid)
                    // this.animate('claim', 'hover_claim')
                    context.eventTarget.dispatchEvent(new PoolHoverEvent(poolid, e))
                })
                claim.addEventListener('pointerout', (e) => {
                    this.rebind(poolid, pariid)
                    // this.animate('claim', 'unhover_claim')
                    context.eventTarget.dispatchEvent(new PoolUnhoverEvent(poolid, e))
                })
                claim.addEventListener('pointertap', (e) => {
                    this.rebind(poolid, pariid)
                    // this.animate('claim', 'tab_claim')
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

            if (isHistorical && !claimState.subscribed) {
                claimState.subscribed = true

                context.eventTarget.addEventListener('poolpin', (e: PoolPinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)

                    const [claim] = this.read('claim')
                    if (claim) claim.interactive = true
                })

                context.eventTarget.addEventListener('poolunpin', (e: PoolUnpinEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)

                    const [claim] = this.read('claim')
                    if (claim) claim.interactive = false
                })

            }
        } else {
            this.clear('claim')
            this.clear('resolved')
            this.clear('settlement')
            this.clear('nocontest')
        }
    }

    private updateWager(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
        state: any,
    ): void {
        const position = pari.position
        const [wager, wagerState] = this.get(
            'wager',
            () => this.createContainer(this.wagerContainerStyles[position]),
            [position]
        )
        if (wagerState.new) container.addChild(wager)

        const [wagerText, wagerTextState] = this.get('wagerText', () => GraphicUtils.createText(
            'Wager',
            this.wagerTextStyle[position].offset,
            this.wagerTextStyle[position].text,
        ), [])
        if (wagerTextState.new) wager.addChild(wagerText)

        const [wagerAmount, wagerAmountState] = this.get('wagerAmount', () => GraphicUtils.createText(
            ui.erc20(pari.wager),
            this.wagerStyle[position].offset,
            this.wagerStyle[position].text,
        ), [])
        if (wagerAmountState.new) wager.addChild(wagerAmount)
        wagerAmount.text = ui.erc20(pari.wager)
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

    private getPariCurrencyIconTextureName(context: RenderingContext): symbol {
        const key = context.metapool?.currency

        switch (key) {
            case 'PARI':
                return PARI_TEXTURE
            case 'USDC':
                return USDC_TEXTURE
            default:
                Logger.error(`currency "${key}" is not supported, fallback to Undeliden`)

                return UNKNOWN_DARK_TEXTURE
        }
    }

    private createIcon(
        context: RenderingContext,
        textureName: symbol,
        style,
    ): Container {
        const { size, offset, tint, alpha } = style

        const texture = context.textures.get(textureName)
        const icon = new Sprite(texture)

        icon.scale.set(size / icon.height)
        icon.position.set(...offset)

        if (tint) icon.tint = tint
        if (alpha) icon.alpha = alpha

        return icon
    }

    private createContainer(style: any): Container {

        const { width, height, offset: [ofx, ofy], background: backgroundStyle } = style

        const container = new Container()

        if (backgroundStyle) {
            const {
                lineStyle,
                radiuses,
                color,
            } = backgroundStyle

            const background = GraphicUtils.createRoundedRect(
                [0, 0],
                [width, height],
                radiuses,
                { color, lineStyle }
            )
            container.addChild(background)
        }

        container.position.set(ofx, ofy)

        return container
    }

    private createClaim(): Container {
        const container = this.createContainer(this.claimStyle)
        const text = GraphicUtils.createText(
            'Withdraw',
            this.claimTextStyle.offset,
            this.claimTextStyle.text,
        )
        container.addChild(text)
        text.position.set((container.width - text.width) / 2, (container.height - text.height) / 2)

        return container
    }

}
