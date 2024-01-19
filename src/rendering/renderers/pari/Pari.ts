import { IGraphicStorage, RenderingCompositor } from '@rendering'
import { RenderingContext, DoneFunction, IRenderer } from '@rendering'

import { PariTileOutdated } from './PariTileOutdated'
import { PariTile } from './PariTile'
import { PariLine } from './PariLine'
import { PariClaimBackground } from './PariClaimBackground'

export class Pari implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage
    ) {
        this.compositor = new RenderingCompositor([
            new PariClaimBackground(renderer),
            new PariLine(renderer),
            new PariTile(renderer),
            new PariTileOutdated(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

