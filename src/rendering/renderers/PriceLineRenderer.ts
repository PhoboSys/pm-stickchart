import config from '../../config'

import { Graphics } from '../../lib/pixi'
import datamath from '../../lib/datamath'

import { IGraphicRenderer, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'
import { PRICE_LINE_TEXTURE } from '..'

export class PriceLineRenderer extends BaseRenderer {

    static readonly PRICE_LINE_ID: symbol = Symbol('PRICE_LINE_ID')

    private readonly lineStyle: any
    private readonly textStyle: any

    constructor(renderer: IGraphicRenderer) {
        super(renderer)
        this.lineStyle = {
            width: config.style.linesize,
            color: config.style.linecolor,
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

        let result: Graphics = new Graphics()
        let shape: number[] = []
        let prevY: any = null
        let prevX: any = null

        for (const idx in xs) {
            const x = xs[idx]
            const y = height - ys[idx]

            if (+idx === 0) {
                result = GraphicUtils.startLine([x, y], this.lineStyle)
                prevY = y
                shape.push(x, height)
                shape.push(x, y)
            } else {
                if (config.style.rectunged) {
                    result = GraphicUtils.lineTo(result, [x, prevY], this.lineStyle)
                    shape.push(x, prevY)
                }
                result = GraphicUtils.lineTo(result, [x, y], this.lineStyle)
                shape.push(x, y)
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
            prevY = y
            prevX = x
        }


        shape.push(prevX, height)

        const gradient = new Graphics()
        gradient.beginTextureFill({
            texture: context.textures.get(PRICE_LINE_TEXTURE),
            alpha: 0.5
        })
        gradient.drawPolygon(shape)
        gradient.closePath()
        gradient.endFill()

        result.addChild(gradient)

        return result
    }


}
