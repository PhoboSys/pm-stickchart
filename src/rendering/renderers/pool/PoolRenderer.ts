import { IGraphicStorage, RenderingCompositor } from '../..'
import { RenderingContext, DoneFunction, IRenderer } from '../..'
import { PoolOpenRenderer } from './PoolOpenRenderer'
import { PoolResolutionRenderer } from './PoolResolutionRenderer'
import { PoolLockRenderer } from './PoolLockRenderer'
import { PoolBackgroundRenderer } from './PoolBackgroundRenderer'
import { PoolOpenPriceLineRenderer } from './PoolOpenPriceLineRenderer'

export class PoolRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage
    ) {
        this.compositor = new RenderingCompositor([
            new PoolBackgroundRenderer(renderer),
            new PoolOpenPriceLineRenderer(renderer),
            new PoolLockRenderer(renderer),
            new PoolOpenRenderer(renderer),
            new PoolResolutionRenderer(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}
