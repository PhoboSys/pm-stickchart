import { config } from '../../config'
import { Graphics } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'

export class PriceLineRenderer extends BaseRenderer {

    static readonly PRICE_LINE_ID: symbol = Symbol('PRICE_LINE_ID')

    private readonly lineStyle: any
    private readonly textStyle: any

    constructor(renderer: IGraphicRenderer) {
        super(renderer)
        this.lineStyle = {
            width: 3,
            color: 0x009797,
            alpha: 1,
            join: 'round',
            cap: 'round',
        }
        this.textStyle = {
            fill: 0xB7BDD7,
            fontWeight: 500,
            fontFamily: 'Gilroy',
            fontSize: 12,
        }
    }

    public get rendererId() {
        return PriceLineRenderer.PRICE_LINE_ID
    }

    protected create(
        context: RenderingContext,
    ): Graphics {

        const xdata = Object.keys(context.chartdata).map(k => Number(k))
        const ydata = Object.values(context.chartdata)
        const xrange = datamath.range(xdata, 0)
        const yrange = datamath.range(ydata)
        const xpercent = datamath.percent(xdata, xrange)
        const ypercent = datamath.percent(ydata, yrange)

        let result: any = null
        const { width, height } = context.screen
        for (const idx in xpercent) {
            const xp = xpercent[idx]
            const yp = ypercent[idx]

            const x = xp * width
            const y = (1 - yp) * height

            if (!result) result = GraphicUtils.startLine([x, y], this.lineStyle)
            else         result = GraphicUtils.lineTo(result, [x, y], this.lineStyle)

            if (config.debugtime) {
                result.addChild(
                    GraphicUtils.createText(
                        xdata[idx],
                        [x, y],
                        this.textStyle,
                        1
                    )
                )
            }
            if (config.debugprice) {
                result.addChild(
                    GraphicUtils.createText(
                        ydata[idx],
                        [x, y],
                        this.textStyle,
                        0
                    )
                )
            }
        }

        return result
    }


}
