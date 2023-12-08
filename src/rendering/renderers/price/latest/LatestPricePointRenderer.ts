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

    private readonly innerPointAnimation: any

    private readonly outerPointAnimation: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.innerPointStyle = {
            color: 0x0527F2,
            radius: 4,
        }

        this.outerPointStyle = {
            color: config.style.linecolor,
            radius: 12,
        }

        this.pulspointStyle = {
            color: config.style.linecolor,
            radius: 13,
        }

        this.innerPointAnimation = {
            pixi: {
                scale: 1.5,
            },
            ease: 'power1.inOut',
            duration: 2,
            repeat: -1,
            yoyo: true,
            yoyoEase: 'power2.inOut',
        }

        this.outerPointAnimation = {
            pixi: {
                scale: 0.667,
            },
            ease: 'power1.inOut',
            duration: 2,
            repeat: -1,
            yoyo: true,
            yoyoEase: 'power2.inOut',
        }

        this.pulspointAnimation = {
            pixi: {
                scale: 3,
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

        const [outerPoint, outerPointState] = this.get('outerPoint', () => GraphicUtils.createCircle(
            [x, y],
            this.outerPointStyle.radius,
            this.outerPointStyle,
        ))
        if (outerPointState.new) container.addChild(outerPoint)
        outerPoint.position.set(x, y)

        if (outerPointState.amination !== 'breath') {
            outerPointState.amination = 'breath'

            outerPointState.timeline = gsap.to(outerPoint, this.outerPointAnimation)
        }

        const [pulspoint, pulspointState] = this.get('pulspoint', () => GraphicUtils.createCircle(
            [0, 0],
            this.pulspointStyle.radius,
            this.pulspointStyle,
        ))
        if (pulspointState.new) outerPoint.addChild(pulspoint)

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

        if (innerpointState.amination !== 'breath') {
            innerpointState.amination = 'breath'

            innerpointState.timeline = gsap.to(innerpoint, this.innerPointAnimation)
        }

        return container
    }

}
