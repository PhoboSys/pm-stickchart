import { RenderingContext } from '@rendering'
import { BaseRenderer } from '@rendering'
import { PRICE_LINE_TEXTURE } from '@rendering'
import config from '@config'
import { Graphics, Container } from '@lib/pixi'

export class PriceLineRenderer extends BaseRenderer {

    static readonly PRICE_LINE_ID: symbol = Symbol('PRICE_LINE_ID')

    private readonly lineStyle: any = {
        width: config.style.linesize,
        color: config.style.linecolor,
        alpha: 1,
        join: 'round',
        cap: 'round',
    }

    public get rendererId(): symbol {
        return PriceLineRenderer.PRICE_LINE_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {

        if (context.plotdata.xs.length === 0) return container

        const [line, lineState] = this.get('line', () => new Graphics())
        if (lineState.new) container.addChild(line)
        this.drawLine(context)

        if (config.style.gradient.enabled) {
            const [gradient, gradientState] = this.get('gradient', () => new Graphics())
            if (gradientState.new) container.addChild(gradient)
            this.drawGradient(context)
        }

        return container
    }

    private drawLine(context: RenderingContext): void {
        const { xs, ys } = context.plotdata

        let prevY: any = null

        const [line] = this.read('line')

        for (const idx in xs) {
            const x = xs[idx]
            const y = ys[idx]

            if (+idx === 0) {

                line
                    .clear()
                    .lineStyle(this.lineStyle)
                    .moveTo(x, y)

            } else if (+idx + 1 === xs.length) {

                if (context.features.rectungedPriceLine) line.lineTo(x, prevY)

                line.lineTo(x, y)

            } else {

                if (context.features.rectungedPriceLine) line.lineTo(x, prevY)

                line.lineTo(x, y)

            }

            prevY = y
        }
    }

    private drawGradient(context: RenderingContext): void {
        const { height } = context.screen
        const { xs, ys } = context.plotdata

        const shape: number[] = []
        let prevY: any = null
        let prevX: any = null

        for (const idx in xs) {
            const x = xs[idx]
            const y = ys[idx]

            if (+idx === 0) {

                shape.push(x, height)
                shape.push(x, y)

            } else if (+idx + 1 === xs.length) {

                if (context.features.rectungedPriceLine) shape.push(x, prevY)

                shape.push(x, y)

            } else {

                if (context.features.rectungedPriceLine) shape.push(x, prevY)

                shape.push(x, y)

            }

            prevY = y
            prevX = x
        }

        shape.push(prevX, height)

        const [gradient] = this.read('gradient')
        gradient
            .clear()
            .beginTextureFill({
                texture: context.textures.get(PRICE_LINE_TEXTURE),
                alpha: 0.5,
            })
            .drawPolygon(shape)
            .closePath()
            .endFill()

    }

}
