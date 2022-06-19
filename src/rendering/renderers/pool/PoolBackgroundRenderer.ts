import { IGraphicStorage, RenderingContext } from '@rendering'
import { BaseRenderer } from '@rendering'

import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'
import { POOL_ROUND_TEXTURE } from '@rendering'
export class PoolBackgroundRenderer extends BaseRenderer {

    static readonly POOL_BACKGROUND_ID: symbol = Symbol('POOL_BACKGROUND_ID')

    constructor(renderer: IGraphicStorage) {
        super(renderer)
    }

    public get rendererId(): symbol {
        return PoolBackgroundRenderer.POOL_BACKGROUND_ID
    }

    protected update(
        context: RenderingContext,
        container: Container,
    ): Container {
        if (!context.pool) {
            container.alpha = 0

            return container
        }

        container.alpha = 1

        this.updateBackground(context, container)

        return container
    }

    private updateBackground(context: RenderingContext, container: Container): Container {
        const {
            width,
            height,
        } = context.screen

        const { timerange } = context.plotdata
        const { openDate, resolutionDate, } = context.pool
        const [ox, rx] = datamath.scale([openDate, resolutionDate], timerange, width)

        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ]

        const [gradient, gradientState] = this.get('gradient', () => new Graphics())

        gradient
            .clear()
            .beginTextureFill({
                texture: context.textures.get(POOL_ROUND_TEXTURE),
                alpha: 0.07,
            })
            .drawPolygon(shape)
            .closePath()
            .endFill()

        if (gradientState.new) container.addChild(gradient)

        return container
    }

}
