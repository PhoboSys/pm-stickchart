import { Logger } from '../../infra'
import config from '../../config'

import { PRICE_LINE_TEXTURE, POOL_ROUND_TEXTURE } from './symbols'
import { ITextureStorage } from '../abstraction'

import { Application, RenderTexture, GradientFactory, Renderer } from '../../lib/pixi'

export class TextureStorage implements ITextureStorage {

    private readonly textures: { [key: symbol]: RenderTexture } = {}

    constructor(
        private readonly application: Application
    ) { }

    public get(name: symbol) {

        if (!this.textures[name]) {
            Logger.warn('Create Texture', name)
            if (this[name] instanceof Function) {
                this.textures[name] = this[name]()
            } else {
                Logger.warn(Symbol.keyFor(name), 'Texture is not supported create empty')
                this.textures[name] = this.EMPTY()
            }
        }

        return this.textures[name]
    }

    private EMPTY() {
        return RenderTexture.create({
            width: this.application.renderer.width,
            height: this.application.renderer.height
        })
    }

    private [PRICE_LINE_TEXTURE]() {
        const x0 = 0
        const y0 = 0 + this.application.screen.height * config.padding.top
        const x1 = 0
        const y1 = this.application.screen.height

        const top = '#' + config.style.linecolor.toString(16).padStart(6, '0')
        const bottom = top + '00' // same color with opacity = 0

        const gradient = GradientFactory.createLinearGradient(
            <Renderer>this.application.renderer,
            RenderTexture.create({
                width: this.application.renderer.width,
                height: this.application.renderer.height
            }),
            {
                x0, y0,
                x1, y1,
                colorStops : [
                    { color: top, offset: 0 },
                    { color: bottom, offset: 1 },
                ]
            }
        )

        return gradient
    }

    private [POOL_ROUND_TEXTURE]() {
        const { width, height } = this.application.screen
        const { padding } = config

        const x0 = width - width * padding.right - width / 100
        const y0 = 0 + height * padding.top
        const x1 = width - width * padding.right + width / 100
        const y1 = height - height * padding.bottom

        const topcolor = '#00A573' + '00'
        const middlecolor1 = '#00A573'
        const middlecolor2 = '#F07750'
        const bottomcolor = '#F07750' + '00'

        const gradient = GradientFactory.createLinearGradient(
            <Renderer>this.application.renderer,
            RenderTexture.create({
                width: this.application.renderer.width,
                height: this.application.renderer.height
            }),
            {
                x0, y0,
                x1, y1,
                colorStops : [
                    { color: topcolor, offset: 0.0 },
                    { color: middlecolor1, offset: 0.33 },
                    { color: middlecolor2, offset: 0.66 },
                    { color: bottomcolor, offset: 1.0 },
                ]
            }
        )

        return gradient
    }

}
