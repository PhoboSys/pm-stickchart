import config from '../../../config'
import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer, GraphicUtils } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container, Text, GradientFactory, RenderTexture, Renderer, ColorStop, Sprite, Rectangle } from '../../../lib/pixi'
import { ROYAL, SILVER, GOLD } from '../../../constants/poollevels'

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
            paddingBottom: 20
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

    private getLevelGradientColors(context: RenderingContext): ColorStop[] {
        switch (context.pool.level) {
            case SILVER:
                return config.style.levels.silverColors
            case ROYAL:
                return config.style.levels.royalColors
            case GOLD:
                return config.style.levels.goldColors

            default:
                throw Error('pool level is not supported')
        }
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

        const [cover, coverstate] = this.get('poolName', () => this.createPoolName(context))

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

        line.height = height - line.position.y - this.lineStyle.paddingBottom
        line.position.set(
            x,
            torus.position.y + this.torusStyle.outerr
        )

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

        const angle = 100

        const x0 = -angle + 20
        const y0 = 0
        const x1 = width - angle
        const y1 = -angle

        const coverGradient = GradientFactory.createLinearGradient(
            <Renderer>context.renderer,
            RenderTexture.create({ width, height }),
            {
                x0,
                y0,
                x1,
                y1,
                colorStops: this.getLevelGradientColors(context)
            },
        )

        const { radius } = this.coverStyle
        const cover = new Graphics()
            .beginTextureFill({ texture: coverGradient })
            .drawRoundedRect(0, 0, width, height, radius)
            .endFill()

        const poolname = new Container()
        poolname.addChild(cover, text)

        return poolname
    }

    private createTorus(context: RenderingContext): Graphics {
        const { innerr, outerr } = this.torusStyle

        const size = outerr * 2

        const gradient = GradientFactory.createLinearGradient(
            <Renderer>context.renderer,
            RenderTexture.create({ width: size, height: size }),
            {
                x0: 0,
                y0: size,
                x1: size,
                y1: 0,
                colorStops: this.getLevelGradientColors(context)
            },
        )

        const torus = new Graphics()
            .beginTextureFill({ texture: gradient, })
            .drawTorus!(0, 0, innerr, outerr)
            .endFill()

        return torus
    }

    private createDash(context: RenderingContext): Container {
        const { height } = context.screen
        const { paddingBottom, paddingTop } = this.lineStyle

        const [color1, color2] = this.getLevelLineColors(context)

        const dash1 = GraphicUtils.createVerticalDashLine(
            -.5,
            [0, height - paddingBottom],
            { ...this.lineStyle, color: color1 }
        )

        const dash2 = GraphicUtils.createVerticalDashLine(
            .5,
            [0, height - paddingBottom],
            { ...this.lineStyle, color: color2 }
        )

        const dash = new Container()
        dash.addChild(dash1, dash2)

        dash.position.y = paddingTop

        return dash
    }

}
