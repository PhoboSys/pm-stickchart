import { Graphics, RenderTexture } from '../../lib/pixi'

import { DoneFunction, RenderingContext } from './types'

export interface IRenderer {
    render(context: RenderingContext, done: DoneFunction): void
}

export interface IGraphicRenderer {
    render(
        graphics: Graphics,
        renderKey: symbol
    ): void
}

export interface ITextureStorage {
    get(name: symbol): RenderTexture
}
