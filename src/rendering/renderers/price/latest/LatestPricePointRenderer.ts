import { IGraphicStorage, RenderingContext } from '@rendering'
import { BaseRenderer, GraphicUtils } from '@rendering'
import config from '@config'

import { Container, gsap } from '@lib/pixi'

export class LatestPricePointRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_POINT_ID: symbol = Symbol('LATEST_PRICE_POINT_ID')

    private readonly outerPointStyle: any

    private readonly innerPointStyle: any

    private readonly pulspointStyle: any

    private readonly pulspointAnimation: any

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

        this.pulspointStyle = {
            color: config.style.linecolor,
            radius: 10,
        }

        this.pulspointAnimation = {
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
            latestX,
            latestY,
        } = context.plotdata

        const x = latestX
        const y = latestY

        const [point, pointState] = this.get('point', () => GraphicUtils.createCircle(
            [x, y],
            this.outerPointStyle.radius,
            this.outerPointStyle,
        ))
        if (pointState.new) container.addChild(point)
        point.position.set(x, y)

        const [pulspoint, pulspointState] = this.get('pulspoint', () => GraphicUtils.createCircle(
            [0, 0],
            this.pulspointStyle.radius,
            this.pulspointStyle,
        ))
        if (pulspointState.new) point.addChild(pulspoint)

        if (pulspointState.amination !== 'puls') {
            pulspointState.amination = 'puls'

            pulspointState.timeline = gsap.to(pulspoint, this.pulspointAnimation)
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
