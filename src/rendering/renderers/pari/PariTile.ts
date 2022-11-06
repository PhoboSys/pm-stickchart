import { RenderingContext } from '../..'
import { Logger } from '../../../infra'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text, Sprite } from '../../../lib/pixi'
import { isEmpty, forEach } from '../../../lib/utils'
import ui from '../../../lib/ui'
import { actualReturn, actualProfitPercent } from '../../../lib/calc-utils'
import { PoolHoverEvent, PoolUnhoverEvent, ClaimPariEvent, SettlePoolEvent } from '../../../events'

import { GraphicUtils } from '../..'
import { EPosition } from '../../../enums'

import { UP_ICON_TEXTURE, DOWN_ICON_TEXTURE, ZERO_ICON_TEXTURE, UNDEFINED_ICON_TEXTURE } from '../../textures/symbols'

import { BaseParisRenderer } from './BaseParisRenderer'

export class PariTile extends BaseParisRenderer {

    static readonly PARI_TILE_ID: symbol = Symbol('PARI_TILE_ID')

    public get rendererId(): symbol {
        return PariTile.PARI_TILE_ID
    }

    private buttonStyle: any = {

        [EPosition.Undefined]: {
            size: 50,
            color: 0xFFA000,
            offset: [30, 0],
            outside: [1, 0.5]
        },

        [EPosition.Up]: {
            size: 50,
            color: 0xFFA000,
            offset: [30, 0],
            outside: [1, 0.5]
        },

        [EPosition.Down]: {
            size: 50,
            color: 0xFFA000,
            offset: [30, 0],
            outside: [1, 0.5]
        },

        [EPosition.Zero]: {
            size: 50,
            color: 0xFFA000,
            offset: [30, 0],
            outside: [1, 0.5]
        }

    }

    private backgroundStyle: any = {

        [EPosition.Undefined]: {
            anchor: [-1, 1],
            offset: [-3, -10],
            radiuses: [20, 0, 0, 20],
            color: 0x22273F,
            width: 300,
            height: 62,
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
                alpha: 1,
            }
        },

        [EPosition.Up]: {
            anchor: [-1, 1],
            offset: [-3, -10],
            radiuses: [20, 0, 0, 20],
            color: 0x22273F,
            width: 300,
            height: 62,
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
                alpha: 1,
            }
        },

        [EPosition.Down]: {
            anchor: [-1, -1],
            offset: [-3, -10],
            radiuses: [20, 0, 0, 20],
            color: 0x22273F,
            width: 300,
            height: 62,
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
                alpha: 1,
            }
        },

        [EPosition.Zero]: {
            anchor: [-1, 0],
            offset: [-3, -10],
            radiuses: [20, 0, 0, 20],
            color: 0x22273F,
            width: 300,
            height: 62,
            lineStyle: {
                color: 0xB7BDD7,
                width: 2,
                alpha: 1,
            }
        }

    }

    private iconStyle: any = {
        size: 30,
        offset: [16, 16]
    }

	private wagerStyle: any = {
        text: {
            fill: 0xFFFFFF,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 16,
        },
        offset: [60, 28]
    }

	private titlewagerStyle: any = {
        text: {
            fill: 0xB7BDD7,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 13,
        },
        offset: [60, 16]
    }

	private prizeStyle: any = {
        text: {
            fill: 0xFFFFFF,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 16,
        },
        offset: [-22, 28],
        anchor: [1, 0]
    }

    private profitStyle: any = {
        text: {
            fill: 0xB7BDD7,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 13,
        },
        offset: [-22, 16],
        anchor: [1, 0]
    }

    private titleprofitStyle: any = {
        text: {
            fill: 0xB7BDD7,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 13,
        },
        offset: [-22, 16],
        anchor: [1, 0]
    }

    private configAnimations: any = {
        winning_bg: {
            pixi: {
                alpha: 1.2,
            },
            duration: 0.5,
            ease: 'back.out(4)',
        },
        loseing_bg: {
            pixi: {
                alpha: 1,
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

        this.updateTile(pool, pari, context, container)

    }

    private updateTile(
        pool: any,
        pari: any,
        context: RenderingContext,
        container: Container,
    ): void {
        const position: EPosition = pari.position in EPosition ? pari.position : EPosition.Undefined

        const {
            width,
            height,
        } = context.screen

        const poolid = pool.poolid
        const pariid = pari.pariid

        const { timerange, paddingY: [top, bottom] } = context.plotdata
        const { openPriceTimestamp } = pool
        const [ox] = datamath.scale([openPriceTimestamp], timerange, width)

        const bgStyle = this.backgroundStyle[position]
        const [ax, ay] = bgStyle.anchor
        const [ofx, ofy] = bgStyle.offset
        const bgwidth = bgStyle.width
        const bgheight = bgStyle.height
        const bgx = ox + bgwidth * ax + ofx
        const bgy = top - bgheight * ay + ofy

        const [group, groupstate] = this.get('group', () => new Container())
        if (groupstate.new) {
            group.alpha = 0

            group.width = bgwidth
            group.height = bgheight

            container.sortableChildren = true
            container.addChild(group)
        }
        group.position.set(bgx, bgy)

        const [background, backgroundState] = this.get('background', () => this.createBackground(pari.position))
        if (backgroundState.new) group.addChild(background)

        const [content, contentState] = this.get('content', () => new Container())
        if (contentState.new) group.addChild(content)

        const [icon, iconState] = this.get('icon', () => this.createIcon(context, pari.position))
        if (iconState.new) content.addChild(icon)

        const [wager, wagerState] = this.get('wager', () =>
            GraphicUtils.createText(
                ui.erc20(pari.wager),
                this.wagerStyle.offset,
                this.wagerStyle.text,
            )
        )
        if (wagerState.new) content.addChild(wager)
        wager.text = ui.erc20(pari.wager)

        const [titlewager, titlewagerState] = this.get('titlewager', () =>
            GraphicUtils.createText(
                'Wager',
                this.titlewagerStyle.offset,
                this.titlewagerStyle.text,
            )
        )
        if (titlewagerState.new) content.addChild(titlewager)

        const [tptox, tptoy] = this.titleprofitStyle.offset
        const [titleprofit, titleprofitState] = this.get('titleprofit', () =>
            GraphicUtils.createText(
                'Profit',
                [
                    bgwidth + tptox,
                    tptoy,
                ],
                this.titleprofitStyle.text,
                this.titleprofitStyle.anchor
            )
        )
        if (titleprofitState.new) content.addChild(titleprofit)

        const rprice = this.getResolutionPricePoint(pool, context)
        const resolution = this.getPoolResolutionByPrice(pool, rprice)
        const win = pari.position === resolution
        if (win) {
            this.clear('zero')

            const [prizeAmount] = this.get(
                'prizeAmount',
                () => ui.erc20(actualReturn(pool.prizefunds, pari.wager, pari.position)),
                [pari.wager, pool.prizefunds]
            )

            const [pzox, pzoy] = this.prizeStyle.offset
            const [prize, prizeState] = this.get('prize', () =>
                GraphicUtils.createText(
                    prizeAmount,
                    [
                        bgwidth + pzox,
                        pzoy,
                    ],
                    this.prizeStyle.text,
                    this.prizeStyle.anchor
                )
            )
            if (prizeState.new) content.addChild(prize)
            prize.text = prizeAmount

            const [profitPercent] = this.get(
                'profitPercent',
                () => ui.percent(actualProfitPercent(pool.prizefunds, pari.wager, pari.position)),
                [pari.wager, pool.prizefunds]
            )

            const [ptox, ptoy] = this.profitStyle.offset
            const [profit, profitState] = this.get('profit', () =>
                GraphicUtils.createText(
                    profitPercent,
                    [
                        bgwidth + ptox,
                        ptoy,
                    ],
                    this.profitStyle.text,
                    this.profitStyle.anchor
                )
            )
            if (profitState.new) content.addChild(profit)
            profit.text = profitPercent

            titleprofit.position.set(
                bgwidth + tptox - profit.width - 4, // 4px padding
                tptoy,
            )

        } else {
            this.clear('prize')
            this.clear('profit')

            const [pzox, pzoy] = this.prizeStyle.offset
            const [zero, zeroState] = this.get('zero', () =>
                GraphicUtils.createText(
                    0,
                    [
                        bgwidth + pzox,
                        pzoy,
                    ],
                    this.prizeStyle.text,
                    this.prizeStyle.anchor
                )
            )
            if (zeroState.new) content.addChild(zero)

            titleprofit.position.set(
                bgwidth + tptox,
                tptoy,
            )
        }

        if (this.isHistoricalPool(pool, context)) {

            if (win) {
                this.animate('background', 'won_bg')
            } else {
                this.animate('background', 'lost_bg')
                this.animate('content', 'lost_contnet')
            }

            const [claimable] = this.get('claimable', () => win && !pari.claimed, [win, pari.claimed])

            if (claimable) {
                if (groupstate.animation !== 'hover_group_claimable') this.animate('group', 'unhover_group_claimable')
            } else {
                if (groupstate.animation !== 'hover_group_unclaimable') this.animate('group', 'unhover_group_unclaimable')
            }

            if (claimable) {
                const [resolved] = this.get('resolved', () => pool.resolved, [pool.resolved])
                const [settlement] = this.get('settlement', () => context.settlements?.[pool.poolid], [context.settlements?.[pool.poolid]])

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
                        this.animate('group', 'hover_group_claimable')
                        this.animate('claim', 'hover_claim')
                    })
                    claim.addEventListener('pointerout', (e) => {
                        this.rebind(poolid, pariid)
                        this.animate('group', 'unhover_group_claimable')
                        this.animate('claim', 'unhover_claim')
                    })
                    claim.addEventListener('pointertap', (e) => {
                        this.rebind(poolid, pariid)
                        this.animate('claim', 'tab_paybtn')
                        const [rslvd] = this.read('resolved')
                        const [sttlmnt] = this.read('settlement')

                        if (rslvd) {
                            context.eventTarget.dispatchEvent(
                                new ClaimPariEvent(pari, e)
                            )
                        }

                        if (!rslvd && sttlmnt) {
                            context.eventTarget.dispatchEvent(
                                new SettlePoolEvent(pool, sttlmnt.resolutionPrice, sttlmnt.controlPrice, e)
                            )
                        }
                    })
                }

                claim.position.set(
                    btnx + bgwidth * horizontal,
                    btny + bgheight * vertical,
                )

                const [claim_img, claimimgState] = this.get('claim_img', () => new Graphics(), [resolved, pari.claimed])
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

                context.eventTarget.addEventListener('poolhover', (e: PoolHoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)
                    const [clble] = this.read('claimable')
                    if (clble) this.animate('group', 'hover_group_claimable')
                    else this.animate('group', 'hover_group_unclaimable')
                })

                context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)
                    const [clble] = this.read('claimable')
                    if (clble) this.animate('group', 'unhover_group_claimable')
                    else this.animate('group', 'unhover_group_unclaimable')
                })

            }

        } else {

            if (win) {
                this.animate('background', 'winning_bg')
                this.animate('group', 'winning_group')
            } else {
                this.animate('background', 'loseing_bg')
                this.animate('group', 'loseing_group')
            }

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

    private createIcon(
        context: RenderingContext,
        position: EPosition,
    ): Container {
        const textureName = this.getPositionIconTextureName(position)
        const texture = context.textures.get(textureName)
        const icon = new Sprite(texture)
        icon.scale.set(this.iconStyle.size / icon.height)
        icon.position.set(...this.iconStyle.offset)
        return icon
    }

    private createBackground(position: EPosition): Container {
        const { radiuses, color, width, height, lineStyle, anchor } = this.backgroundStyle[position]
        const background = GraphicUtils.createRoundedRect(
            [0, 0],
            [width, height],
            radiuses,
            { color, lineStyle }
        )
        background.alpha = 0
        return background
    }

}
