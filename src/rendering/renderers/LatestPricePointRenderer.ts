import { IGraphicStorage, RenderingContext } from '..'
import { BaseRenderer, GraphicUtils } from '..'
import config from '../../config'

import datamath from '../../lib/datamath'
import { Graphics, Container, gsap } from '../../lib/pixi'

export class LatestPricePointRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_POINT_ID: symbol = Symbol('LATEST_PRICE_POINT_ID')

    private readonly outerPointStyle: any

    private readonly innerPointStyle: any

    private readonly outerPointAnimation: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.innerPointStyle = {
            color: 0xFFFFFF,
            radius: 4,
        }

        this.outerPointStyle = {
            color: config.style.linecolor,
            radius: 9,
        }

        this.outerPointAnimation = {
            pixi: {
                scale: 4,
                alpha: -0.1,
            },
            ease: 'power3.out',
            duration: 3.819,
            repeat: -1,
        }
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

        const [outerpoint, outerpointState] = this.get('outerpoint', () => GraphicUtils.createCircle(
            [x, y],
            this.outerPointStyle.radius,
            this.outerPointStyle,
        ))
        if (outerpointState.new) container.addChild(outerpoint)
        outerpoint.position.set(x, y)

        if (outerpointState.amination !== 'puls') {
            outerpointState.amination = 'puls'

            outerpointState.timeline = gsap.to(outerpoint, this.outerPointAnimation)
        }

        const [innerpoint, innerpointState] = this.get('innerpoint', () => GraphicUtils.createCircle(
            [x, y],
            this.innerPointStyle.radius,
            this.innerPointStyle,
        ))
        if (innerpointState.new) container.addChild(innerpoint)
        innerpoint.position.set(x, y)

        return container
    }

}
