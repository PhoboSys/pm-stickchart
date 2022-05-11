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
            width: 2,
            alpha: 0.7,
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
                return config.style.levels.royalColors
            case ROYAL:
                return config.style.levels.silverColors
            case GOLD:
                return config.style.levels.goldColors

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

        const [cover, coverstate] = this.get<Container>('poolName', () => this.createPoolName(context))
        if (coverstate.new) {

            cover.position.y = this.coverStyle.paddingTop

            container.addChild(cover)
        }

        cover.position.x = x + this.coverStyle.paddingLeft

        const [torus, torusstate] = this.get<Graphics>('torus', () => this.createTorus(context))
        if (torusstate.new) {

            torus.position.y = cover.position.y + cover.height

            container.addChild(torus)
        }

        torus.position.x = x

        const [line, linestate] = this.get<Graphics>('dash', () => this.createDash(context))
        if (linestate.new) {

            line.position.y += torus.position.y + this.torusStyle.outerr

            container.addChild(line)
        }

        line.height = height - line.position.y - this.lineStyle.paddingBottom
        line.position.x = x

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

    private createDash(context: RenderingContext): Graphics {
        const { height } = context.screen

        const { width } = this.lineStyle

        const [gradient] = this.get<RenderTexture>(
            'resolutionDashGradient',
            () => GradientFactory.createLinearGradient(
                <Renderer>context.renderer,
                RenderTexture.create({ height, width }),
                {
                    x0: width,
                    y0: 0,
                    x1: 0,
                    y1: 0,
                    colorStops: this.getLevelGradientColors(context)
                }
            )
        )

        const { paddingBottom, paddingTop } = this.lineStyle

        const dash = GraphicUtils.createTexturedVerticalDashLine(
            0,
            [0, height - paddingBottom],
            { ...this.lineStyle, texture: gradient }
        )

        dash.position.y = paddingTop

        return dash
    }

}
