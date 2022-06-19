import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'

import config from '@config'
import datamath from '@lib/datamath'
import { Container, Text } from '@lib/pixi'
import { ROYAL, SILVER, GOLD } from '@constants'
import * as TEXTURE_NAMES from '@rendering'
export class PoolResolutionRenderer extends BaseRenderer {

    static readonly POOL_RESOLUTION_ID: symbol = Symbol('POOL_RESOLUTION_ID')

    private _lastLevel: any

    private lineStyle: any

    private textStyle: any

    private coverStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.coverStyle = {
            paddingx: 10,
            paddingy: 5,

            paddingTop: 30,
            paddingLeft: 10,

            radiuses: [8, 8, 8, 2],
        }

        this.textStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
            fill: 0x22273F
        }

        this.lineStyle = {
            width: 1,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,
        }
    }

    public get rendererId(): symbol {
        return PoolResolutionRenderer.POOL_RESOLUTION_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (!context.pool) {
            container.alpha = 0

            return container
        }

        container.alpha = 1

        if (this._lastLevel !== context.pool.level) {
            this.clear()
        }

        this.updatePoolBorder(context, container)

        this._lastLevel = context.pool.level

        return container
    }

    private getLevelLineColors(context: RenderingContext): number[] {
        switch (context.pool.level) {
            case SILVER:
                return config.style.levels.silverLineColors
            case ROYAL:
                return config.style.levels.royalLineColors
            case GOLD:
                return config.style.levels.goldLineColors

            default:
                throw Error('pool level is not supported')
        }
    }

    private updatePoolBorder(context: RenderingContext, container: Container): Container {
        const {
            width,
            height
        } = context.screen

        const { timerange } = context.plotdata
        const [x] = datamath.scale([context.pool.resolutionDate], timerange, width)

        const [cover, coverstate] = this.get('cover', () => this.createPoolName(context))

        cover.position.set(
            x + this.coverStyle.paddingLeft,
            this.coverStyle.paddingTop
        )

        const [line, linestate] = this.get('dash', () => this.createDash(context))

        line.position.x = x
        line.height = height

        if (coverstate.new) container.addChild(cover)
        if (linestate.new) container.addChild(line)

        return container
    }

    private createPoolName(context: RenderingContext): Container {
        const { paddingx, paddingy } = this.coverStyle

        const text = new Text('Resolution', this.textStyle)
        text.position.set(paddingx, paddingy)

        const width = text.width + paddingx * 2
        const height = text.height + paddingy * 2

        const textureName = TEXTURE_NAMES[`${context.pool.level}_LEVEL_TEXTURE`]
        const gradient = context.textures.get(textureName, { width, height })

        const { radiuses } = this.coverStyle
        const cover = GraphicUtils.createRoundedRect(
            [0, 0],
            [width, height],
            radiuses,
            { texture: gradient }
        )

        const poolname = new Container()
        poolname.addChild(cover, text)

        return poolname
    }

    private createDash(context: RenderingContext): Container {
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

}
