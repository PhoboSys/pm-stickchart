import { IGraphicStorage, RenderingCompositor } from '../..'
import { RenderingContext, DoneFunction, IRenderer } from '../..'

import { PariTile } from './PariTile'

export class Pari implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage
    ) {
        this.compositor = new RenderingCompositor([
            new PariTile(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

