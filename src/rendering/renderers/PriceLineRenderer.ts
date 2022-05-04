import { IGraphicStorage, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'
import { PRICE_LINE_TEXTURE } from '..'
import config from '../../config'
import datamath from '../../lib/datamath'
import { Graphics, Container, Texture } from '../../lib/pixi'

export class PriceLineRenderer extends BaseRenderer {

    static readonly PRICE_LINE_ID: symbol = Symbol('PRICE_LINE_ID')

    private readonly lineStyle: any

    private readonly textStyle: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.lineStyle = {
            width: config.style.linesize,
            color: config.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
        }
    }

    public get rendererId(): symbol {
        return PriceLineRenderer.PRICE_LINE_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {

        const { width, height } = context.screen
        const { xdata, xrange, ydata, yrange } = context.plotdata

        const xs = datamath.scale(xdata, xrange, width)
        const ys = datamath.scale(ydata, yrange, height)

        let result: Graphics = new Graphics()
        const shape: number[] = []
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

            } else if (+idx + 1 === xs.length) {

                if (config.style.rectunged) {
                    result = GraphicUtils.lineTo(result, [x, prevY], this.lineStyle)
                    shape.push(x, prevY)
                }

                result = GraphicUtils.lineTo(result, [x, y], this.lineStyle)
                shape.push(x, y)
                prevY = y

            } else {

                if (config.style.rectunged) {
                    result = GraphicUtils.lineTo(result, [x, prevY], this.lineStyle)
                    shape.push(x, prevY)
                }

                result = GraphicUtils.lineTo(result, [x, y], this.lineStyle)
                shape.push(x, y)
                prevY = y

            }

            prevY = y
            prevX = x
        }

        shape.push(prevX, height)

        const gradient = new Graphics()

        gradient.beginTextureFill({
            texture: <Texture>context.textures.get(PRICE_LINE_TEXTURE),
            alpha: 0.5,
        })
        gradient.drawPolygon(shape)
        gradient.closePath()
        gradient.endFill()

        result.addChild(gradient)

        return result
    }

}
