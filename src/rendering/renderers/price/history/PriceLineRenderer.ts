import { IGraphicStorage, RenderingContext } from '@rendering'
import { BaseRenderer } from '@rendering'
import { PRICE_LINE_TEXTURE } from '@rendering'
import config from '@config'
import { Graphics, Container } from '@lib/pixi'

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
        const { xs, ys, pricerange, timerange } = context.plotdata

        const shape: number[] = []
        let prevY: any = null
        let prevX: any = null

        const [line, lineState] = this.get('line', () => new Graphics())
        if (lineState.new) container.addChild(line)

        for (const idx in xs) {
            const x = xs[idx]
            const y = ys[idx]

            if (+idx === 0) {

                line
                    .clear()
                    .lineStyle(this.lineStyle)
                    .moveTo(x, y)

                prevY = y
                shape.push(x, height)
                shape.push(x, y)

            } else if (+idx + 1 === xs.length) {

                if (config.style.rectunged) {
                    line.lineTo(x, prevY)
                    shape.push(x, prevY)
                }

                line.lineTo(x, y)
                shape.push(x, y)
                prevY = y

            } else {

                if (config.style.rectunged) {
                    line.lineTo(x, prevY)
                    shape.push(x, prevY)
                }

                line.lineTo(x, y)
                shape.push(x, y)
                prevY = y

            }

            prevY = y
            prevX = x
        }

        shape.push(prevX, height)

        const [gradient, gradientState] = this.get('gradient', () => new Graphics())
        if (gradientState.new) container.addChild(gradient)

        gradient
            .clear()
            .beginTextureFill({
                texture: context.textures.get(PRICE_LINE_TEXTURE),
                alpha: 0.5,
            })
            .drawPolygon(shape)
            .closePath()
            .endFill()

        return container
    }

}
