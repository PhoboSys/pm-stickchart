import { Graphics } from '../../lib/pixi'

import { DoneFunction, RenderingContext } from './types'

export interface IRenderer {
    render(context: RenderingContext, done: DoneFunction): void
}

export interface IGraphicRenderer {
    render(
        graphics: Graphics,
        renderKey: string
    ): void
}

