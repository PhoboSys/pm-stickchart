import { IGraphicStorage, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'
import config from '../../config'

import datamath from '../../lib/datamath'
import { Graphics, Container, Ticker, gsap } from '../../lib/pixi'

export class LatestPricePointRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_POINT_ID: symbol = Symbol('LATEST_PRICE_POINT_ID')

    private readonly outerPointStyle: any

    private readonly innerPointStyle: any

    private readonly outerPointTween: gsap.core.Tween

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.innerPointStyle = {
            color: 0xFFFFFF,
            radius: 4,
        }

        this.outerPointStyle = {
            color: config.style.linecolor,
            radius: 20,
            alpha: 0,
        }

        this.outerPointTween = gsap.to(
            this.outerPointStyle,
            { radius: 4, alpha: 1, duration: 1, repeat: -1, runBackwards: true }
        )

        Ticker.shared.add(
            () => {
                const [outterpoint] = this.get<Graphics>('outterPoint') || []

                if (!outterpoint) return

                outterpoint
                    .clear()
                    .beginFill(this.outerPointStyle.color)
                    .drawCircle(0, 0, this.outerPointStyle.radius)
                    .endFill()

                outterpoint.alpha = this.outerPointStyle.alpha
            }
        )
    }

    public get rendererId(): symbol {
        return LatestPricePointRenderer.LATEST_PRICE_POINT_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        const {
            xlast,
            ylast,

            xrange,
            yrange,
        } = context.plotdata

        const {
            width,
            height,
        } = context.screen

        const [x] = datamath.scale([xlast], xrange, width)
        const [yr] = datamath.scale([ylast], yrange, height)
        const y = height - yr

        const [outerpoint] = this.use(
            'outterPoint',
            () => GraphicUtils.createCircle(
                [0, 0],
                this.outerPointStyle.radius,
                this.outerPointStyle,
            )
        )

        outerpoint.position.set(x, y)

        const [innerpoint] = this.use(
            'innerPoint',
            () => GraphicUtils.createCircle(
                [0, 0],
                this.innerPointStyle.radius,
                this.innerPointStyle,
            )
        )

        innerpoint.position.set(x, y)

        container.addChild(outerpoint, innerpoint)

        return container
    }

}
