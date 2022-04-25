import config from '../../config'

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
            width: config.style.linesize,
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

        const { width, height } = context.screen
        const { xdata, xrange, ydata, yrange } = context.plotdata

        const xs = datamath.scale(xdata, xrange, width)
        const ys = datamath.scale(ydata, yrange, height)

        let result: any = null
        let prevY: any = null
        for (const idx in xs) {

            const x = xs[idx]
            const y = height - ys[idx]

            if (!result) {
                result = GraphicUtils.startLine([x, y], this.lineStyle)
                prevY = y
            } else {
                result = GraphicUtils.lineTo(result, [x, prevY], this.lineStyle)
                result = GraphicUtils.lineTo(result, [x, y], this.lineStyle)
                prevY = y
            }

            if (config.debuglatest && +idx+1 === xs.length) {
                result.addChild(
                    GraphicUtils.createText(
                        xdata[idx],
                        [x, y],
                        this.textStyle,
                        1
                    ),
                    GraphicUtils.createText(
                        ydata[idx],
                        [x, y],
                        this.textStyle,
                        0
                    )
                )
            }
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
