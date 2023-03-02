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

    private titleStyle: any = {
        text: {
            fill: 0x474C67,
            fontWeight: 700,
            fontFamily: 'Gilroy',
            fontSize: 42,
        },
        offset: [0, 0]
    }

    private subtitleContainerStyle: any = {
        offset: [0, 55]
    }

    private subtitleStyle: any = {
        text: {
            fill: 0x474C67,
            fontWeight: 500,
            fontFamily: 'Gilroy',
            fontSize: 16,
        },
        offset: [0, 0]
    }

    private logoStyle: any = {
        size: 24,
        offset: [100, -2]
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

        const [title, titleState] = this.get('title', () => GraphicUtils.createText(
            '',
            this.titleStyle.offset,
            this.titleStyle.text,
        ))
        if (titleState.new) group.addChild(title)
        title.text = context.metapool.name

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
        logo.position.set(...this.logoStyle.offset)
        container.addChild(logo)

        return container
    }

}

