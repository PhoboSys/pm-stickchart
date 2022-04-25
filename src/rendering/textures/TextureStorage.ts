import { Logger } from '../../infra'
import config from '../../config'

import { Application, RenderTexture, GradientFactory, Renderer } from '../../lib/pixi'

export class TextureStorage {

    static readonly PRICE_LINE_TEXTURE: symbol = Symbol('PRICE_LINE_TEXTURE')

    private readonly textires: { [key: symbol]: RenderTexture } = {}

    constructor(
        private readonly application: Application
    ) { }

    getPriceLineGradient() {

        if (!this.textires[TextureStorage.PRICE_LINE_TEXTURE]) {
            Logger.warn('Create PRICE_LINE_TEXTURE Texture')
            this.textires[TextureStorage.PRICE_LINE_TEXTURE] = this.createPriceLineTexture()
        }

        return this.textires[TextureStorage.PRICE_LINE_TEXTURE]
    }

    createPriceLineTexture() {
        console.log(this.application.screen.height * config.padding.top)

        const x0 = 0
        const y0 = 0 + this.application.screen.height * config.padding.top
        const x1 = 0
        const y1 = this.application.screen.height

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
                    { color: 0x009797, offset: 0 },
                    { color: 0x22273f, offset: 1 },
                ]
            }
        )

        return gradient
    }

}
