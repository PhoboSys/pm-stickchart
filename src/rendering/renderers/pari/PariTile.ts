import { RenderingContext } from '../..'
import { Logger } from '../../../infra'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text, Sprite } from '../../../lib/pixi'
import { isEmpty, forEach } from '../../../lib/utils'
import ui from '../../../lib/ui'
import { actualReturn, actualProfitPercent } from '../../../lib/calc-utils'

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
            offset: [8, -10],
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
            offset: [8, -10],
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
            offset: [8, -10],
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
            offset: [8, -10],
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
        offset: [60, 22]
    }

	private titlewagerStyle: any = {
        text: {
            fill: 0xB7BDD7,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 13,
        },
        offset: [60, 10]
    }

	private prizeStyle: any = {
        text: {
            fill: 0xFFFFFF,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 16,
        },
        offset: [-22, 22],
        anchor: [1, 0]
    }

    private profitStyle: any = {
        text: {
            fill: 0xB7BDD7,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 13,
        },
        offset: [-22, 10],
        anchor: [1, 0]
    }

    private titleprofitStyle: any = {
        text: {
            fill: 0xB7BDD7,
            fontWeight: 400,
            fontFamily: 'Gilroy',
            fontSize: 13,
        },
        offset: [-28, 10],
        anchor: [1, 0]
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

        const bgStyle = this.backgroundStyle[position]
        const [background, backgroundState] = this.get('background', () => this.createBackground(pari.position))
        if (backgroundState.new) container.addChild(background)

        const [ax, ay] = bgStyle.anchor
        const [ofx, ofy] = bgStyle.offset
        const bgwidth = background.width
        const bgheight = background.height
        const bgx = ox + bgwidth * ax + ofx
        const bgy = top - bgheight * ay + ofy
        background.position.set(bgx, bgy)

        const [icon, iconState] = this.get('icon', () => this.createIcon(context, pari.position))
        if (iconState.new) background.addChild(icon)

        const [wager, wagerState] = this.get('wager', () =>
            GraphicUtils.createText(
                pari.wager,
                this.wagerStyle.offset,
                this.wagerStyle.text,
            )
        )
        if (wagerState.new) background.addChild(wager)
        wager.text = pari.wager

        const [titlewager, titlewagerState] = this.get('titlewager', () =>
            GraphicUtils.createText(
                'Wager',
                this.titlewagerStyle.offset,
                this.titlewagerStyle.text,
            )
        )
        if (titlewagerState.new) background.addChild(titlewager)

        const [prizeAmount] = this.get(
            'prizeAmount',
            () => actualReturn(pool.prizefunds, pari.wager, pari.position),
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
        if (prizeState.new) background.addChild(prize)
        prize.text = prizeAmount

        const [profitPercent] = this.get(
            'profitPercent',
            () => actualProfitPercent(pool.prizefunds, pari.wager, pari.position),
            [pari.wager, pool.prizefunds]
        )
        const [ptox, ptoy] = this.profitStyle.offset
        const [profit, profitState] = this.get('profit', () =>
            GraphicUtils.createText(
                profitPercent + '%',
                [
                    bgwidth + ptox,
                    ptoy,
                ],
                this.profitStyle.text,
                this.profitStyle.anchor
            )
        )
        if (profitState.new) background.addChild(profit)
        profit.text = profitPercent + '%'

        const [tptox, tptoy] = this.titleprofitStyle.offset
        const [titleprofit, titleprofitState] = this.get('titleprofit', () =>
            GraphicUtils.createText(
                'Profit',
                [
                    bgwidth + tptox - profit.width,
                    tptoy,
                ],
                this.titleprofitStyle.text,
                this.titleprofitStyle.anchor
            )
        )
        if (titleprofitState.new) background.addChild(titleprofit)

        titleprofit.position.set(
            bgwidth + tptox - profit.width,
            tptoy,
        )
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
        return background
    }

}
