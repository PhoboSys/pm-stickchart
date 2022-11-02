import { RenderingContext } from '../..'
import { Logger } from '../../../infra'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text, Sprite } from '../../../lib/pixi'
import { isEmpty, forEach } from '../../../lib/utils'
import ui from '../../../lib/ui'
import { actualReturn, actualProfitPercent } from '../../../lib/calc-utils'
import { PoolHoverEvent, PoolUnhoverEvent } from '../../../events'

import { GraphicUtils } from '../..'
import { EPosition } from '../../../enums'

import { UP_ICON_TEXTURE, DOWN_ICON_TEXTURE, ZERO_ICON_TEXTURE, UNDEFINED_ICON_TEXTURE } from '../../textures/symbols'

import { BaseParisRenderer } from './BaseParisRenderer'

export class PariTile extends BaseParisRenderer {

    static readonly PARI_TILE_ID: symbol = Symbol('PARI_TILE_ID')

    public get rendererId(): symbol {
        return PariTile.PARI_TILE_ID
    }

    private backgroundStyle: any = {

        [EPosition.Undefined]: {
            anchor: [0, 1],
            offset: [3, -10],
            radiuses: [20, 20, 20, 20],
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
            anchor: [0, 1],
            offset: [3, -10],
            radiuses: [20, 20, 20, 20],
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
            anchor: [0, -1],
            offset: [3, -10],
            radiuses: [20, 20, 20, 20],
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
            anchor: [0, 0],
            offset: [3, -10],
            radiuses: [20, 20, 20, 20],
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
        winning: {
            pixi: {
                alpha: 1.1,
                lineColor: 0xFFFFFF,
            },
            duration: 0.5,
            ease: 'power2.out',
        },
        loseing: {
            pixi: {
                alpha: 1,
                lineColor: 0xB7BDD7,
            },
            duration: 0.5,
            ease: 'power2.out',
        },
        won: {
            pixi: {
                alpha: 1,
                lineColor: 0xFFA000,
            },
            duration: 0.5,
            ease: 'power2.out',
            new: 'set'
        },
        lost: {
            pixi: {
                alpha: 1,
                lineColor: 0xB7BDD7,
            },
            duration: 0.5,
            ease: 'power2.out',
            new: 'set'
        },
        cntlost: {
            pixi: {
                alpha: 0.6,
            },
            duration: 0.5,
            ease: 'power2.out',
            new: 'set'
        },
        fadeinwin: {
            pixi: {
                alpha: 1.3,
                zIndex: 3,
            },
            duration: 0.5,
            ease: 'back.out(4)',
            clear: true,
            new: 'set'
        },
        fadeinlose: {
            pixi: {
                alpha: 1,
                zIndex: 3,
            },
            duration: 0.5,
            ease: 'back.out(4)',
            clear: true,
            new: 'set'
        },
        hoverwin: {
            pixi: {
                alpha: 1.3,
                zIndex: 4,
            },
            duration: 0.5,
            ease: 'back.out(4)',
            clear: true,
            new: 'set'
        },
        unhoverwin: {
            pixi: {
                alpha: 1,
                zIndex: 1,
            },
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.5,
            new: 'set'
        },
        hoverlose: {
            pixi: {
                alpha: 1,
                zIndex: 4,
            },
            duration: 0.3,
            ease: 'back.out(2)',
            clear: true,
            new: 'set'
        },
        unhoverlose: {
            pixi: {
                alpha: 0,
                zIndex: 0,
            },
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.5,
            new: 'set'
        }
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

        const { timerange, paddingY: [top, bottom] } = context.plotdata
        const { openPriceTimestamp } = pool
        const [ox] = datamath.scale([openPriceTimestamp], timerange, width)

        const [group, groupstate] = this.get('group', () => new Container())
        if (groupstate.new) {
            group.alpha = 0
            container.sortableChildren = true
            container.addChild(group)
        }

        const [background, backgroundState] = this.get('background', () => this.createBackground(pari.position))
        if (backgroundState.new) group.addChild(background)

        const bgStyle = this.backgroundStyle[position]
        const [ax, ay] = bgStyle.anchor
        const [ofx, ofy] = bgStyle.offset
        const bgwidth = background.width
        const bgheight = background.height
        const bgx = ox + bgwidth * ax + ofx
        const bgy = top - bgheight * ay + ofy
        background.position.set(bgx, bgy)

        const [content, contentState] = this.get('content', () => new Container())
        if (contentState.new) {
            content.width = bgwidth
            content.height = bgheight
            group.addChild(content)
        }
        content.position.set(bgx, bgy)

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

        const rprice = this.getResolutionPricePoint(pool, context)
        const resolution = this.getPoolResolutionByPrice(pool, rprice)
        const [win] = this.get('win', () => pari.position === resolution, [resolution, pari.position])

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

            if (win) this.animate('background', 'won')
            else this.animate('background', 'lost')

            if (!win) this.animate('content', 'cntlost')

            if (win) {
                if (groupstate.animation !== 'hoverwin') this.animate('group', 'unhoverwin')
            } else {
                if (groupstate.animation !== 'hoverlose') this.animate('group', 'unhoverlose')
            }

            if (!backgroundState.subscribed) {
                backgroundState.subscribed = true

                const poolid = pool.poolid
                const pariid = pari.pariid
                context.eventTarget.addEventListener('poolhover', (e: PoolHoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)
                    const [w] = this.read('win')
                    if (w) this.animate('group', 'hoverwin')
                    else this.animate('group', 'hoverlose')
                })

                context.eventTarget.addEventListener('poolunhover', (e: PoolUnhoverEvent) => {
                    if (e.poolid !== poolid) return

                    this.rebind(poolid, pariid)
                    const [w] = this.read('win')
                    if (w) this.animate('group', 'unhoverwin')
                    else this.animate('group', 'unhoverlose')
                })

            }

        } else {

            if (win) this.animate('background', 'winning')
            else this.animate('background', 'loseing')

            if (win) this.animate('group', 'fadeinwin')
            else this.animate('group', 'fadeinlose')

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
