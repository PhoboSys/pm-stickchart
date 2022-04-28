import { Container, RenderTexture } from '../../lib/pixi'

import { DoneFunction, RenderingContext } from './types'

export interface IRenderer {
    render(context: RenderingContext, done: DoneFunction): void
}

export interface IGraphicStorage {
    get(renderKey: symbol): Container
    set(renderKey: symbol, container: Container): void
}

export interface ITextureStorage {
    get(name: symbol): RenderTexture
}
