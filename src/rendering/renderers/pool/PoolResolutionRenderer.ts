import config from '../../../config'
import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text } from '../../../lib/pixi'
import { ROYAL, SILVER, GOLD } from '../../../constants/poollevels'
import * as TEXTURE_NAMES from '../../textures/symbols'
export class PoolResolutionRenderer extends BaseRenderer {

    static readonly POOL_RESOLUTION_ID: symbol = Symbol('POOL_RESOLUTION_ID')

    private _lastLevel: any

    private lineStyle: any

    private torusStyle: any

    private textStyle: any

    private coverStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.coverStyle = {
            paddingx: 10,
            paddingy: 5,

            paddingTop: 30,
            paddingLeft: 10,

            radius: 8,
        }

        this.textStyle = {
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 12,
        }

        this.torusStyle = {
            innerr: 2.5,
            outerr: 5,

            paddingTop: 5,
        }

        this.lineStyle = {
            width: 1,
            join: 'round',
            cap: 'round',
            gap: 10,
            dash: 10,

            paddingTop: 5,
            paddingBottom: 30
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

        const [torus, torusstate] = this.get('torus', () => this.createTorus(context))

        torus.position.set(
            x,
            cover.position.y + cover.height
        )

        const [line, linestate] = this.get('dash', () => this.createDash(context))

        line.position.set(
            x,
            torus.position.y + this.torusStyle.outerr
        )
        line.height = height - line.position.y - this.lineStyle.paddingBottom

        if (coverstate.new) container.addChild(cover)
        if (torusstate.new) container.addChild(torus)
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
        const gradient = context.textures.get(textureName, { width, height, angle: 100 })

        const { radius } = this.coverStyle
        const cover = new Graphics()
            .beginTextureFill({ texture: gradient })
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill()

        const poolname = new Container()
        poolname.addChild(cover, text)

        return poolname
    }

    private createTorus(context: RenderingContext): Graphics {
        const { innerr, outerr } = this.torusStyle

        const size = outerr * 2
        const textureName = TEXTURE_NAMES[`${context.pool.level}_LEVEL_TEXTURE`]
        const gradient = context.textures.get(textureName, { width: size, height: size, angle: 5 })

        const torus = new Graphics()
            .beginTextureFill({ texture: gradient, })
            .drawTorus!(0, 0, innerr, outerr)
            .endFill()

        return torus
    }

    private createDash(context: RenderingContext): Container {
        const { height } = context.screen
        const { paddingBottom, paddingTop, width } = this.lineStyle

        const [color1, color2] = this.getLevelLineColors(context)

        const dash1 = GraphicUtils.createVerticalDashLine(
            -width/2,
            [0, height - paddingBottom],
            { ...this.lineStyle, color: color1 }
        )

        const dash2 = GraphicUtils.createVerticalDashLine(
            width/2,
            [0, height - paddingBottom],
            { ...this.lineStyle, color: color2 }
        )

        const dash = new Container()
        dash.addChild(dash1, dash2)

        dash.position.y = paddingTop

        return dash
    }

}
