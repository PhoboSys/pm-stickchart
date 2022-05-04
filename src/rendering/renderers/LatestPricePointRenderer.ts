import { IGraphicStorage, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'
import config from '../../config'

import datamath from '../../lib/datamath'
import { Graphics, Container, AnimatedSprite } from '../../lib/pixi'
import { LATEST_PRICE_POINT_TEXTURES } from '../textures/symbols';

export class LatestPricePointRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_POINT_ID: symbol = Symbol('LATEST_PRICE_POINT_ID')

    private readonly outerPointStyle: any

    private readonly innerPointStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.innerPointStyle = {
            color: 0xFFFFFF,
            radius: 4,
        }

        this.outerPointStyle = {
            color: config.style.linecolor,
            radius: 10,
        }
    }

    public get rendererId(): symbol {
        return LatestPricePointRenderer.LATEST_PRICE_POINT_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        const {
            xlast,
            ylast,

            xrange,
            yrange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const [x] = datamath.scale([xlast], xrange, width)
        const [yr] = datamath.scale([ylast], yrange, height)
        const y = height - yr

        const outerpoint = new AnimatedSprite(
            context.textures.get(LATEST_PRICE_POINT_TEXTURES) as [],
            true,
        )

        outerpoint.position.set(x, y)
        outerpoint.anchor.set(0.5)
        outerpoint.animationSpeed = 0.5
        outerpoint.play()

        const innerpoint = GraphicUtils.createCircle(
            [x, y],
            this.innerPointStyle.radius,
            this.innerPointStyle,
        )

        const result = new Graphics()

        result.addChild(outerpoint, innerpoint)

        return result
    }

}
