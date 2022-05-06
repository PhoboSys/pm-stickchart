import { IGraphicStorage, RenderingContext } from '../../..'
import { BaseRenderer, GraphicUtils } from '../../..'
import config from '../../../../config'

import datamath from '../../../../lib/datamath'
import { Graphics, Container, gsap } from '../../../../lib/pixi'

export class LatestPricePointRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_POINT_ID: symbol = Symbol('LATEST_PRICE_POINT_ID')

    private readonly outerPointStyle: any

    private readonly innerPointStyle: any

    private readonly pulsPointAnimation: any

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

        this.pulsPointAnimation = {
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
            xs,
            ys,
        } = context.plotdata

        const x = Number(xs.at(-1))
        const y = Number(ys.at(-1))

        const [point, pointState] = this.get('point', () => GraphicUtils.createCircle(
            [x, y],
            this.outerPointStyle.radius,
            this.outerPointStyle,
        ))
        if (pointState.new) container.addChild(point)

        pointState.timeline?.kill()
        pointState.timeline = gsap.to(point, {
            pixi: {
                positionX: x,
                positionY: y
            },
            duration: 0.3,
            ease: 'power4.out',
        })

        const [pulspoint, pulspointState] = this.get('pulspoint', () => GraphicUtils.createCircle(
            [0, 0],
            this.outerPointStyle.radius,
            this.outerPointStyle,
        ))
        if (pulspointState.new) point.addChild(pulspoint)

        if (pulspointState.amination !== 'puls') {
            pulspointState.amination = 'puls'

            pulspointState.timeline = gsap.to(pulspoint, this.pulsPointAnimation)
        }

        const [innerpoint, innerpointState] = this.get('innerpoint', () => GraphicUtils.createCircle(
            [x, y],
            this.innerPointStyle.radius,
            this.innerPointStyle,
        ))
        if (innerpointState.new) container.addChild(innerpoint)

        innerpointState.timeline?.kill()
        innerpointState.timeline = gsap.to(innerpoint, {
            pixi: {
                positionX: x,
                positionY: y
            },
            duration: 0.3,
            ease: 'power4.out',
        })

        return container
    }

}
