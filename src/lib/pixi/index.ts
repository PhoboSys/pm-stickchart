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
export * from '@pixi/sprite-animated'
export { Text, TextStyle } from '@pixi/text'
export * as utils from '@pixi/utils'
export * from '@pixi-essentials/gradients'
export { gsap } from "gsap"

import '@pixi/graphics-extras'

import { Application } from '@pixi/app'
import { Renderer, BatchRenderer } from '@pixi/core'
import { TickerPlugin } from '@pixi/ticker'
import * as utils from '@pixi/utils'
import { gsap } from "gsap"
import { PixiPlugin } from "gsap/PixiPlugin.js"
import { Graphics } from '@pixi/graphics'
import { DisplayObject } from "@pixi/display";
import { BlurFilter } from "@pixi/filter-blur";
import { ColorMatrixFilter } from "@pixi/filter-color-matrix";

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

Renderer.registerPlugin('batch', BatchRenderer)
Application.registerPlugin(TickerPlugin)
