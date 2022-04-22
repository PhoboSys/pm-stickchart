import config from '../../config'

import { Graphics } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class LatestPriceLineRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_LINE_ID: symbol = Symbol('LATEST_PRICE_LINE_ID')

    private readonly lineStyle: any
    private readonly textCoverStyle: any

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

        this.textCoverStyle = {
            color: 0x00A573,
            paddingx: 10,
            paddingy: 5,
            anchorx: 1.1,
            anchory: 0.5,
            radius: 30,
            textstyle: {
                fill: 0xFFFFFF,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                fontSize: 13,
            }
        }
    }

    public get rendererId() {
        return LatestPriceLineRenderer.LATEST_PRICE_LINE_ID
    }

    protected create(
        context: RenderingContext,
    ): Graphics {


        const {
            ydata,
            yrange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const lastYData = Number(ydata.at(-1))
        const [yr] = datamath.scale([lastYData], yrange, height)
        const y = height - yr

        const coveredText = GraphicUtils.createCoveredText(
            lastYData.toFixed(3),
            [width, y],
            this.textCoverStyle,
        )

        const coverx = coveredText.x + coveredText.children[0].x
        const line = GraphicUtils.createLine(
            [0, y],
            [coverx - this.lineStyle.paddingx, y],
            this.lineStyle
        )

        const result = new Graphics()
        result.addChild(line, coveredText)
        return result
    }


}
