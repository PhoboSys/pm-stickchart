import { IGraphicStorage, RenderingContext } from '../..'
import { BaseRenderer } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container } from '../../../lib/pixi'
import { LOCK_COUNTDOWN_TEXTURE } from '../../textures/symbols'

export class PoolLockCountdownRenderer extends BaseRenderer {

    static readonly POOL_LOCK_COUNTDOWN_ID: symbol = Symbol('POOL_LOCK_COUNTDOWN_ID')

    private readonly style: any

    constructor(renderer: IGraphicStorage) {
        super(renderer)

        this.style = {
            paddingTop: 34,
        }
    }

    public get rendererId(): symbol {
        return PoolLockCountdownRenderer.POOL_LOCK_COUNTDOWN_ID
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

        const { lockDate, openDate } = context.pool
        const { timerange, xs } = context.plotdata

        const [ox, rightx] = datamath.scale([openDate, lockDate], timerange, width)
        const leftx = Math.max(Number(xs.at(-1)), ox)
        if (leftx > rightx) return this.hideContainer(container)

        const { paddingTop } = this.style

        const shape = [
            0, paddingTop,
            rightx - leftx, paddingTop,
            rightx - leftx, height,
            0, height,
        ]

        const [gradient, gradientState] = this.get(
            'gradient',
            () => new Graphics()
                .beginTextureFill({
                    texture: context.textures.get(LOCK_COUNTDOWN_TEXTURE, this.style),
                })
                .drawPolygon(shape)
                .closePath()
                .endFill()
        )

        gradient.position.x = leftx

        gradient.width = rightx - leftx
        gradient.height = height - paddingTop

        if (gradientState.new) container.addChild(gradient)
        container.alpha = .5

        return container
    }

}
