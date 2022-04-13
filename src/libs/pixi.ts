export * from '@pixi/constants'
export * from '@pixi/math'
export * from '@pixi/runner'
export * from '@pixi/settings'
export * from '@pixi/ticker'
export * from '@pixi/core'
export * from '@pixi/app'
export * from '@pixi/graphics'
export * as utils from '@pixi/utils'

import { Application } from '@pixi/app'
import { Renderer, BatchRenderer } from '@pixi/core'
Renderer.registerPlugin('batch', BatchRenderer)

import { TickerPlugin } from '@pixi/ticker'
Application.registerPlugin(TickerPlugin)
