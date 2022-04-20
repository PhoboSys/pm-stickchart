import config from '../../config'

import { Graphics } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class LatestPriceRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_ID: symbol = Symbol('LATEST_PRICE_ID')

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
            paddingx: 6,
        }

        this.textStyle = {
            fill: 0xFFFFFF,
            fontWeight: 600,
            fontFamily: 'Gilroy',
            fontSize: 13,
            padding: 20,
            anchorx: 1.5,
            anchory: 0.5,
        }

        this.textCoverStyle = {
            color: 0x00A573,
            childPadding: 10,
            paddingx: 10,
            paddingy: 5,
            radius: 30,
        }

        this.pointStyle = {
            color: 0xFFFFFF,
            radius: 5
        }
    }

    public get rendererId() {
        return LatestPriceRenderer.LATEST_PRICE_ID
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

        const lastXData = Number(ydata.at(-1))
        const lastYData = Number(ydata.at(-1))
        const [x] = datamath.scale([lastXData], xrange, width)
        const [yr] = datamath.scale([lastYData], yrange, height)
        const y = height - yr

        const point = GraphicUtils.createCircle(
            [x, y],
            this.pointStyle.radius,
            this.pointStyle.color,
        )

        const { anchorx, anchory } = this.textStyle
        const text = GraphicUtils.createText(
            lastYData.toFixed(3),
            [width, y],
            this.textStyle,
            [anchorx, anchory]
        )

        const textx = width - text.width * anchorx
        const texty = y - text.height * anchory

        const { paddingx, paddingy } = this.textCoverStyle
        const coverx = textx - paddingx
        const covery = texty- paddingy
        const textCover = GraphicUtils.createRoundedRect(
            [
                coverx,
                covery,
            ],
            [
                text.width + paddingx * 2,
                text.height + paddingy * 2,
            ],
            this.textCoverStyle.color,
            this.textCoverStyle.radius,
        )

        const line = GraphicUtils.createLine(
            [0, y],
            [coverx - this.lineStyle.paddingx, y],
            this.lineStyle
        )


        const result = new Graphics()

        result.addChild(line, textCover, text, point)

        return result
    }


}
