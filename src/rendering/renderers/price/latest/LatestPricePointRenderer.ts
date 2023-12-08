import { IGraphicStorage, RenderingContext } from '@rendering'
import { BaseRenderer, GraphicUtils } from '@rendering'
import config from '@config'

import { Container } from '@lib/pixi'

export class LatestPricePointRenderer extends BaseRenderer {

    static readonly LATEST_PRICE_POINT_ID: symbol = Symbol('LATEST_PRICE_POINT_ID')

    private configAnimations: any = {
        pulse: {
            pixi: {
                scale: 3,
                alpha: -0.1,
            },
            ease: 'power3.out',
            duration: 3.819,
            repeat: -1,
        },
        pulse_inner: {
            pixi: {
                scale: 1.2,
                alpha: .9,
            },
            ease: 'power3.out',
            duration: 3.819,
            repeat: -1,
        }
    }

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
            radius: 5,
        }

        this.outerPointStyle = {
            color: config.style.linecolor,
            radius: 8,
        }

        this.pulspointStyle = {
            color: config.style.linecolor,
            radius: 10,
        }

    }

    protected get animations(): any {
        return this.configAnimations
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

        const [outerpoint, outerpointState] = this.get('outerpoint', () => GraphicUtils.createCircle(
            [x, y],
            this.outerPointStyle.radius,
            this.outerPointStyle,
        ))
        if (outerpointState.new) container.addChild(outerpoint)
        outerpoint.position.set(x, y)

        const [pulspoint, pulspointState] = this.get('pulspoint', () => GraphicUtils.createCircle(
            [0, 0],
            this.pulspointStyle.radius,
            this.pulspointStyle,
        ))
        if (pulspointState.new) outerpoint.addChild(pulspoint)

        const [innerpoint, innerpointState] = this.get('innerpoint', () => GraphicUtils.createCircle(
            [x, y],
            this.innerPointStyle.radius,
            this.innerPointStyle,
        ))
        if (innerpointState.new) container.addChild(innerpoint)
        innerpoint.position.set(x, y)

        this.animate('pulspoint', 'pulse')
        this.animate('innerpoint', 'pulse_inner')

        return container
    }

}
