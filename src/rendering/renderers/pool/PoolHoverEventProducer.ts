import { RenderingContext } from '../..'

import datamath from '../../../lib/datamath'
import { Graphics, Container } from '../../../lib/pixi'
import { isEmpty, forEach } from '../../../lib/utils'
import { PoolHoverEvent, PoolUnhoverEvent } from '../../../events'

import { POOL_ROUND_TEXTURE } from '../../textures/symbols'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolHoverEventProducer extends BasePoolsRenderer {

    static readonly POOL_HOVER_EVENT_PRODUCER_ID: symbol = Symbol('POOL_HOVER_EVENT_PRODUCER_ID')

    public get rendererId(): symbol {
        return PoolHoverEventProducer.POOL_HOVER_EVENT_PRODUCER_ID
    }

    private readonly isHover: { [key:string]: boolean } = { }

    protected updatePool(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        container.alpha = 0

        this.updateEvent(pool, context, container)

    }

    private updateEvent(
        pool: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const {
            width,
            height,
        } = context.screen

        const { timerange } = context.plotdata
        const { openDate, resolutionDate, poolid } = pool
        const [ox, rx] = datamath.scale([openDate, resolutionDate], timerange, width)

        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ]

        const [hover, hoverState] = this.get('hover', () => new Graphics())

        hover
            .clear()
            .beginFill()
            .drawPolygon(shape)
            .closePath()
            .endFill()

        if (hoverState.new) {
            container.addChild(hover)
            hover.interactive = true
            hover.addEventListener('pointerover', (e) => {
                context.eventTarget.dispatchEvent(new PoolHoverEvent(poolid, e))
            })
            hover.addEventListener('pointerout', (e) => {
                context.eventTarget.dispatchEvent(new PoolUnhoverEvent(poolid, e))
            })
        }

    }

}
