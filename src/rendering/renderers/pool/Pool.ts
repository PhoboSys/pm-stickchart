import { IGraphicStorage, RenderingCompositor } from '../..'
import { RenderingContext, DoneFunction, IRenderer } from '../..'

import { PoolBackground } from './PoolBackground'
import { PoolLock } from './PoolLock'
import { PoolOpen } from './PoolOpen'
import { PoolLockCountdown } from './PoolLockCountdown'
import { PoolResolution } from './PoolResolution'
import { PoolResolutionLine } from './PoolResolutionLine'
import { PoolOpenPriceTag } from './PoolOpenPriceTag'
import { PoolResolutionPriceTag } from './PoolResolutionPriceTag'
import { PoolHoverEventProducer } from './PoolHoverEventProducer'

export class Pool implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage
    ) {
        this.compositor = new RenderingCompositor([
            new PoolHoverEventProducer(renderer),
            new PoolBackground(renderer),
            new PoolLock(renderer),
            new PoolOpen(renderer),
            new PoolLockCountdown(renderer),
            new PoolResolution(renderer),
            new PoolResolutionLine(renderer),
            new PoolResolutionPriceTag(renderer),
            new PoolOpenPriceTag(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}
