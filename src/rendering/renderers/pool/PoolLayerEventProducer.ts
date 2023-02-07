import { RenderingContext } from '@rendering'

import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'
import { PoolHoverEvent, PoolPinEvent, PoolUnhoverEvent, PoolUnpinEvent } from '@events'

import { BasePoolsRenderer } from './BasePoolsRenderer'

export class PoolLayerEventProducer extends BasePoolsRenderer {

    static readonly POOL_LAYER_EVENT_PRODUCER_ID: symbol = Symbol('POOL_LAYER_EVENT_PRODUCER_ID')

    public get rendererId(): symbol {
        return PoolLayerEventProducer.POOL_LAYER_EVENT_PRODUCER_ID
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

        const { width, height } = context.screen

        const { timerange } = context.plotdata
        const { startDate, endDate, poolid } = pool
        const [ox, rx] = datamath.scale([startDate, endDate], timerange, width)

        const shape = [
            ox, 0,
            rx, 0,
            rx, height,
            ox, height,
        ]

        const [layer, layerState] = this.get('layer', () => new Graphics())

        layer
            .clear()
            .beginFill()
            .drawPolygon(shape)
            .closePath()
            .endFill()

        if (layerState.new) {
            container.addChild(layer)
            layer.interactive = true

            context.eventTarget.addEventListener('poolpin', (e: PoolPinEvent) => {
                if (layerState.pined && e.poolid !== poolid) {
                    layerState.pined = false
                    context.eventTarget.dispatchEvent(new PoolUnpinEvent(poolid, e))
                }
            })

            layer.addEventListener('pointerover', (e) => {
                context.eventTarget.dispatchEvent(new PoolHoverEvent(poolid, e))
            })
            layer.addEventListener('pointerout', (e) => {
                context.eventTarget.dispatchEvent(new PoolUnhoverEvent(poolid, e))
            })
            layer.addEventListener('pointertap', (e) => {
                if (layerState.pined) {
                    context.eventTarget.dispatchEvent(new PoolUnpinEvent(poolid, e))
                } else {
                    context.eventTarget.dispatchEvent(new PoolPinEvent(poolid, e))
                }
                layerState.pined = !layerState.pined
            })
        }

        if (!this.isActualPool(pool)) {
            layer.cursor = 'pointer'
        }

    }

}
