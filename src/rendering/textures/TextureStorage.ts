import { Logger } from '../../infra'
import config from '../../config'

import { PRICE_LINE_TEXTURE, POOL_ROUND_TEXTURE } from './symbols'
import { DOWN_WAGET_TEXTURE, UP_WAGET_TEXTURE } from './symbols'
import { LOCK_ICON_TEXTURE  } from './symbols'

import { ITextureStorage } from '../abstraction'

import { Application, RenderTexture, GradientFactory } from '../../lib/pixi'
import { Texture, Renderer } from '../../lib/pixi'

export class TextureStorage implements ITextureStorage {

    private readonly textures: { [key: symbol]: RenderTexture } = {}

    constructor(
        private readonly application: Application
    ) {
        // pre-create
        this.get(LOCK_ICON_TEXTURE)
    }

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

    private [UP_WAGET_TEXTURE]() {
        const height = this.application.screen.height

        const x0 = 0
        const y0 = 0
        const x1 = 0
        const y1 = height

        const top = '#' + config.style.upcolor.toString(16).padStart(6, '0')
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

    private [DOWN_WAGET_TEXTURE]() {
        const height = this.application.screen.height

        const x0 = 0
        const y0 = 0
        const x1 = 0
        const y1 = height

        const top = '#' + config.style.downcolor.toString(16).padStart(6, '0')
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
        const y1 = height

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
                    { color: middlecolor2, offset: 0.90 },
                    { color: bottomcolor, offset: 1.0 },
                ]
            }
        )

        return gradient
    }

    private [LOCK_ICON_TEXTURE]() {
        const { width, height } = this.application.screen
        const { padding } = config

        const svg = `
        <svg width="113" height="148" viewBox="0 0 113 148" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M98.875 49.3333H91.8125V35.2381C91.8125 15.7867 75.9925 0 56.5 0C37.0075 0 21.1875 15.7867 21.1875 35.2381V49.3333H14.125C6.35625 49.3333 0 55.6762 0 63.4286V133.905C0 141.657 6.35625 148 14.125 148H98.875C106.644 148 113 141.657 113 133.905V63.4286C113 55.6762 106.644 49.3333 98.875 49.3333ZM56.5 112.762C48.7312 112.762 42.375 106.419 42.375 98.6667C42.375 90.9143 48.7312 84.5714 56.5 84.5714C64.2688 84.5714 70.625 90.9143 70.625 98.6667C70.625 106.419 64.2688 112.762 56.5 112.762ZM35.3125 49.3333V35.2381C35.3125 23.539 44.7763 14.0952 56.5 14.0952C68.2237 14.0952 77.6875 23.539 77.6875 35.2381V49.3333H35.3125Z" fill="#303550"/>
        </svg>
        `
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        return Texture.from(url)
    }
}
