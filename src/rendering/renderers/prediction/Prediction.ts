import { IGraphicStorage, RenderingCompositor } from '@rendering'
import { RenderingContext, DoneFunction, IRenderer } from '@rendering'

import { PredictionTile } from './PredictionTile'
import { PredictionLine } from './PredictionLine'

export class Prediction implements IRenderer {

    private readonly compositor: RenderingCompositor

    constructor(
        private readonly renderer: IGraphicStorage
    ) {
        this.compositor = new RenderingCompositor([
            new PredictionLine(renderer),
            new PredictionTile(renderer),
        ])
    }

    render(context: RenderingContext, done: DoneFunction): void {

        const render = this.compositor.compose(context, done)

        render()
    }

}

