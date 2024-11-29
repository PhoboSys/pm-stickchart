import merge from 'lodash/merge'
import { BaseRenderer, RenderingContext, GraphicUtils, CHAINLINK_TEXTURE } from '@rendering'

import { Container, Sprite } from '@lib/pixi'
import { DEFAULT_THEME, PRICEFEED, TOURNAMENT_THEME } from '@constants'
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

    private baseGameBaseStyle: any = {
        text: {
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 50,
            trim: true,
        },
        offset: [0, 0]
    }

    private gameBaseStyle: any = {
        [DEFAULT_THEME]: merge({}, this.baseGameBaseStyle, { text: { fill: 0x455077 } }),
        [TOURNAMENT_THEME]: merge({}, this.baseGameBaseStyle, { text: { fill: 0xFED486 } })
    }

    private baseGameQuoteStyle: any = {
        text: {
            fill: 0xFFFFFF00,
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 48,
            strokeThickness: 1,
            trim: true,
        },
        offset: [6, 0]
    }

    private gameQuoteStyle: any = {
        [DEFAULT_THEME]: merge({}, this.baseGameQuoteStyle, { text: { stroke: 0x455077 } }),
        [TOURNAMENT_THEME]: merge({}, this.baseGameQuoteStyle, { text: { stroke: 0xFED486 } })
    }

    private baseMobileGameBaseStyle: any = {
        text: {
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 30,
            trim: true,
        },
        offset: [0, 0]
    }

    private mobileGameBaseStyle: any = {
        [DEFAULT_THEME]: merge({}, this.baseMobileGameBaseStyle, { text: { fill: 0x455077 } }),
        [TOURNAMENT_THEME]: merge({}, this.baseMobileGameBaseStyle, { text: { fill: 0xFED486 } })
    }

    private baseMobileGameQuoteStyle: any = {
        text: {
            fill: 0xFFFFFF00,
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 28,
            strokeThickness: 1,
            trim: true,
        },
        offset: [6, 0]
    }

    private mobileGameQuoteStyle: any = {
        [DEFAULT_THEME]: merge({}, this.baseMobileGameQuoteStyle, { text: { stroke: 0x455077 } }),
        [TOURNAMENT_THEME]: merge({}, this.baseMobileGameQuoteStyle, { text: { stroke: 0xFED486 } })
    }

    private subtitleContainerStyle: any = {
        offset: [0, 49]
    }

    private baseSubtitleStyle: any = {
        text: {
            fill: 0x455077,
            fontWeight: 500,
            fontFamily: 'Proxima Nova',
            fontSize: 15,
        },
        offset: [0, 0]
    }

    private subtitleStyle: any = {
        [DEFAULT_THEME]: this.baseSubtitleStyle,
        [TOURNAMENT_THEME]: merge({}, this.baseSubtitleStyle, { text: { fill: 0xFED486 } })
    }

    private mobileSubtitleContainerStyle: any = {
        offset: [0, 29]
    }

    private baseMobileSubtitleStyle: any = {
        text: {
            fill: 0x455077,
            fontWeight: 500,
            fontFamily: 'Proxima Nova',
            fontSize: 8,
        },
        offset: [0, 0]
    }

    private mobileSubtitleStyle: any = {
        [DEFAULT_THEME]: this.baseMobileSubtitleStyle,
        [TOURNAMENT_THEME]: merge({}, this.baseMobileSubtitleStyle, { text: { fill: 0xFED486 } })
    }

    private baseStyle: any = {
        size: 24,
        offset: [7, -3.5],
        tint: 0xFFFFFF,
    }

    private logoStyle: any = {
        [DEFAULT_THEME]: merge({}, this.baseStyle, { tint: 0x3B67FB }),
        [TOURNAMENT_THEME]: this.baseStyle,
    }

    private baseMobileLogoStyle: any = {
        size: 15,
        offset: [4, -2],
        tint: 0xFFFFFF,
    }

    private mobileLogoStyle: any = {
        [DEFAULT_THEME]: merge({}, this.baseMobileLogoStyle, { tint: 0x3B67FB }),
        [TOURNAMENT_THEME]: this.baseMobileLogoStyle,
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

        const gamebaseStyle = context.options.isMobile ?
            this.mobileGameBaseStyle[context.charttheme] :
            this.gameBaseStyle[context.charttheme]
        const [gameBase, gameBaseState] = this.get('gameBase', () => GraphicUtils.createText(
            context.game.base,
            gamebaseStyle.offset,
            gamebaseStyle.text,
        ), [context.charttheme])
        if (gameBaseState.new) group.addChild(gameBase)

        const gameQuoteStyle = context.options.isMobile ?
            this.mobileGameQuoteStyle[context.charttheme] :
            this.gameQuoteStyle[context.charttheme]

        const [gameQuote, gameQuoteState] = this.get('gameQuote', () => GraphicUtils.createText(
            context.game.quote,
            [gameBase.width + gameQuoteStyle.offset[0], gameQuoteStyle.offset[1]],
            gameQuoteStyle.text,
        ), [context.charttheme])
        if (gameQuoteState.new) group.addChild(gameQuote)

        const [subtitle, subtitleState] = this.get('subtitle', () => this.createSubtitle(context), [context.charttheme])
        if (subtitleState.new) group.addChild(subtitle)

        return layer
    }

    private createSubtitle(context: RenderingContext): Container {
        const container = new Container()
        container.position.set(...(context.options.isMobile ? this.mobileSubtitleContainerStyle : this.subtitleContainerStyle).offset)

        const textStyles = context.options.isMobile ? this.mobileSubtitleStyle[context.charttheme] : this.subtitleStyle[context.charttheme]
        const text = GraphicUtils.createText('Pricefeed by', textStyles.offset, textStyles.text)
        container.addChild(text)

        const texture = context.textures.get(CHAINLINK_TEXTURE)
        const logo = new Sprite(texture)
        const logoStyle = context.options.isMobile ? this.mobileLogoStyle[context.charttheme] : this.logoStyle[context.charttheme]

        const pointertap = (): void  => {
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
        logo.tint = logoStyle.tint
        container.addChild(logo)

        return container
    }

}

