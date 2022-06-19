import { IGraphicStorage, RenderingCompositor } from '@rendering'
import { RenderingContext, DoneFunction, IRenderer } from '@rendering'

import { PoolOpenRenderer } from './PoolOpenRenderer'
import { PoolResolutionRenderer } from './PoolResolutionRenderer'
import { PoolLockRenderer } from './PoolLockRenderer'
import { PoolBackgroundRenderer } from './PoolBackgroundRenderer'
import { PoolOpenPriceLineRenderer } from './PoolOpenPriceLineRenderer'
import { PoolLockCountdownRenderer } from './PoolLockCountdownRenderer'

export class PoolRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage
    ) {
        this.compositor = new RenderingCompositor([
            new PoolBackgroundRenderer(renderer),
            new PoolLockRenderer(renderer),
            new PoolOpenRenderer(renderer),
            new PoolLockCountdownRenderer(renderer),
            new PoolResolutionRenderer(renderer),
            new PoolOpenPriceLineRenderer(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}
