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
export * from '@pixi/events'
export * from '@pixi/extensions'
export * from '@pixi/assets'
export { Text, TextStyle } from '@pixi/text'
export * as utils from '@pixi/utils'
export * from '@pixi-essentials/gradients'
export { gsap } from 'gsap'

import '@pixi/graphics-extras'

import { BatchRenderer } from '@pixi/core'
import { TickerPlugin } from '@pixi/ticker'
import * as utils from '@pixi/utils'
import { Graphics } from '@pixi/graphics'
import { DisplayObject } from '@pixi/display'
import { BlurFilter } from '@pixi/filter-blur'
import { ColorMatrixFilter } from '@pixi/filter-color-matrix'
import { extensions } from '@pixi/extensions'

// GSAP
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

utils.skipHello()
gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI({
    DisplayObject,
    Graphics,
    filters: {
        BlurFilter,
        ColorMatrixFilter
    }
})

extensions.add(TickerPlugin, BatchRenderer)
// Renderer.registerPlugin('batch', BatchRenderer)
// Application.registerPlugin(TickerPlugin)
