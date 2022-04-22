import config from '../../config'

import { Graphics } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class LatestPricePointRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_POINT_ID: symbol = Symbol('LATEST_PRICE_POINT_ID')

    private readonly outerPointStyle: any
    private readonly innerPointStyle: any

    constructor(renderer: IGraphicRenderer) {
        super(renderer)

        this.innerPointStyle = {
            color: 0xFFFFFF,
            radius: 4
        }

        this.outerPointStyle = {
            color: 0x00A573,
            radius: 10
        }
    }

    public get rendererId() {
        return LatestPricePointRenderer.LATEST_PRICE_POINT_ID
    }

    protected create(
        context: RenderingContext,
    ): Graphics {
        const {
            xdata,
            ydata,

            xrange,
            yrange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const lastXData = Number(xdata.at(-1))
        const lastYData = Number(ydata.at(-1))

        const [x] = datamath.scale([lastXData], xrange, width)
        const [yr] = datamath.scale([lastYData], yrange, height)
        const y = height - yr

        const outerpoint = GraphicUtils.createCircle(
            [x, y],
            this.outerPointStyle.radius,
            this.outerPointStyle
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
