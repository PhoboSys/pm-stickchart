import { IGraphicStorage } from '@rendering'
import { DoneFunction, RenderingContext, IRenderer } from '@rendering'
import { RenderingCompositor } from '@rendering'

import { PariResolutionBackground } from './PariResolutionBackground'
import { PariResolutionPrize } from './PariResolutionPrize'

export class PariResolutionRenderer implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage
    ) {
        this.compositor = new RenderingCompositor([
            new PariResolutionBackground(renderer),
            new PariResolutionPrize(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}
