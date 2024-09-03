import { BaseRenderer, RenderingContext, GraphicUtils, CHAINLINK_TEXTURE } from '@rendering'

import { Container, Sprite } from '@lib/pixi'
import { PRICEFEED } from '@constants'
import { TouchStartEvent } from '@src/events'

export class PricefeedInfoRenderer extends BaseRenderer {
    static readonly PRICEFEED_INFO_ID: symbol = Symbol('PRICEFEED_INFO_ID')

    public get rendererId(): symbol {
        return PricefeedInfoRenderer.PRICEFEED_INFO_ID
    }

    private groupStyle: any = {
        offset: [70, 55]
    }

    private mobileGroupStyle: any = {
        offset: [15, 15]
    }

    private gameBaseStyle: any = {
        text: {
            fill: 0x455077,
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 50,
            trim: true,
        },
        offset: [0, 0]
    }

    private gameQuoteStyle: any = {
        text: {
            fill: 0xFFFFFF00,
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 48,
            stroke: 0x455077,
            strokeThickness: 1,
            trim: true,
        },
        offset: [6, 0]
    }

    private mobileGameBaseStyle: any = {
        text: {
            fill: 0x455077,
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 30,
            trim: true,
        },
        offset: [0, 0]
    }

    private mobileGameQuoteStyle: any = {
        text: {
            fill: 0xFFFFFF00,
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 28,
            stroke: 0x455077,
            strokeThickness: 1,
            trim: true,
        },
        offset: [6, 0]
    }

    private subtitleContainerStyle: any = {
        offset: [0, 49]
    }

    private subtitleStyle: any = {
        text: {
            fill: 0x455077,
            fontWeight: 500,
            fontFamily: 'Proxima Nova',
            fontSize: 15,
        },
        offset: [0, 0]
    }

    private mobileSubtitleContainerStyle: any = {
        offset: [0, 29]
    }

    private mobileSubtitleStyle: any = {
        text: {
            fill: 0x455077,
            fontWeight: 500,
            fontFamily: 'Proxima Nova',
            fontSize: 8,
        },
        offset: [0, 0]
    }

    private logoStyle: any = {
        size: 24,
        offset: [7, -3.5]
    }

    private mobileLogoStyle: any = {
        size: 15,
        offset: [4, -2]
    }

    protected update(
        context: RenderingContext,
        layer: Container,
    ): Container {
        const [group, groupstate] = this.get('group', () => new Container())
        if (groupstate.new) {
            layer.addChild(group)
            group.position.set(...(context.options.isMobile ? this.mobileGroupStyle : this.groupStyle).offset)
        }

        const gamebaseStyle = context.options.isMobile ? this.mobileGameBaseStyle : this.gameBaseStyle
        const [gameBase, gameBaseState] = this.get('gameBase', () => GraphicUtils.createText(
            context.game.base,
            gamebaseStyle.offset,
            gamebaseStyle.text,
        ))
        if (gameBaseState.new) group.addChild(gameBase)

        const gameQuoteStyle = context.options.isMobile ? this.mobileGameQuoteStyle : this.gameQuoteStyle

        const [gameQuote, gameQuoteState] = this.get('gameQuote', () => GraphicUtils.createText(
            context.game.quote,
            [gameBase.width + gameQuoteStyle.offset[0], gameQuoteStyle.offset[1]],
            gameQuoteStyle.text,
        ))
        if (gameQuoteState.new) group.addChild(gameQuote)

        const [subtitle, subtitleState] = this.get('subtitle', () => this.createSubtitle(context))
        if (subtitleState.new) group.addChild(subtitle)

        return layer
    }

    private createSubtitle(context: RenderingContext): Container {
        const container = new Container()
        container.position.set(...(context.options.isMobile ? this.mobileSubtitleContainerStyle : this.subtitleContainerStyle).offset)

        const text = GraphicUtils.createText(
            'Pricefeed by',
            (context.options.isMobile ? this.mobileSubtitleStyle : this.subtitleStyle).offset,
            (context.options.isMobile ? this.mobileSubtitleStyle : this.subtitleStyle).text,
        )
        container.addChild(text)

        const texture = context.textures.get(CHAINLINK_TEXTURE)
        const logo = new Sprite(texture)
        const logoStyle = context.options.isMobile ? this.mobileLogoStyle : this.logoStyle

        const pointertap = () => {
            const link = PRICEFEED.CL_URL[context.game.pricefeed]
            window.open(link, '__blank')
        }
        if (context.options.isMobile) {
            context.eventTarget.addEventListener('touchstart', (e: TouchStartEvent) => {
                if (e.multitouch) {
                    logo.removeEventListener('pointertap', pointertap)
                } else {
                    logo.addEventListener('pointertap', pointertap)
                }
            })
        }

        logo.interactive = true
        logo.cursor = 'pointer'
        logo.addEventListener('pointertap', pointertap)
        logo.scale.set(logoStyle.size / logo.height)
        logo.position.set(text.width + logoStyle.offset[0], logoStyle.offset[1])
        container.addChild(logo)

        return container
    }

}

