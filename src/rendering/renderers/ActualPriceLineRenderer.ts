import config from '../../config'

import { Graphics } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class ActualPriceRenderer extends BaseRenderer {

    static readonly ACTUAL_PRICE_ID: symbol = Symbol('ACTUAL_PRICE_ID')

    private readonly lineStyle: any
    private readonly textStyle: any
    private readonly textCoverStyle: any
    private readonly pointStyle: any

    constructor(renderer: IGraphicRenderer) {
        super(renderer)
        this.lineStyle = {
            width: 2,
            color: 0x00A573,
            alpha: 1,
            join: 'round',
            cap: 'round',
        }

        this.textStyle = {
            fill: 0xFFFFFF,
            fontWeight: 500,
            fontFamily: 'Gilroy',
            fontSize: 13,
            padding: 20
        }

        this.textCoverStyle = {
            color: 0x00A573,
            childPadding: 10,
            radius: 30,
        }

        this.pointStyle = {
            color: 0xFFFFFF,
            radius: 5
        }
    }

    public get rendererId() {
        return ActualPriceRenderer.ACTUAL_PRICE_ID
    }

    protected create(
        context: RenderingContext,
    ): Graphics {


        const xdata = Object.keys(context.chartdata).map(k => Number(k))
        const ydata = Object.values(context.chartdata)

        const xrange = datamath.range(xdata)
        const yrange = datamath.range(ydata)

        const lastXData = Number(Object.keys(context.chartdata).at(-1))
        const lastYData = context.chartdata[lastXData]

        const xpercent = datamath.singlePercent(lastXData, xrange)
        const ypercent = datamath.singlePercent(lastYData, yrange)

        const { width, height } = context.screen
        const y = height * (1 - ypercent)
        const x = width * xpercent

        const { pointStyle } = this
        const point = GraphicUtils.createCircle(
            [x, y],
            pointStyle.radius,
            pointStyle.color,
        )

        const text = GraphicUtils.createText(
            lastYData.toFixed(2),
            [width, y],
            this.textStyle,
            [1.1, 0.5]
        )

        const textx = width - text.width * 1.1

        const line = GraphicUtils.createLine(
            [0, y],
            [textx, y],
            this.lineStyle
        )

        const { color, radius, childPadding } = this.textCoverStyle
        const textCover = GraphicUtils.createRoundedRect(
            [textx - childPadding / 2, y - text.height / 2],
            [text.width + childPadding, text.height],
            color,
            radius,
        )

        const result = new Graphics()
        result.addChild(line, textCover, text, point)

        return result
    }


}
