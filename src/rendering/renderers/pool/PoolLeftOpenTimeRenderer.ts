import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container } from '../../../lib/pixi'
import { LEFT_OPEN_TIME_TEXTURE } from '../../textures/symbols'

export class PoolLeftOpenTimeRenderer extends BaseRenderer {

    static readonly POOL_LEFT_OPEN_TIME_ID: symbol = Symbol('POOL_LEFT_OPEN_TIME_ID')

    private readonly style: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.style = {
            paddingTop: 34,
            paddingBottom: 34,
        }
    }

    public get rendererId(): symbol {
        return PoolLeftOpenTimeRenderer.POOL_LEFT_OPEN_TIME_ID
    }

    private hideContainer(container: Container): Container {
        container.alpha = 0

        return container
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (!context.pool) return this.hideContainer(container)

        const {
            width,
            height,
        } = context.screen

        const { lockDate } = context.pool
        const { timerange, xs } = context.plotdata

        const [lx] = datamath.scale([lockDate], timerange, width)
        const cx = Number(xs.at(-1))
        if (cx > lx) return this.hideContainer(container)

        const { paddingTop, paddingBottom } = this.style

        const shape = [
            0, paddingTop,
            lx - cx, paddingTop,
            lx - cx, height - paddingBottom,
            0, height - paddingBottom,
        ]

        const [gradient, gradientState] = this.get(
            'gradient',
            () => new Graphics()
                .beginTextureFill({
                    texture: context.textures.get(LEFT_OPEN_TIME_TEXTURE, this.style),
                })
                .drawPolygon(shape)
                .closePath()
                .endFill()
        )

        gradient.position.x = cx

        gradient.width = lx - cx
        gradient.height = height - paddingBottom - paddingTop

        if (gradientState.new) container.addChild(gradient)
        container.alpha = 1

        return container
    }

}
