import { Container, Texture } from '@lib/pixi'

import { DoneFunction, RenderingContext } from './types'

export interface IRenderer {
    render(context: RenderingContext, done: DoneFunction): void
}

export interface IGraphicStorage {
    get(renderKey: symbol): Container
    set(renderKey: symbol, container: Container): void
}

export interface ITextureStorage {
    get(name: symbol, params?: object): Texture
    animations(name: symbol, params?: object): Texture[]
}
