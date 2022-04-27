export * from '@pixi/constants'
export * from '@pixi/math'
export * from '@pixi/runner'
export * from '@pixi/settings'
export * from '@pixi/ticker'
export * from '@pixi/core'
export * from '@pixi/app'
export * from '@pixi/graphics'
export * from '@pixi/display'
export * from '@pixi/sprite'
export { Text, TextStyle } from '@pixi/text'
export * as utils from '@pixi/utils'
export * from '@pixi-essentials/gradients'

import '@pixi/graphics-extras';

import { Application } from '@pixi/app'
import { Renderer, BatchRenderer } from '@pixi/core'
import { TickerPlugin } from '@pixi/ticker'

Renderer.registerPlugin('batch', BatchRenderer)
Application.registerPlugin(TickerPlugin)
