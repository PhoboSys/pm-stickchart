import { BaseRenderer, RenderingContext, GraphicUtils, CHAINLINK_TEXTURE } from '@rendering'

import { Container, Sprite } from '@lib/pixi'
import { PRICEFEED } from '@constants'

export class PricefeedInfoRenderer extends BaseRenderer {
    static readonly PRICEFEED_INFO_ID: symbol = Symbol('PRICEFEED_INFO_ID')

    public get rendererId(): symbol {
        return PricefeedInfoRenderer.PRICEFEED_INFO_ID
    }

    private groupStyle: any = {
        offset: [70, 55]
    }

    private metapoolBaseStyle: any = {
        text: {
            fill: 0x455077,
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 50,
            trim: true,
        },
        offset: [0, 0]
    }

    private metapoolQuoteStyle: any = {
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

    private logoStyle: any = {
        size: 24,
        offset: [7, -3.5]
    }

    protected update(
        context: RenderingContext,
        layer: Container,
    ): Container {
        const [group, groupstate] = this.get('group', () => new Container())
        if (groupstate.new) {
            layer.addChild(group)
            group.position.set(...this.groupStyle.offset)
        }

        const [metapoolBase, metapoolBaseState] = this.get('metapoolBase', () => GraphicUtils.createText(
            context.metapool.base,
            this.metapoolBaseStyle.offset,
            this.metapoolBaseStyle.text,
        ))
        if (metapoolBaseState.new) group.addChild(metapoolBase)

        const [metapoolQuote, metapoolQuoteState] = this.get('metapoolQuote', () => GraphicUtils.createText(
            context.metapool.quote,
            [metapoolBase.width + this.metapoolQuoteStyle.offset[0], this.metapoolQuoteStyle.offset[1]],
            this.metapoolQuoteStyle.text,
        ))
        if (metapoolQuoteState.new) group.addChild(metapoolQuote)

        const [subtitle, subtitleState] = this.get('subtitle', () => this.createSubtitle(context))
        if (subtitleState.new) group.addChild(subtitle)

        return layer
    }

    private createSubtitle(context: RenderingContext): Container {
        const container = new Container()
        container.position.set(...this.subtitleContainerStyle.offset)

        const text = GraphicUtils.createText(
            'Pricefeed by',
            this.subtitleStyle.offset,
            this.subtitleStyle.text,
        )
        container.addChild(text)

        const texture = context.textures.get(CHAINLINK_TEXTURE)
        const logo = new Sprite(texture)
        logo.interactive = true
        logo.cursor = 'pointer'
        logo.addEventListener('pointertap', () => {
            const link = PRICEFEED.CL_URL[context.metapool.pricefeed]
            window.open(link, '__blank')
        })
        logo.scale.set(this.logoStyle.size / logo.height)
        logo.position.set(text.width + this.logoStyle.offset[0], this.logoStyle.offset[1])
        container.addChild(logo)

        return container
    }

}

