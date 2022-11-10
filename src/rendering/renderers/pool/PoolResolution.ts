import config from '../../../config'
import { Logger } from '../../../infra'
import { RenderingContext } from '../..'
import { GraphicUtils } from '../..'

import { nowUnixTS } from '../../../lib/utils'
import datamath from '../../../lib/datamath'
import { Graphics, Container, Text, Sprite } from '../../../lib/pixi'

import { SILVER, GOLD, ROYAL } from '../../../constants/poollevels'
import { SILVER_LEVEL_TEXTURE, GOLD_LEVEL_TEXTURE, ROYAL_LEVEL_TEXTURE } from '../../textures/symbols'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolResolution extends BasePoolsRenderer {

    static readonly POOL_RESOLUTION_ID: symbol = Symbol('POOL_RESOLUTION_ID')

    private lineStyle: any = {
        width: 1,
        join: 'round',
        cap: 'round',
        gap: 10,
        dash: 10,
    }

    private textStyle: any = {
        fontWeight: 600,
        fontFamily: 'Gilroy',
        fontSize: 12,
        fill: 0x22273F
    }

    private coverStyle: any = {
        paddingx: 10,
        paddingy: 5,

        paddingTop: 10,
        paddingLeft: 10,

        radiuses: [8, 8, 8, 2],
    }

    public get rendererId(): symbol {
        return PoolResolution.POOL_RESOLUTION_ID
    }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        if (this.isHistoricalPool(pool, context)) return this.clear()

        this.updateActualPool(pool, context, container)

    }

    private updateActualPool(
        pool: any,
        context: RenderingContext,
        container: Container
    ): void {

        const {
            width,
            height
        } = context.screen

        const { timerange } = context.plotdata
        const [x] = datamath.scale([pool.resolutionDate], timerange, width)

        const [title, titlestate] = this.get('title', () => this.createTitle(context))

        title.position.set(
            x + this.coverStyle.paddingLeft,
            this.coverStyle.paddingTop
        )
        if (titlestate.new) container.addChild(title)

        const [line, linestate] = this.get('line', () => this.createLine(context))

        line.position.x = x
        line.height = height

        if (linestate.new) container.addChild(line)

    }

    private createTitle(context: RenderingContext): Container {
        const { paddingx, paddingy } = this.coverStyle

        const text = new Text('Resolution', this.textStyle)
        text.position.set(paddingx, paddingy)

        const width = text.width + paddingx * 2
        const height = text.height + paddingy * 2

        const textureName = this.getLevelTextureName(context)
        const gradient = context.textures.get(textureName, { width, height })

        const { radiuses } = this.coverStyle
        const cover = GraphicUtils.createRoundedRect(
            [0, 0],
            [width, height],
            radiuses,
            { texture: gradient }
        )

        const title = new Container()
        title.addChild(cover, text)

        return title
    }

    private createLine(context: RenderingContext): Container {
        const { height } = context.screen
        const { width } = this.lineStyle

        const [color1, color2] = this.getLevelLineColors(context)

        const dash1 = GraphicUtils.createVerticalDashLine(
            -width/2,
            [0, height],
            { ...this.lineStyle, color: color1 }
        )

        const dash2 = GraphicUtils.createVerticalDashLine(
            width/2,
            [0, height],
            { ...this.lineStyle, color: color2 }
        )

        const dash = new Container()
        dash.addChild(dash1, dash2)

        return dash
    }

    private getLevelLineColors(context: RenderingContext): number[] {

        switch (context.metapool?.level) {
            case SILVER:
                return config.style.levels.silverLineColors
            case GOLD:
                return config.style.levels.goldLineColors
            case ROYAL:
                return config.style.levels.royalLineColors

            default:
                Logger.error(`metapool level "${context.metapool?.level}" is not supported, fallback to SILVER`)
                return config.style.levels.silverLineColors
        }

    }

    private getLevelTextureName(context: RenderingContext): symbol {

        switch (context.metapool?.level) {
            case SILVER:
                return SILVER_LEVEL_TEXTURE
            case GOLD:
                return GOLD_LEVEL_TEXTURE
            case ROYAL:
                return ROYAL_LEVEL_TEXTURE

            default:
                Logger.error(`metapool level "${context.metapool?.level}" is not supported, fallback to SILVER`)
                return SILVER_LEVEL_TEXTURE
        }

    }

}
