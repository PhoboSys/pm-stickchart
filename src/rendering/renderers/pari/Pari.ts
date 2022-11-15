import { IGraphicStorage, RenderingCompositor } from '@rendering'
import { RenderingContext, DoneFunction, IRenderer } from '@rendering'

import { PariTile } from './PariTile'
import { PariClaimBackground } from './PariClaimBackground'

export class Pari implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage
    ) {
        this.compositor = new RenderingCompositor([
            new PariClaimBackground(renderer),
            new PariTile(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

