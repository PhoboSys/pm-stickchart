import { RenderingContext } from '@rendering'

import datamath from '@lib/datamath'
import { Graphics, Container } from '@lib/pixi'
import { RoundHoverEvent, RoundPinEvent, RoundUnhoverEvent, RoundUnpinEvent } from '@events'

import { BaseRoundsRenderer } from './BaseRoundsRenderer'

export class RoundLayerEventProducer extends BaseRoundsRenderer {

    static readonly ROUND_LAYER_EVENT_PRODUCER_ID: symbol = Symbol('ROUND_LAYER_EVENT_PRODUCER_ID')

    public get rendererId(): symbol {
        return RoundLayerEventProducer.ROUND_LAYER_EVENT_PRODUCER_ID
    }

    private readonly isHover: { [key:string]: boolean } = { }

    protected updateRound(
        round: any,
        context: RenderingContext,
        container: Container,
    ): void {

        container.alpha = 0

        this.updateEvent(round, context, container)

    }

    private updateEvent(
        round: any,
        context: RenderingContext,
        container: Container,
    ): void {

        const { width, height } = context.screen

        const { timerange } = context.plotdata
        const { startDate, endDate, roundid } = round
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

            context.eventTarget.addEventListener('roundpin', (e: RoundPinEvent) => {
                if (layerState.pined && e.roundid !== roundid) {
                    layerState.pined = false
                    context.eventTarget.dispatchEvent(new RoundUnpinEvent(roundid, e))
                }
            })

            layer.addEventListener('pointerover', (e) => {
                context.eventTarget.dispatchEvent(new RoundHoverEvent(roundid, e))
            })
            layer.addEventListener('pointerout', (e) => {
                context.eventTarget.dispatchEvent(new RoundUnhoverEvent(roundid, e))
            })
            layer.addEventListener('pointertap', (e) => {
                if (layerState.pined) {
                    context.statedata.setPinnedRoundid(null)
                    context.eventTarget.dispatchEvent(new RoundUnpinEvent(roundid, e))
                } else {
                    context.statedata.setPinnedRoundid(roundid)
                    context.eventTarget.dispatchEvent(new RoundPinEvent(roundid, e))
                }
                layerState.pined = !layerState.pined
            })
        }

        if (!this.isActualRound(round, context)) {
            layer.cursor = 'pointer'
        }

    }

}
