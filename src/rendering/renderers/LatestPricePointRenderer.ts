import {
    IGraphicRenderer,
    RenderingContext,
    BaseRenderer,
    GraphicUtils,
} from '..'
import config from '../../config'

import datamath from '../../lib/datamath'
import { Graphics } from '../../lib/pixi'

export class LatestPricePointRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_POINT_ID: symbol = Symbol('LATEST_PRICE_POINT_ID')

    private readonly outerPointStyle: any

    private readonly innerPointStyle: any

    constructor(renderer: IGraphicRenderer) {
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

    protected create(
        context: RenderingContext,
    ): Graphics {
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

        const outerpoint = GraphicUtils.createCircle(
            [x, y],
            this.outerPointStyle.radius,
            this.outerPointStyle,
        )

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
