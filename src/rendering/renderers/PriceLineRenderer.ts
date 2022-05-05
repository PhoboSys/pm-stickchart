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

    private context: RenderingContext

    private anim = { rate:  0 }

    private tween: gsap.core.Tween

    constructor(storage: IGraphicStorage) {
        super(storage)

        this.lineStyle = {
            width: config.style.linesize,
            color: config.style.linecolor,
            alpha: 1,
            join: 'round',
            cap: 'round',
        }

        this.performContainer()
    }

    private performContainer(): void {
        const [pricelineLatest] = this.use('pricelineLatest', () => new Graphics())
        const [gradientLatest] = this.use('gradientLatest', () => new Graphics())

        const [priceline] = this.use('priceline', () => new Graphics())
        const [gradient] = this.use('gradient', () => new Graphics())

        const container = this.storage.get(this.rendererId)

        container.addChild(priceline, gradient, pricelineLatest, gradientLatest)
    }

    public get rendererId(): symbol {
        return PriceLineRenderer.PRICE_LINE_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        const shouldAnimate = this.context?.plotdata?.xlast !== context.plotdata.xlast

        if (shouldAnimate) {
            this.animateLatestLine()
        }

        this.context = context

        this.updatePriceline(context)
        this.updateLatest(context)

        return container
    }

    private animateLatestLine(): void {
        if (!this.context) return

        this.performTween()
        this.performTicker()
    }

    private performTween(): void {
        this.anim = { rate: 0 }

        this.tween = gsap.to(
            this.anim,
            { rate: 1, duration: .5 }
        )
    }

    private performTicker(): void {
        const ticker = new Ticker()

        ticker.add(
            () => {
                if (!this.tween?.isActive()) {
                    return ticker.destroy()
                }

                this.updateLatest(this.context)
            }
        )

        ticker.start()
    }

    protected updateLatest(context: RenderingContext): void {
        const { width, height } = context.screen
        const { xdata, xrange, ydata, yrange } = context.plotdata

        const [xlastTwo, ylastTwo] = [xdata.slice(-2), ydata.slice(-2)]

        const [prevx, curx] = datamath.scale(xlastTwo, xrange, width)
        const [prevy, cury] = datamath.reverseScale(ylastTwo, yrange, height)

        const to = (prev, cur) => prev + (cur - prev) * this.anim.rate

        const [endx, endy] = [to(prevx, curx), to(prevy, cury)]

        const [line] = this.get<Graphics>('pricelineLatest')

        line
            .clear()
            .lineStyle(this.lineStyle)
            .moveTo(prevx, prevy)
            .lineTo(endx, endy)

        const [gradient] = this.get<Graphics>('gradientLatest')

        gradient
            .clear()
            .beginTextureFill({
                texture: context.textures.get(PRICE_LINE_TEXTURE),
                alpha: 0.5,
            })
            .drawPolygon(
                prevx, height,
                prevx, prevy,
                endx, endy,
                endx, height
            )
            .endFill()
    }

    protected updatePriceline(
        context: RenderingContext,
    ): void {
        const { width, height } = context.screen
        const { xdata, xrange, ydata, yrange } = context.plotdata

        const xs = datamath.scale(xdata, xrange, width)
        const ys = datamath.reverseScale(ydata, yrange, height)

        const [priceline] = this.get<Graphics>('priceline')

        priceline
            .clear()
            .lineStyle(this.lineStyle)

        const shape: number[] = []
        for (let i = 0; i < xs.length - 1; i++) {
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

        shape.push(<number>xs.at(-2), height)

        const [gradient] = this.get<Graphics>('gradient')

        gradient
            .clear()
            .beginTextureFill({
                texture: context.textures.get(PRICE_LINE_TEXTURE),
                alpha: 0.5,
            })
            .drawPolygon(shape)
            .endFill()
    }

}
