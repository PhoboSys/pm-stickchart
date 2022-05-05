import { IGraphicStorage, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'
import { PRICE_LINE_TEXTURE } from '..'
import config from '../../config'
import datamath from '../../lib/datamath'
import { Graphics, Container, Ticker, gsap } from '../../lib/pixi'
import { DoneFunction } from '../abstraction'

export class PriceLineRenderer extends BaseRenderer {

    static readonly PRICE_LINE_ID: symbol = Symbol('PRICE_LINE_ID')

    private readonly lineStyle: any

    private readonly textStyle: any

    private anim: { rate: number }

    private context: RenderingContext

    private ticker: Ticker

    private xlast: number

    private ylast: number

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.lineStyle = {
            width: config.style.linesize,
            color: config.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
        }

        this.use('latestAnimationLine', () => new Graphics())
    }

    public get rendererId(): symbol {
        return PriceLineRenderer.PRICE_LINE_ID
    }

    public render(context: RenderingContext, done: DoneFunction): void {
        this.context = context

        super.render(context, done)
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        const { xlast } = context.plotdata

        if (this.xlast !== xlast) {
            console.log('start animation')
            this.animateLatestLine()
        }

        this.xlast = xlast

        return this.renderLines(context, container)
    }

    private animateLatestLine(): void {
        if (!this.context) return

        this.anim = { rate: 0 }

        const tween = gsap.to(
            this.anim,
            { rate: 1,  duration: 5 }
        )

        this.ticker = new Ticker()

        this.ticker.add(
            () => {
                const [line] = this.get<Graphics>('latestAnimationLine')

                if (!tween.isActive()) {
                    return this.ticker.destroy()

                    // return this.render(context, () => { line.clear() })
                }

                console.log('animate2')
                const { context } = this

                const { width, height } = context.screen
                const { xdata, xrange, ydata, yrange } = context.plotdata

                const [prevx, curx] = datamath.scale(<number[]>[xdata.at(-2), xdata.at(-1)], xrange, width)
                const [prevy, cury] = datamath.scale(<number[]>[ydata.at(-2), ydata.at(-1)], yrange, height, true)

                const animate = (prev, cur) => prev + (cur - prev) * this.anim.rate

                line
                    .clear()
                    .lineStyle({ ...this.lineStyle, color: 0xFFFFFF })
                    .moveTo(prevx, prevy)
                    .lineTo(animate(prevx, curx), animate(prevy, cury))
            }
        )

        this.ticker.start()
    }

    protected renderLines(
        context: RenderingContext,
        container: Container,
    ) {
        const { width, height } = context.screen
        const { xdata, ydata } = context.plotdata
        const { xrange, yrange } = context.plotdata

        const xs = datamath.scale(xdata, xrange, width)
        const ys = datamath.scale(ydata, yrange, height, true)

        const [priceline, plstate] = this.use<Graphics>(
            'priceline',
            () => new Graphics()
        )

        if (!plstate.new) priceline.clear()
        priceline.lineStyle(this.lineStyle)

        const shape: number[] = []
        for (let i = 0; i < xs.length; i++) {
            const x = xs[i], y = ys[i]

            if (i === 0) {
                shape.push(x, height, x, y)

                priceline.moveTo(x, y)

                continue
            }

            if (config.style.rectunged) {
                priceline.lineTo(x, ys[i - 1])
                shape.push(x, ys[i - 1])
            }

            priceline.lineTo(x, y)
            shape.push(x, y)
        }

        shape.push(<number>xs.at(-1), height)

        const [gradient] = this.use<Graphics>(
            'gradient',
            () => new Graphics()
        )

        gradient
            .clear()
            .beginTextureFill({
                texture: context.textures.get(PRICE_LINE_TEXTURE),
                alpha: 0.5,
            })
            .drawPolygon(shape)
            .endFill()

        const [animtedline] = this.get<Graphics>('latestAnimationLine')

        container.addChild(priceline, gradient, animtedline)

        return container
    }

}
